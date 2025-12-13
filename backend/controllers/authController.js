import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/userModel.js";

// SIGNUP
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await createUser(name, email, password);

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}
