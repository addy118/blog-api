require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../prisma/Models/User");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create(name, email, hashedPassword);

  res.status(201).send("User created successfully!");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find(email);

  if (!user) return res.status(404).send("User not found!");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(400).send("Invalid password!");

  // sign token
  jwt.sign({ user }, SECRET, (err, token) => res.send(token));
};

// verify middleware
exports.verifyToken = (req, res, next) => {
  // add token to the request
  const bearerHeader = req.headers["authorization"];
  const authToken = bearerHeader && bearerHeader.split(" ")[1];
  if (!authToken) return res.status(500).send("Unauthorized access!");
  req.token = authToken;

  // verify the token and add user to the request
  jwt.verify(req.token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
  });

  next();
};

// exports.getProtection = (req, res) => res.send("You're authorized!");
