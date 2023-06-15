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
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.static("dist"));

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

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tweet", tweetRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connect();
  console.log(`listening on ${PORT}`);
});
