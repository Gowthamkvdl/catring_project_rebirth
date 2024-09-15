import prisma from "../lib/prisma.js";

export const getCaters = async (req, res) => {
  try {
    const users = await prisma.cater.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get caters!" });
  }
};

export const getServers = async (req, res) => {
  try {
    const users = await prisma.server.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get server!" });
  }
};

export const getCater = async (req, res) => {
  const id = req.params.id;
  try {
    const cater = await prisma.cater.findUnique({
      where: { id: id },
      include: { post: true },
    });

    if (!cater) {
      return res.status(404).json({ message: "Cater not found" });
    }

    res.status(200).json(cater);
  } catch (error) {
    console.error("Error fetching Cater:", error);
    res.status(500).json({ message: "Failed to get cater!" });
  }
};

export const getServer = async (req, res) => {
  const { id } = req.params;

  try {
    const server = await prisma.server.findUnique({
      where: { id },
      include: { savedPosts: true }, // Include related saved posts
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    res.status(200).json(server);
  } catch (error) {
    console.error("Error fetching server:", error);
    res.status(500).json({ message: "Failed to get server!" });
  }
};


export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userId;
  const { avatar, ...inputs } = req.body;

  if (userId !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    let userCategory = await prisma.server.findUnique({
      where: { id: userId },
    });

    const updatedUser = await prisma[userCategory ? "server" : "cater"].update({
      where: { id: userId },
      data: {
        ...inputs,
        ...(avatar && { avatar }),
      },
    });

    res
      .status(200)
      .json({
        updatedUser: updatedUser,
        category: userCategory ? "server" : "cater",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update User!" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userId;

  if (userId !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  try {

    let userCategory = await prisma.server.findUnique({
      where: { id: userId },
    });

    await prisma[userCategory ? "server" : "cater"].delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: "User Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete User!" });
  }
};

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  // Check if postId and tokenUserId are defined
  if (!postId || !tokenUserId) {
    return res.status(400).json({ message: "Invalid postId or userId" });
  }

  try {
    const savedPost = await prisma.savedPosts.findUnique({
      where: {
        serverId_postId: {
          serverId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPosts.delete({
        where: {
          serverId_postId: {
            serverId: tokenUserId,
            postId,
          },
        },
      });
      return res.status(200).json({ message: "Post Unsaved" });
    } else {
      await prisma.savedPosts.create({
        data: {
          serverId: tokenUserId,
          postId,
        },
      });
      return res.status(201).json({ message: "Post Saved" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        caterId: tokenUserId,
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
    });

    const saved = await prisma.savedPosts.findMany({
      where: {
        serverId: tokenUserId,
      },
      include: {
        post: {
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
        },
      },
    });

    const savedPost = saved.map((item) => ({
      ...item.post,
      user: item.post.user,
    }));

    res.status(200).json({ userPosts, savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get profile posts" });
  }
};



export const addUserRating = async (req, res) => {
  const tokenUserId = req.userId;
  const { profileId, starCount } = req.body;

  try {

    if(profileId === tokenUserId) {
      return res.status(400).json({ message: "You can't rate yourself!" });
    }

    // Determine the user category (either "cater" or "server")
    let userCategory = await prisma.server.findUnique({
      where: { id: profileId },
    });

    const ratingModel = userCategory ? "ServerStarRating" : "CaterStarRating";

    // Check if a rating from this user to the profile already exists
    const existingRating = await prisma[ratingModel].findFirst({
      where: {
        giverId: tokenUserId,
        userId: profileId,
      },
    });

    if (existingRating) {
      // Update the existing rating
      await prisma[ratingModel].update({
        where: {
          starRatingId: existingRating.starRatingId,
        },
        data: {
          starCount,
        },
      });
    } else {
      // Create a new rating
      await prisma[ratingModel].create({
        data: {
          giverId: tokenUserId,
          userId: profileId,
          starCount,
        },
      });
    }

    // Fetch all ratings for the profile to recalculate total and average ratings
    const ratings = await prisma[ratingModel].findMany({
      where: {
        userId: profileId,
      },
      select: {
        starCount: true,
      },
    });

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((acc, rating) => acc + rating.starCount, 0) /
          totalRatings
        : 0;

    // Round the average rating to the nearest 0.5
    const roundedAverageRating = Math.round(averageRating * 2) / 2;

    // Update the user's totalRatings and averageRating
    await prisma[userCategory ? "server" : "cater"].update({
      where: {
        id: profileId,
      },
      data: {
        totalRating:totalRatings,
        averageRating: roundedAverageRating,
      },
    });

    res.status(200).json({
      message: existingRating
        ? "Rating updated successfully"
        : "Rating added successfully",
      totalRatings,
      averageRating: roundedAverageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add or update rating" });
  }
};



export const banUser = async (req, res) => {
  const { userId, banStatus, category } = req.body;
  try {
    console.log(userId, banStatus);
    const user = await prisma[category].update({
      where: { id: userId },
      data: { isBanned: banStatus },
    });
    return res
      .status(200)
      .json({ message: "User ban status updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update ban status of user" });
  }
};

export const addRemarks = async (req, res) => {
  const { userId, remarks, category } = req.body;
  try {   
    console.log(userId, remarks);
    const user = await prisma[category].update({
      where: { id: userId },
      data: { remarks: remarks },
    });
    return res
      .status(200)
      .json({ message: "User remarks updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update remarks of user" });
  }
};

export const deleteUserByPartner = async (req, res) => {
  const { userId, category } = req.body;
  console.log(category, userId);
  try {
    const user = await prisma[category].delete({
      where: { id: userId },
    });
    return res
      .status(200)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete user" });
  }
};