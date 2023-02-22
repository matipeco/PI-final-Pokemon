const { Router } = require('express');

const getPokemonByName = require('../controllers/getPokemonByName');
const getAllPokemon = require('../controllers/getAllPokemon');
const getPokemonById = require('../controllers/getPokemonById');
const { Pokemon, Type } = require('../db');

const router = Router();

//GET con o sin name 2x1 XD
router.get('/', async (req, res) => {
    try {
        //me traigo el name que me pasan por query;
        const { name } = req.query;
        let infoPoke;

        //si me llega el name por query, ejecuto el controlador y me guardo la respuesta en la variable creada.
        if (name) {
            infoPoke = await getPokemonByName(name);
        } else {
            //Si no me llega un name, me guardo todos los pokes en la variable
            infoPoke = await getAllPokemon();
        }

        //si lo que me llega tiene una prop error...
        if (infoPoke.error) throw new Error(infoPoke.error);
        //si todo salio bien, devuelvo el array con el poke encontrado por name o todos los pokes si no me especifico un name.
        return res.status(200).json(infoPoke);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        //Me traigo el id que me pasen por params
        const { id } = req.params;
        //Busco el poke ejecutando la fn de controllers 
        let pokemonFound = await getPokemonById(id);

        res.status(200).json(pokemonFound);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.post('/', async (req, res) => {
    //Me traigo de body las props que me pasen para crear el nuevo pokemon
    const { name, life, image, attack, defense, speed, height, weight, types } = req.body;

    if (!name || !image || !life || !attack || !defense) {
        return res.status(400).send("Please complete the required information.")
    }

    try {
        let newPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            types
        })

        //Me traigo todos los tipos que tengan un nombre desde el modelo Type
        const typeInDb = await Type.findAll({ where: { name: types } });
        //Le agrego el tipo al poke creado
        newPokemon.addType(typeInDb);

        res.status(201).send(`Pokemon ${name} created successfully!`);
    } catch (error) {
        return { error: error.message };
    }
})


module.exports = router;