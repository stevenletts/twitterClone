const userRouter = require("express").Router();
const { getAll, getOne } = require("../controllers/user");

userRouter.get("/", getAll);

userRouter.get("/:id", getOne);

module.exports = userRouter;
