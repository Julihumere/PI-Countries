const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");
const {
  getAll,
  CountryById,
  CountryByName,
} = require("../Controllers/Controllers");

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const Name = await CountryByName(name);
      if (Name.length) {
        res.status(200).json({ Name });
      } else {
        res.json({ msg: "The country hasn't been found" });
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let DB = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (DB.length > 0) {
      res.status(200).json({ DB });
    } else {
      res.status(200).json(getAll());
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const ID = await CountryById(id);
    if (ID) {
      res.status(200).json({ ID });
    } else {
      res.status(404).json({ msg: "No ID" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
