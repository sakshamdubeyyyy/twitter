const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require('../controllers/commmentControllers');
const { route } = require('./userRoutes');

const router = require('express').Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;