const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require('../controllers/commmentControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const validate = require('../middlewares/validate');
const commentValidator = require('../validators/commentValidator');
const { route } = require('./userRoutes');

const router = require('express').Router();

router.post("/",isAuthenticated, commentValidator, validate, createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;