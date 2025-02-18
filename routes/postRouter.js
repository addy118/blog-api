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
const { verifyToken } = require("../controllers/authController");
const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.use(verifyToken);

postRouter.put("/:postId/title", putPostTitle);
postRouter.put("/:postId/body", putPostBody);
postRouter.put("/:postId/archive", putPostArch);
postRouter.put("/:postId/publish", putPostPub);

postRouter.post("/new", postPost);

postRouter.delete("/:postId/delete", delPost);

postRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in post routes!");
});

module.exports = postRouter;
