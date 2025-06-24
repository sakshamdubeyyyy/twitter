const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET;

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user_id: newUser.user_id,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, disabled: 0 } });
    if (!user)
      return res.status(404).json({ error: "User not found or disabled" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { user_id: user.user_id, name: user.name },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Save session info
    req.session.user = { user_id: user.user_id, name: user.name };

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};
