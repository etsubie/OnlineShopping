import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import Role from "../model/roleModel.js";

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body; 

  try {
    // Validate input
    if (!name || !email || !password) { 
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if User with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Fetch the 'Customer' role
    const roleData = await Role.findOne({ name: 'Customer' });
    if (!roleData) {
      return res.status(400).json({ message: "Default role 'Customer' not found" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user with role ID
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: roleData._id, // Store the Role _id reference
    });
    await user.save();

    // Generate JWT token with user ID and role name
    const token = jwt.sign(
      { id: user._id, role: roleData.name },
      process.env.JWT_SECRET
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body; 

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).populate('role'); // Ensure role is populated
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role.name }, // Ensure role name is used
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
