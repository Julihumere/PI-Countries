const { Router } = require("express");
const { getAllActivities } = require("../Controllers/Controllers");
const router = Router();
const { Country, Activity } = require("../db");

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    let ActivityCreated = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    let CountryActivity = countries.map(async (country) => {
      let search = await Country.findAll({ where: { id: country } });
      if (search) {
        ActivityCreated.addCountry(search);
      }
    });
    res.status(200).json({ msg: "Activity created" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
