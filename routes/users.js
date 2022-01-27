const express = require("express");
const router = express.Router();

const middlewareRouter = require("../middleware/auth");
const loginRouter = require("./users/login");
const registerRouter = require("./users/register");
const findRouter = require("./users/find");

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/find", middlewareRouter, findRouter);

module.exports = router;
