const express = require('express');
const router = express.Router();
const postLikeController = require('../controllers/postLikeController');

// Route to like a post
router.post('/', postLikeController.addLike);

// Route to unlike a post
router.delete('/', postLikeController.removeLike);

module.exports = router;
