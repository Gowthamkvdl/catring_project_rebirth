import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const { location, minSalary, maxWorkingDays, date } = req.query;

  // Get the current date without time for accurate filtering
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset the time to midnight

  const currentDateString = currentDate.toISOString();

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
        disabled: false,
        salary: {
          gte: minSalary ? parseInt(minSalary) : 0,
        },
        workingDays: {
          lte: maxWorkingDays ? parseInt(maxWorkingDays) : 1000000,
        },
        startDate: date
          ? {
              equals: date,
            }
          : {
              gte: currentDateString, // If no date is provided, get posts with startDate in the future
            },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cater: {
          select: {
            name: true,
            avatar: true,
            id: true,
            phone: true,
            totalRating: true,
            averageRating: true,
          },
        },
        _count: {
          select: {
            intersted: {
              where: {
                status: "accepted", // Count only "accepted" status
              },
            },
          },
        },
      },
      take: parseInt(limit),
    });

    res.status(200).json({ postData: posts, total: posts.length });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getIntrestedPosts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const { location, minSalary, maxWorkingDays, date } = req.query;

  // Get the current date without time for accurate filtering
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset the time to midnight
  const currentDateString = currentDate.toISOString();

  try {
    // Fetch the count of interests for each post
    const interestCounts = await prisma.intersted.groupBy({
      by: ["postId"],
      _count: {
        postId: true,
      },
    });

    // Convert the counts into a map for easier access later
    const interestCountMap = interestCounts.reduce(
      (acc, { postId, _count }) => {
        acc[postId] = _count.postId;
        return acc;
      },
      {}
    );

    // Fetch the posts based on the filtering criteria
    const posts = await prisma.post.findMany({
      where: {
        city: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
        disabled: false,
        salary: {
          gte: minSalary ? parseInt(minSalary) : 0,
        },
        workingDays: {
          lte: maxWorkingDays ? parseInt(maxWorkingDays) : 1000000,
        },
        startDate: date
          ? {
              equals: date,
            }
          : {
              gte: currentDateString, // If no date is provided, get posts with startDate in the future
            },
        postId: {
          in: interestCounts.map(({ postId }) => postId),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cater: {
          select: {
            name: true,
            avatar: true,
            id: true,
            phone: true,
            totalRating: true,
            averageRating: true,
          },
        },
      },
      take: limit,
    });

    // Add the interest count to each post
    const postsWithInterestCount = posts.map((post) => ({
      ...post,
      interestCount: interestCountMap[post.postId] || 0,
    }));

    res
      .status(200)
      .json({ postData: postsWithInterestCount, total: posts.length });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};


export const getPost = async (req, res) => {
  const paramPostId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
      include: {
        cater: {
          select: {
            name: true,
            avatar: true,
            id: true,
            phone: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (!err) {
          const saved = await prisma.savedPosts.findUnique({
            where: {
              serverId_postId: {
                postId: paramPostId,
                serverId: user.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: saved ? true : false });
        }
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get Post" });
  }
};

export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const postData = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        caterId: tokenUserId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Add Post" });
  }
};

export const updatePost = async (req, res) => {
  const tokenUserId = req.userId;
  const paramPostId = req.params.id;
  const { ...newPostData } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        postId: paramPostId,
      },
      data: {
        ...newPostData,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Update Post" });
  }
};

export const updatePostStatus = async (req, res) => {
  const tokenUserId = req.userId;
  const paramPostId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (post.caterId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized" });
    }

    const updatedPostStatus = await prisma.post.update({
      where: {
        postId: paramPostId,
      },
      data: {
        disabled: !post.disabled,
      },
    });

    res.status(200).json(updatedPostStatus);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Failed to change Post status` });
  }
};

export const deletePost = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId,
      },
    });

    if (post.caterId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: {
        postId,
      },
    });

    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Post" });
  }
};

export const intrested = async (req, res) => {
  const tokenUserId = req.userId;
  const { postId } = req.body;

  try {
    const existingIntrested = await prisma.intersted.findFirst({
      where: {
        serverId: tokenUserId,
        postId: postId,
      },
    });

    if (existingIntrested) {
      return res.status(409).json({
        message: "You have already shown interest in this post.",
      });
    }

    const intrested = await prisma.intersted.create({
      data: {
        serverId: tokenUserId,
        postId: postId,
      },
    });

    res.status(200).json({
      message:
        "Thank you! Your interest has been successfully recorded. Our team will get in touch with you soon.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Oops! Something went wrong. We couldn't record your interest. Please try again later.",
    });
  }
};

export const deletePosts = async (req, res) => {
  try {
    await prisma.post.deleteMany();
    res.status(200).json({ message: "Posts Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Posts" });
  }
};
