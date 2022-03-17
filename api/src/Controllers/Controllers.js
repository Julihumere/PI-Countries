const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getApi = async () => {
  const Countries = await axios.get("https://restcountries.com/v3/all");
  const info = await Countries.data?.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      img: e.flags[1],
      continent: e.continents[0],
      capital: e.capital ? e.capital[0] : "Capital Not Found",
      subregion: e.subregion ? e.subregion : "Sub Region Not Found",
      area: e.area,
      population: e.population,
    };
  });
  return info;
};

const getDb = async () => {
  const Db = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: { attributes: [] },
    },
  });
  return Db;
};

const getAll = async () => {
  const Api = await getApi();
  const DB = await getDb();
  const All = await Api.concat(DB);
  return All;
};

const CountryById = async (id) => {
  const ID = await Country.findByPk(id.toUpperCase(), {
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: { attributes: [] },
    },
  });
  return ID;
};

const CountryByName = async (name) => {
  const Name = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: { attributes: [] },
    },
  });
  return Name;
};

module.exports = {
  getAll,
  getApi,
  CountryById,
  CountryByName,
};
