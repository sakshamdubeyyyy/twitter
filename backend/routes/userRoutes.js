const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userControllers');
const validate = require('../middlewares/validate');
const userValidator = require('../validators/userValidator');

const router = require('express').Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", userValidator, validate, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;