const db = require("../../config/prismaClient");

class Post {
  static async create(title, body, authorId) {
    await db.post.create({
      data: { title, body, authorId },
    });
  }

  static async editTitle(postId, title) {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
      },
    });
  }

  static async editBody(postId, body) {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        body,
      },
    });
  }

  static async archivePost(postId) {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        isPublished: false,
      },
    });
  }

  static async unarchivePost(postId) {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        isPublished: true,
      },
    });
  }

  static async getAll() {
    return await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getPostsByUser(userId) {
    return await db.post.findMany({
      where: {
        id: userId,
      },
    });
  }

  static async getArchivedPostsByUser(userId) {
    return await db.post.findMany({
      where: {
        id: userId,
        isPublished: false,
      },
    });
  }

  static async getPostById(postId) {
    return await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        comments: {
          include: {
            replies: true,
          },
        },
      },
    });
  }

  static async delete(postId) {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  }
}

module.exports = Post;
