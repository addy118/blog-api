const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const commentRouter = Router();

module.exports = commentRouter;
