const { body } = require("express-validator");
const validator = require("validator");
const { User } = require("../models");

const stripHtml = (input) =>
  validator.stripLow(validator.escape(validator.trim(input || "")));

const postValidationRules = [
  body("user_id")
    .isInt({ min: 1 })
    .withMessage("user_id must be a valid number")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("Referenced user_id does not exist");
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

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .custom((value) => value.trim().length >= 5 && value.trim().length <= 280)
    .withMessage("Content must be 5-280 characters")
    .custom((value) => value === stripHtml(value))
    .withMessage("Content must not contain HTML"),
];

module.exports = postValidationRules;
