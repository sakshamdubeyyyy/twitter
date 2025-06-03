const { createComment, getAllComments, getCommentById, updateComment, deleteComment, getCommentsByPostId } = require('../controllers/commmentControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const validate = require('../middlewares/validate');
const commentValidator = require('../validators/commentValidator');

const router = require('express').Router();

router.post("/", commentValidator, validate, createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/post/:postId", getCommentsByPostId)
module.exports = router;