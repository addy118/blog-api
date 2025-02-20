const { body } = require("express-validator");

exports.validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Title must be between 5 and 255 characters")
    .matches(/^[A-Za-z0-9 ,.'!?-]+$/)
    .withMessage(
      "Title can only contain letters, numbers, spaces, and basic punctuation (,.!'?-)."
    ),

  body("body")
    .trim()
    .notEmpty()
    .withMessage("Body content is required")
    .isLength({ min: 20 })
    .withMessage("Body must be at least 20 characters long"),
];

exports.validatePostBody = [
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Body content is required")
    .isLength({ min: 20 })
    .withMessage("Body must be at least 20 characters long"),
];

exports.validatePostTitle = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Title must be between 5 and 255 characters")
    .matches(/^[A-Za-z0-9 ,.'!?-]+$/)
    .withMessage(
      "Title can only contain letters, numbers, spaces, and basic punctuation (,.!'?-)."
    ),
];
