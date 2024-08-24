import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    // Get and trim values from req.body
    let { name, age, phone, city, role } = req.body;

    name = name?.trim();
    city = city?.trim().toLowerCase();
    phone = phone?.trim();

    // Validate required fields
    if (!name || !age || !phone || !city || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    if (role !== "server" && role !== "cater") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    let newUser;

    // Create user based on role
    if (role === "server") {
      newUser = await prisma.server.create({
        data: {
          name,
          phone,
          age,
          city,
        },
      });
    } else if (role === "cater") {
      newUser = await prisma.cater.create({
        data: {
          name,
          phone,
          age,
          city,
        },
      });
    }

    if (newUser) {
      // Token expiration time (1 week)
      const tokenDuration = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: tokenDuration,
        }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,  // This should be true in production
          secure: true,
          sameSite: "None",
          maxAge: tokenDuration,
        })
        .json({
          message: "Registration successful",
          newUser: true,
          user: newUser,
          category: role,
        });
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to create user: ${error.message}` });
  }
};



export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
