import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js"; 

dotenv.config();

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase(); 

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      passwordHash: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      refreshToken, 
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase(); 

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

