const { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostComments, getPostsByUserId, getDeletedPostsByUserId, restorePost } = require('../controllers/postControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validate');
const postValidator = require('../validators/postValidator');

const router = require('express').Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/",upload.single("photo"), postValidator, validate, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id/comments", getPostComments)
router.get("/user/:id", getPostsByUserId)
router.get("/user/deleted/:id", getDeletedPostsByUserId)
router.put("/restore/:id", restorePost)

module.exports = router;