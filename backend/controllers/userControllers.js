const { User } = require('../models');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all active users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { disabled: 0 } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id, disabled: 0 } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { user_id: req.params.id, disabled: 0 }
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete user
exports.deleteUser = async (req, res) => {
  try {
    const [deleted] = await User.update({ disabled: 1 }, {
      where: { user_id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
