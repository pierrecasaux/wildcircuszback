const express = require("express");

const comment = require("./comment");
const credit = require("./credit");
const game = require("./game");
const ranking = require("./ranking");
const user = require("./user");
const video = require("./video");


const router = express.Router();

router.use("/comment", comment);
router.use("/credit", credit);
router.use("/game", game);
router.use("/ranking", ranking);
router.use("/video", video);
router.use("/user", user);

module.exports = router;