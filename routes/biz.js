const express = require("express");
const router = express.Router();

const createRouter = require("./cards/create");
const findRouter = require("./cards/find");
const userCardsRouter = require("./cards/userCards");
const updateRouter = require("./cards/update");
const deleteRouter = require("./cards/delete");

router.use("/create", createRouter);
router.use("/find", findRouter);
router.use("/userCards", userCardsRouter);
router.use("/update", updateRouter);
router.use("/delete", deleteRouter);

module.exports = router;
