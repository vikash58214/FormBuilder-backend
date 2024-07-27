const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./router/user");
const folderRouter = require("./router/folder");
const formRouter = require("./router/form");
const responseRouter = require("./router/response");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(folderRouter);
app.use(userRouter);
app.use(formRouter);
app.use(responseRouter);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(5000, () => {
  console.log("server is running");
});
