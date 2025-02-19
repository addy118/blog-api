const bcrypt = require("bcryptjs");
const Post = require("../prisma/queries/Post");
const User = require("../prisma/queries/User");

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.getById(Number(userId));
    if (!user) return res.status(404).json({ msg: "No user found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// review later
exports.getUserPost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    const post = await Post.getPostById(Number(postId));
    if (!post) return res.status(404).json({ msg: "No post found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserArchPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.getArchivedPostsByUser(Number(userId));
    if (posts.length < 1)
      return res.status(404).json({ msg: "No posts archived by user" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.getPostsByUser(Number(userId));
    if (posts.length < 1)
      return res.status(404).json({ msg: "No posts made by user" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await User.getFollowing(Number(userId));
    res.status(200).json(following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await User.getFollowers(Number(userId));
    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putUserName = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    await User.changeName(Number(userId), name);
    res.status(200).json({ msg: "Name updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putUserEmail = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    await User.changeEmail(Number(userId), email);
    res.status(200).json({ msg: "Email updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putUserBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    await User.changeBio(Number(userId), bio);
    res.status(200).json({ msg: "Bio updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putUserPass = async (req, res) => {
  const { userId } = req.params;
  const { oldPass, newPass } = req.body;

  try {
    // check old password
    console.log(req.user);
    const matched = await bcrypt.compare(oldPass, req.user.password);
    if (!matched) return res.status(400).json({ msg: "Wrong password!" });

    // change the password
    const hashedPass = await bcrypt.hash(newPass, 10);
    await User.changePass(Number(userId), hashedPass);
    res.status(200).json({ msg: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postUserFollow = async (req, res) => {
  const { followeeId } = req.params;

  try {
    // check existing relation
    const following = await User.getFollowing(req.user.id);
    userFollowed = following.find((row) => row.followee.id == followeeId);
    if (userFollowed) {
      return res.status(200).json({ msg: "User already followed" });
    }

    // follow user
    await User.follow(req.user.id, Number(followeeId));
    res.status(200).json({ msg: "User followed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postUserUnfollow = async (req, res) => {
  const { followeeId } = req.params;

  try {
    // check existing relation
    const following = await User.getFollowing(req.user.id);
    userFollowed = following.find((row) => row.followee.id == followeeId);
    if (!userFollowed) {
      return res.status(200).json({ msg: "User already not followed" });
    }

    // follow user
    await User.unfollow(req.user.id, Number(followeeId));
    res.status(200).json({ msg: "User unfollowed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delUser = async (req, res) => {
  try {
    await User.delete(req.user.id);
    res.status(204).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
