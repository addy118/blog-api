const Comment = require("../prisma/queries/Comment");
const User = require("../prisma/queries/User");

exports.putComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  try {
    // verify original user
    const comments = await User.getAllComments(req.user.id);
    matched = comments.find((comment) => comment.id === Number(commentId));
    if (!matched)
      return res.status(403).json({ error: "You don't have access rights" });

    // edit comment
    await Comment.edit(Number(commentId), comment);
    res.status(201).json({ msg: "Comment edited successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    await Comment.create(Number(postId), req.user.id, comment);
    res.status(201).json({ msg: "Comment added on post successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postReply = async (req, res) => {
  const { postId, commentId } = req.params;
  const { comment } = req.body;

  try {
    await Comment.create(
      Number(postId),
      req.user.id,
      comment,
      Number(commentId)
    );
    res.status(201).json({ msg: "Replied to comment successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // delete comment
    await Comment.delete(Number(commentId));
    res.status(201).json({ msg: "Comment deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
