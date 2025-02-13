require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT } = process.env;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
