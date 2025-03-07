require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../prisma/queries/User");
const Post = require("../prisma/queries/Post");
const { SECRET } = process.env;

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create(name, email, hashedPassword);

  res.status(201).send("User created successfully!");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.getByEmail(email);

  if (!user) return res.status(404).send("User not found!");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(400).send("Invalid password!");

  // sign token
  jwt.sign({ user }, SECRET, (err, token) => res.status(200).send(token));
};

// verify middleware
exports.verifyToken = (req, res, next) => {
  // add token to the request
  const bearerHeader = req.headers["authorization"];
  const authToken = bearerHeader && bearerHeader.split(" ")[1];
  if (!authToken) return res.status(500).send("Unauthorized access!");
  req.token = authToken;

  // verify the token and add user to the request obj
  jwt.verify(req.token, SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data.user;
  });

  next();
};

exports.verifyOwnership = (req, res, next) => {
  const userId = Number(req.params.userId);
  if (userId !== req.user.id)
    return res.status(403).json({ msg: "You don't have access rights" });

  next();
};

exports.verifyPostship = async (req, res, next) => {
  const postId = Number(req.params.postId);
  // post belongs to the user?
  const posts = await Post.getAllPostsByUser(req.user.id);
  const matched = posts.find((post) => post.id === postId);

  if (!matched)
    return res.status(403).json({ msg: "You don't have access rights" });

  next();
};

exports.verifyCommentship = async (req, res, next) => {
  const { commentId } = req.params;
  // verify originally commented user
  const comments = await User.getAllComments(req.user.id);
  matched = comments.find((comment) => comment.id === Number(commentId));

  if (!matched)
    return res.status(403).json({ error: "You don't have access rights" });

  next();
};

// exports.getProtection = (req, res) => res.send("You're authorized!");
