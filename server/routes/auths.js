const authRouter = require("express").Router();
const { signUp, signIn } = require("../controllers/auth");

authRouter.post("/signup", signUp);

authRouter.post("/signin", signIn);

module.exports = authRouter;
