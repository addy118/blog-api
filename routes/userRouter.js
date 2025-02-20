const { Router } = require("express");
const {
  verifyToken,
  verifyOwnership,
} = require("../controllers/authController");
const {
  getUser,
  getUserArchPosts,
  getUserFollowers,
  getUserFollowing,
  putUserName,
  putUserEmail,
  putUserBio,
  putUserPass,
  postUserFollow,
  postUserUnfollow,
  delUser,
  getAllUserPosts,
  getUserPost,
} = require("../controllers/userController");
const { validateReq } = require("../config/validation/req");
const {
  validateName,
  validateEmail,
  validateBio,
  validatePass,
} = require("../config/validation/user");
const userRouter = Router();

userRouter.get("/:userId/view", getUser);
userRouter.get("/:userId/post/:postId/view", getUserPost);
userRouter.get("/:userId/posts", getAllUserPosts);
userRouter.get("/:userId/followers", getUserFollowers);
userRouter.get("/:userId/following", getUserFollowing);

// protect the routes
userRouter.use("/:userId/*", [verifyToken, verifyOwnership]);

userRouter.get("/:userId/posts/archived", getUserArchPosts);

userRouter.put("/:userId/edit/name", [validateName, validateReq, putUserName]);
userRouter.put("/:userId/edit/email", [
  validateEmail,
  validateReq,
  putUserEmail,
]);
userRouter.put("/:userId/edit/bio", [validateBio, validateReq, putUserBio]);
userRouter.put("/:userId/edit/password", [
  validatePass,
  validateReq,
  putUserPass,
]);

userRouter.post("/:userId/followee/:followeeId/follow", postUserFollow);
userRouter.post("/:userId/followee/:followeeId/unfollow", postUserUnfollow);

userRouter.delete("/:userId/delete", delUser);

userRouter.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.send("Something broke in user routes!");
});

module.exports = userRouter;
