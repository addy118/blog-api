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

  static async changeBio(userId, bio) {
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

  static async changeName(userId, name) {
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

  static async changePass(userId, password) {
    try {
      await db.user.update({
        where: { id: userId },
        data: { password },
      });
    } catch (error) {
      console.error("Error updating password:  ", error.stack);
      throw new Error("Failed to update user password.");
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

  // follower follows followee
  static async follow(followerId, followeeId) {
    try {
      await db.follower.create({
        data: {
          followeeId,
          followerId,
        },
      });
    } catch (error) {
      console.error("Error following user:  ", error.stack);
      throw new Error("Failed to follow user.");
    }
  }

  static async unfollow(followerId, followeeId) {
    try {
      await db.follower.updateMany({
        where: {
          followeeId,
          followerId,
        },
        data: {
          unfollowedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Error unfollowing user:  ", error.stack);
      throw new Error("Failed to unfollow user.");
    }
  }

  static async getFollowers(userId) {
    try {
      return await db.follower.findMany({
        where: { followeeId: userId, unfollowedAt: null },
        // bug-prone
        include: { follower: true },
      });
    } catch (error) {
      console.error("Error fetching followers:  ", error.stack);
      throw new Error("Failed to fetch followers.");
    }
  }

  static async getFollowing(userId) {
    try {
      return await db.follower.findMany({
        where: { followerId: userId, unfollowedAt: null },
        // bug-prone
        include: { followee: true },
      });
    } catch (error) {
      console.error("Error fetching following users:  ", error.stack);
      throw new Error("Failed to fetch following users.");
    }
  }
}

module.exports = User;
