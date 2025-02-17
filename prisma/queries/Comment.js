const db = require("../../config/prismaClient");

class Comment {
  static async create(postId, userId, body, parentCommentId = null) {
    try {
      await db.comment.create({
        data: { postId, userId, body, parentCommentId },
      });
    } catch (error) {
      console.error("Error creating comment:  ", error.stack);
      throw new Error("Failed to create comment.");
    }
  }

  static async edit(commentId, body) {
    try {
      await db.comment.update({ where: { id: commentId }, data: { body } });
    } catch (error) {
      console.error("Error updating comment:  ", error.stack);
      throw new Error("Failed to update comment.");
    }
  }

  static async delete(commentId) {
    try {
      await db.comment.delete({ where: { id: commentId } });
    } catch (error) {
      console.error("Error deleting comment:  ", error.stack);
      throw new Error("Failed to delete comment.");
    }
  }
}

module.exports = Comment;
