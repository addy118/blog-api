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

authRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in auth routes!");
});

module.exports = authRouter;
