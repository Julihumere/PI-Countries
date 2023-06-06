const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Country } = require("./src/db");
const { getApi } = require("./src/Controllers/Controllers");
require("dotenv").config();

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const DB = await Country.findAll();
  if (DB.length < 1) {
    const info = await getApi();

    const SaveDb = await Country.bulkCreate(info);
  }
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
