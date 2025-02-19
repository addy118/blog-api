const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const {
  postComment,
  postReply,
  delComment,
} = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.use(verifyToken);

commentRouter.post("/post/:postId/new", postComment);
commentRouter.post("/:commentId/post/:postId/reply", postReply);

commentRouter.delete("/:commentId/delete", delComment);

commentRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in comment routes!");
});

module.exports = commentRouter;
