const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const pokeRoute = require('./pokemon')
const typeRoute = require('./types')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokeRoute)
router.use('/types', typeRoute)

module.exports = router;
