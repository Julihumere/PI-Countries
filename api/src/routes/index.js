const { Router } = require("express");
const Countries = require("./Countries");
const Activities = require("./Activities");

const router = Router();

router.use("/countries", Countries);
router.use("/activity", Activities);

module.exports = router;
