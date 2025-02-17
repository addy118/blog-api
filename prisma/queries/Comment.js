const db = require("../../config/prismaClient");

class Comment {
  static async create(postId, userId, body, parentCommentId = null) {
    await db.comment.create({
      data: {
        postId,
        userId,
        body,
        parentCommentId,
      },
    });
  }

  static async edit(commentId, body) {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        body,
      },
    });
  }

  static async delete(commentId) {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}

module.exports = Comment;
