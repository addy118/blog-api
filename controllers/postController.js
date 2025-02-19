const { post } = require("../config/prismaClient");
const Post = require("../prisma/queries/Post");
const User = require("../prisma/queries/User");

exports.getPosts = async (req, res) => {
  // retrieve posts from database
  const posts = await Post.getAll();
  res.send(posts);
};

exports.postPost = async (req, res) => {
  const { title, body } = req.body;

  await Post.create(title, body, req.user.id);
  res.send("Post created successfully!");
};

exports.putPostArch = async (req, res) => {
  const { postId } = req.params;

  try {
    await Post.archive(Number(postId));
    res.status(200).json({ msg: "Post archived successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putPostPub = async (req, res) => {
  const { postId } = req.params;

  try {
    await Post.publish(Number(postId));
    res.status(200).json({ msg: "Post published successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putPostTitle = async (req, res) => {
  const { postId } = req.params;
  const { title } = req.body;

  try {
    await Post.editTitle(Number(postId), title);
    res.status(200).json({ msg: "Post title edited successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.putPostBody = async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;

  try {
    await Post.editBody(Number(postId), body);
    res.status(200).json({ msg: "Post body edited successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delPost = async (req, res) => {
  const { postId } = req.params;

  try {
    await Post.delete(Number(postId));
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
