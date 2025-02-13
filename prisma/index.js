const db = require("../config/prismaClient");

const main = async () => {
  const data = await db.post.findFirst({});
  console.log(data);
};

main();
