const { Router } = require("express");
const { getPosts, postPost } = require("../controllers/postController");
const { verifyToken } = require("../controllers/authController");
const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.post("/new", verifyToken, postPost);

module.exports = postRouter;
