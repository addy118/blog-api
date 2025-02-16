const db = require("../../config/prismaClient");

class Post {
  static async create(title, body, authorId) {
    await db.post.create({
      data: { title, body, authorId },
    });
  }

  static async getAll() {
    const posts = await db.post.findMany();
    return posts;
  }
}

module.exports = Post;
