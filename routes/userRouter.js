const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const userRouter = Router();

module.exports = userRouter;
