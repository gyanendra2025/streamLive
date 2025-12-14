import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { updateStreamUser } from "../lib/stream.js";

dotenv.config();

export async function signup(req, res) {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).send("All fields are required");
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).send("email already exists");
    }

    const random_idx = Math.floor(Math.random() * 1000) + 1; // generate random number from 1 to 1000

    const randomAvatar = `${process.env.RANDOM_AVATAR_URL}${random_idx}`;

    const newuser = await User.create({
      email,
      password,
      name,
      profilePic: randomAvatar,
    });

    try {
      await updateStreamUser({
        id: newuser._id.toString(),
        name: newuser.name,
        email: newuser.email,
        profilePic: newuser.profilePic,
      });
      console.log(
        `Stream user created/updated successfully during signup ${name}`
      );
    } catch (err) {
      console.error("Error updating Stream user during signup:", err);
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment");
      return res.status(500).send("Server configuration error");
    }

    const token = jwt.sign(
      {
        userId: newuser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true, // prevent xss attacks
      secure: process.env.NODE_ENV === "production", // set secure flag in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "Strict",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newuser._id,
        email: newuser.email,
        name: newuser.name,
        profilePic: newuser.profilePic,
      },
      token: token,
    });
  } catch (err) {
    console.log("Error during signup:", err);
    res.status(500).send("Internal Server Error | signup catch block");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).send("Invalid password");
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment");
      return res.status(500).send("Server configuration error");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).send("Internal Server Error | login block");
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
}
export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { name, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!name || !bio || !location || !learningLanguage || !nativeLanguage) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !name && "name",
          !learningLanguage && "learningLanguage",
          !nativeLanguage && "nativeLanguage",
          !location && "location",
          !bio && "bio",
        ].filter(Boolean),
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // STREAM UPDATE SECTION
    try {
      await updateStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.name ? updateUser.name.toString() : "",
        image: updateUser.profilePic || "",
      });

      console.log(
        `stream user updated after onboarding for ${updateUser.name}`
      );
    } catch (err) {
      console.log("Error updating user after onboarding", err.message);
    }

    return res.status(200).json({
      message: "User onboarded successfully",
      user: updateUser,
    });
  } catch (err) {
    console.error("Error during onboarding:", err);
    res.status(500).send("Internal Server Error | onboard block");
  }
}
