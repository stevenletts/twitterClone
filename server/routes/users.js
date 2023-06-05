const userRouter = require("express").Router();
const {
  getAll,
  getOne,
  update,
  remove,
  follow,
  unfollow,
} = require("../controllers/user");
const { verifyToken } = require("../verifyToken");

userRouter.get("/", getAll);

userRouter.get("/:id", getOne);

userRouter.put("/:id", verifyToken, update);

userRouter.delete("/:id", verifyToken, remove);

userRouter.put("/follow/:id", verifyToken, follow);

userRouter.put("/unfollow/:id", verifyToken, unfollow);

module.exports = userRouter;
