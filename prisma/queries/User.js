const db = require("../../config/prismaClient");

class User {
  static async create(name, email, password) {
    const user = await db.user.create({
      data: { name, email, password },
    });

    return user;
  }

  static async getById(id) {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  }

  static async getByEmail(email) {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  }
}

module.exports = User;
