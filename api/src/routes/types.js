const axios = require("axios");
const { Router } = require("express");
//traer con destructuring sino loop 
const { Type } = require("../db");

const router = Router();

router.get("/", async (_req, res) => {
    try {
        //Me triago todos los tipos de pokemon de la Api
        const pokemonTypesApi = await axios.get("https://pokeapi.co/api/v2/type");
        //Me los guardo en un array
        const allTypes = await pokemonTypesApi.data;
        //Uso for of para entrar a la prop de cada elemento
        for (type of allTypes.results) {
            //busco en la DB y corroboro si matchea algun type de la APi con la DB, cuando encuentre el primero me lo guardo
            const find = await Type.findOne({ where: { name: type.name } });
            //Si no encuetra...
            if (!find) {
                //Los crea todos en la DB
                //FALTA MANEJAR EL ERROR//
                await Type.create({ name: type.name });
            } else {
                //Si lo encuentra en la DB, devuelvo todos los types de la DB
                return res.json(await Type.findAll());
            }
        }
        //devuelvo todos los tipos de la DB
        res.status(200).json(await Type.findAll());
    } catch (error) {
        return { error: error.message };
    }
});

module.exports = router;