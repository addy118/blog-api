const db = require("../config/prismaClient");

const main = async () => {
  const entity = await db.user.findUnique({
    where: {
      email: "addy@test.com",
    },
  });
  console.log(entity);

  // await db.user.deleteMany();
};

main();
