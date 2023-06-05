const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const userRouter = require("./routes/users");
const authRouter = require("./routes/auths");
const tweetRouter = require("./routes/tweets");

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((error) => {
      throw error;
    });
};
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tweet", tweetRouter);

app.listen(3000, () => {
  connect();
  console.log("listening on port 3000");
});
