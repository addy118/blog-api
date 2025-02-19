const db = require("../../config/prismaClient");

class Post {
  static async create(title, body, authorId) {
    try {
      await db.post.create({
        data: { title, body, authorId },
      });
    } catch (error) {
      console.error("Error creating post:  ", error.stack);
      throw new Error("Failed to create post.");
    }
  }

  static async editTitle(postId, title) {
    try {
      await db.post.update({
        where: { id: postId },
        data: { title },
      });
    } catch (error) {
      console.error("Error updating post title:  ", error.stack);
      throw new Error("Failed to update post title.");
    }
  }

  static async editBody(postId, body) {
    try {
      await db.post.update({
        where: { id: postId },
        data: { body },
      });
    } catch (error) {
      console.error("Error updating post body:  ", error.stack);
      throw new Error("Failed to update post body.");
    }
  }

  static async archive(postId) {
    try {
      await db.post.update({
        where: { id: postId },
        data: { isPublished: false },
      });
    } catch (error) {
      console.error("Error archiving post:  ", error.stack);
      throw new Error("Failed to archive post.");
    }
  }

  static async publish(postId) {
    try {
      await db.post.update({
        where: { id: postId },
        data: { isPublished: true },
      });
    } catch (error) {
      console.error("Error unarchiving post:  ", error.stack);
      throw new Error("Failed to unarchive post.");
    }
  }

  static async getAll() {
    try {
      return await db.post.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.error("Error fetching all posts:  ", error.stack);
      throw new Error("Failed to fetch all posts.");
    }
  }

  static async getPostsByUser(userId) {
    try {
      return await db.post.findMany({ where: { authorId: userId } });
    } catch (error) {
      console.error("Error fetching user posts:  ", error.stack);
      throw new Error("Failed to fetch user posts.");
    }
  }

  static async getArchivedPostsByUser(userId) {
    try {
      return await db.post.findMany({
        where: { authorId: userId, isPublished: false },
      });
    } catch (error) {
      console.error("Error fetching archived posts:  ", error.stack);
      throw new Error("Failed to fetch archived posts.");
    }
  }

  static async getPostById(postId) {
    try {
      return await db.post.findUnique({
        where: { id: postId },
        include: {
          author: true,
          comments: { include: { replies: true } },
        },
      });
    } catch (error) {
      console.error("Error fetching post by ID:  ", error.stack);
      throw new Error("Failed to fetch post by ID.");
    }
  }

  static async delete(postId) {
    try {
      await db.post.delete({ where: { id: postId } });
    } catch (error) {
      console.error("Error deleting post:  ", error.stack);
      throw new Error("Failed to delete post.");
    }
  }
}

module.exports = Post;
