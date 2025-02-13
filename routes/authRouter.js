const { Router } = require("express");
const {
  postSignup,
  postLogin,
  getProtection,
  verifyToken,
} = require("../controllers/authController");
const authRouter = Router();

authRouter.post("/signup", postSignup);

authRouter.post("/login", postLogin);

// authRouter.get("/protected", verifyToken, getProtection);

module.exports = authRouter;
