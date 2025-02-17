const db = require("../../config/prismaClient");

class User {
  static async create(name, email, password) {
    const user = await db.user.create({
      data: { name, email, password },
    });

    return user;
  }

  static async editBio(userId, bio) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        bio,
      },
    });
  }

  static async changeEmail(userId, email) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    });
  }

  static async editName(userId, name) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
  }

  static async getById(id) {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        posts: true,
        comments: true,
        followers: true,
        following: true,
      },
    });

    return user;
  }

  static async getByEmail(email) {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        posts: true,
        comments: true,
        followers: true,
        following: true,
      },
    });

    return user;
  }

  static async delete(userId) {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = User;
