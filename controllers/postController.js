const Post = require("../prisma/queries/Post");

exports.getPosts = async (req, res) => {
  // retrieve posts from database
  const posts = await Post.getAll();
  res.send(posts);
};

exports.postPost = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;

  await Post.create(title, body, userId);
  res.send("Post created successfully!");
};
