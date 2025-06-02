const { body } = require("express-validator");
const validator = require("validator");

// Sanitization helper
const stripHtml = (input) =>
  validator.stripLow(validator.escape(validator.trim(input || "")));

const userValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) => value === stripHtml(value))
    .withMessage("Email must not contain HTML"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters")
    .custom((value) => value === stripHtml(value))
    .withMessage("Password must not contain HTML"),
];

module.exports = userValidationRules;
