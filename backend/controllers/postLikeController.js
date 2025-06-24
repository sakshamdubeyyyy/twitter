const { PostLike, Post, Notification } = require("../models");

// Add Like to Post
exports.addLike = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    const [like, created] = await PostLike.findOrCreate({
      where: { user_id, post_id },
    });

    if (!created) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const post = await Post.findByPk(post_id);

    if (post && user_id !== post.user_id) {
      await Notification.create({
        sender_id: user_id,
        receiver_id: post.user_id,
        post_id,
        type: "like",
      });
    }

    res.status(201).json({ message: "Post liked successfully", like });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to like post", error: err.message });
  }
};

// Remove Like from Post
exports.removeLike = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    const deleted = await PostLike.destroy({
      where: { user_id, post_id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Like removed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove like", error: err.message });
  }
};
