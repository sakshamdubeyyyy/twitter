const { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostComments } = require('../controllers/postControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const validate = require('../middlewares/validate');
const postValidator = require('../validators/postValidator');

const router = require('express').Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/",isAuthenticated, postValidator, validate, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id/comments", getPostComments)
module.exports = router;