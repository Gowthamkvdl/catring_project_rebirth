const employeeIds = ["1234567890", "0987654321", "1111111111", "2222222222"];
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const verifyID = async (req, res) => {
  const { id } = req.body;

  // Validate input
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "Invalid ID format. ID must be a non-empty string." });
  }

  // Token expiration time (1 week)
  const tokenDuration = 1000 * 60 * 60;

  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: tokenDuration,
    }
  );

  try {
    // Check if ID exists in the list
    if (employeeIds.includes(id.trim())) {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true, // This should be true in production
          secure: true,
          sameSite: "None",
          maxAge: tokenDuration,
        })
        .json({ id: id, message: "ID Verified" });
    } else {
      return res.status(404).json({ message: "ID not found" });
    }
  } catch (error) {
    console.error("Error during ID verification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. ID verification failed." });
  }
};

export const getPostpartner = async (req, res) => {
  const paramPostId = req.params.id;

  try {
    // Fetch the post and the related cater information
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

    // Fetch the serverId(s) and status from the Intersted model where postId matches
    const interestedServers = await prisma.intersted.findMany({
      where: {
        postId: paramPostId,
      },
      select: {
        serverId: true,
        status: true, // Fetching the status as well
      },
    });

    // Attach the serverIds and statuses to the response
    const servers = interestedServers.map((entry) => ({
      serverId: entry.serverId,
      status: entry.status,
    }));

    res.status(200).json({
      postData: post,
      servers: servers, // List of server IDs and their statuses from the Intersted model
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get Post" });
  }
};

export const updateIntrestedStatus = async (req, res) => {
  const { postId, serverId, status } = req.body;

  try {
    const updatedIntrested = await prisma.intersted.update({
      where: {
        postId_serverId: {
          // Use postId_serverId as the unique identifier
          postId: postId,
          serverId: serverId,
        },
      },
      data: {
        status: status,
      },
    });
    res.status(200).json(updatedIntrested);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update Intrested" });
  }
};
