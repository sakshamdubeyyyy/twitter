const { Post } = require('../models');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all active posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { disabled: 0 } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { post_id: req.params.id, disabled: 0 } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { post_id: req.params.id, disabled: 0 }
    });
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete post
exports.deletePost = async (req, res) => {
  try {
    const [deleted] = await Post.update({ disabled: 1 }, {
      where: { post_id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
