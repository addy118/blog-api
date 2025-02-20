const { body } = require("express-validator");

exports.validateComment = [
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Comment body is required")
    .isLength({ min: 3, max: 500 })
    .withMessage("Comment must be between 3 and 500 characters"),
];
