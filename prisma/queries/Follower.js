const db = require("../../config/prismaClient");

class Follower {
  static async getFollowers(userId) {
    return await db.follower.findMany({
      where: {
        userId: userId,
      },
      // bug-prone
      include: {
        follower: true,
      },
    });
  }

  static async getFollowing(userId) {
    return await db.follower.findMany({
      where: {
        followerId: userId,
      },
      // bug-prone
      include: {
        user: true,
      },
    });
  }
}

module.exports = Follower;
