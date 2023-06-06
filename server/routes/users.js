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

userRouter.get("/find/:id", getOne);

userRouter.put("/:id", update);

userRouter.delete("/:id", remove);

userRouter.put("/follow/:id", follow);

userRouter.put("/unfollow/:id", unfollow);

module.exports = userRouter;
