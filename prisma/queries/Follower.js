const db = require("../../config/prismaClient");

class Follower {
  static async getFollowers(userId) {
    try {
      return await db.follower.findMany({
        where: { userId },
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
        where: { followerId: userId },
        // bug-prone
        include: { user: true },
      });
    } catch (error) {
      console.error("Error fetching following users:  ", error.stack);
      throw new Error("Failed to fetch following users.");
    }
  }
}

module.exports = Follower;
