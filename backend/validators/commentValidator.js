const { body } = require("express-validator");
const validator = require("validator");
const { Post, User } = require("../models");

const stripHtml = (input) =>
  validator.stripLow(validator.escape(validator.trim(input || "")));

const commentValidationRules = [
  body("user_id")
    .isInt({ min: 1 })
    .withMessage("user_id must be a valid number")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("Referenced user_id does not exist");
      return true;
    }),

  body("post_id")
    .isInt({ min: 1 })
    .withMessage("post_id must be a valid number")
    .custom(async (value) => {
      const post = await Post.findByPk(value);
      if (!post) throw new Error("Referenced post_id does not exist");
      return true;
    }),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .custom((value) => value.trim().length >= 2 && value.trim().length <= 50)
    .withMessage("Name must be 2-50 characters")
    .custom((value) => value === stripHtml(value))
    .withMessage("Name must not contain HTML"),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .custom((value) => value.trim().length >= 2 && value.trim().length <= 200)
    .withMessage("Comment must be 2-200 characters")
    .custom((value) => value === stripHtml(value))
    .withMessage("Comment must not contain HTML"),
];

module.exports = commentValidationRules;
