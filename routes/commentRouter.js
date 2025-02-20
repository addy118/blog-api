const { Router } = require("express");
const {
  verifyToken,
  verifyCommentship,
} = require("../controllers/authController");
const {
  postComment,
  postReply,
  delComment,
  putComment,
} = require("../controllers/commentController");
const { validateComment } = require("../config/validation/comment");
const commentRouter = Router();

commentRouter.use(verifyToken);

commentRouter.put("/:commentId/edit", [
  verifyCommentship,
  validateComment,
  putComment,
]);

commentRouter.post("/post/:postId/new", [validateComment, postComment]);
commentRouter.post("/:commentId/post/:postId/reply", [
  validateComment,
  postReply,
]);

commentRouter.delete("/:commentId/delete", verifyCommentship, delComment);

commentRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in comment routes!");
});

module.exports = commentRouter;
