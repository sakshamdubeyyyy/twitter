const { Post, Comment, User, PostLike } = require("../models");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all active posts with likes included
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { disabled: 0 },
      include: [
        {
          model: PostLike,
          as: 'likes',
          attributes: ['user_id'], 
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by ID with likes included
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { post_id: req.params.id, disabled: 0 },
      include: [
        {
          model: PostLike,
          as: 'likes',
          attributes: ['user_id'],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { post_id: req.params.id, disabled: 0 },
    });
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete post
exports.deletePost = async (req, res) => {
  try {
    const [deleted] = await Post.update(
      { disabled: 1 },
      {
        where: { post_id: req.params.id },
      }
    );
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post disabled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post comments
exports.getPostComments = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = await Comment.findAll({
      where: { post_id: id },
      include: [{ model: User, attributes: ["user_id", "name"] }],
      order: [["created_at", "ASC"]],
    });

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all active posts by a specific user with likes included
exports.getPostsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.findAll({
      where: {
        user_id: id,
        disabled: 0,
      },
      include: [
        {
          model: PostLike,
          as: 'likes',
          attributes: ['user_id'],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all deleted posts by a specific user
exports.getDeletedPostsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.findAll({
      where: {
        user_id: id,
        disabled: 1,
      },
      include: [
        {
          model: PostLike,
          as: 'likes',
          attributes: ['user_id'],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restore a deleted post
exports.restorePost = async (req, res) => {
  try {
    const [restored] = await Post.update(
      { disabled: 0 },
      {
        where: { post_id: req.params.id, disabled: 1 },
      }
    );

    if (!restored) {
      return res.status(404).json({ error: "Deleted post not found" });
    }

    res.json({ message: "Post restored successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
