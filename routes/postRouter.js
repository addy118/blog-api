const { Router } = require("express");
const {
  getPosts,
  postPost,
  putPostTitle,
  putPostBody,
  putPostArch,
  putPostPub,
  delPost,
} = require("../controllers/postController");
const {
  verifyToken,
  verifyPostship,
} = require("../controllers/authController");
const { validateReq } = require("../config/validation/req");
const {
  validatePost,
  validatePostTitle,
  validatePostBody,
} = require("../config/validation/post");

const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.use("/:postId/*", [verifyToken, verifyPostship]);

postRouter.put("/:postId/title", [
  validatePostTitle,
  validateReq,
  putPostTitle,
]);
postRouter.put("/:postId/body", [validatePostBody, validateReq, putPostBody]);
postRouter.put("/:postId/archive", putPostArch);
postRouter.put("/:postId/publish", putPostPub);

postRouter.post("/new", [verifyToken, validatePost, validateReq, postPost]);

postRouter.delete("/:postId/delete", delPost);

postRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in post routes!");
});

module.exports = postRouter;
