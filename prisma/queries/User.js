const db = require("../../config/prismaClient");

class User {
  static async create(name, email, password) {
    try {
      const user = await db.user.create({
        data: { name, email, password },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:  ", error.stack);
      throw new Error("Failed to create user.");
    }
  }

  static async editBio(userId, bio) {
    try {
      await db.user.update({
        where: { id: userId },
        data: { bio },
      });
    } catch (error) {
      console.error("Error updating bio:  ", error.stack);
      throw new Error("Failed to update user bio.");
    }
  }

  static async changeEmail(userId, email) {
    try {
      await db.user.update({
        where: { id: userId },
        data: { email },
      });
    } catch (error) {
      console.error("Error changing email:  ", error.stack);
      throw new Error("Failed to update user email.");
    }
  }

  static async editName(userId, name) {
    try {
      await db.user.update({
        where: { id: userId },
        data: { name },
      });
    } catch (error) {
      console.error("Error updating name:  ", error.stack);
      throw new Error("Failed to update user name.");
    }
  }

  static async getById(id) {
    try {
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
    } catch (error) {
      console.error("Error fetching user by ID:  ", error.stack);
      throw new Error("Failed to fetch user by ID.");
    }
  }

  static async getByEmail(email) {
    try {
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
    } catch (error) {
      console.error("Error fetching user by email:  ", error.stack);
      throw new Error("Failed to fetch user by email.");
    }
  }

  static async delete(userId) {
    try {
      await db.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error deleting user:  ", error.stack);
      throw new Error("Failed to delete user.");
    }
  }
}

module.exports = User;
