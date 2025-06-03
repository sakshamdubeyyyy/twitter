const { Comment } = require('../models');

// Create comment
exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all active comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { disabled: 0 } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { comment_id: req.params.id, disabled: 0 } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { comment_id: req.params.id, disabled: 0 }
    });
    if (!updated) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete comment
exports.deleteComment = async (req, res) => {
  try {
    const [deleted] = await Comment.update({ disabled: 1 }, {
      where: { comment_id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all active comments for a specific post
exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
        disabled: 0
      }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
