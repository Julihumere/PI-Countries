const { Router } = require("express");
const Countries = require("./Countries");
const Activity = require("./Activity");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", Countries);
router.use("/activity", Activity);

module.exports = router;
