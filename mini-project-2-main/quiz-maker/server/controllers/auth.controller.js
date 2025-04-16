import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// @desc    Register new user
export const signup = async (req, res) => {
  try {
    console.log("📩 Incoming Signup Data:", req.body);
    const { firstName, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // directly create and save user
    const savedUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
    });

    console.log("✅ User saved:", savedUser);

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Server error during signup", error });
  }
};


// @desc    Login user

export const login = async (req, res) => {
  try {
    console.log("📥 Incoming Login Request:", req.body);
    const { email, password } = req.body;
    console.log("📨 Login Attempt:", email, password); // ADD THIS

    const user = await User.findOne({ email });
    console.log("🔍 Found User:", user); // ADD THIS

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password Match:", isMatch); // ADD THIS

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error during login", error });
  }
};
