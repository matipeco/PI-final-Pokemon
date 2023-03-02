const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonsApi = async () => {
    try {
        const pokemonsPage1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemonsPage2 = await axios.get(pokemonsPage1.data.next);

        const pokemons = [...pokemonsPage1.data.results, ...pokemonsPage2.data.results];

        const allPokemons = await Promise.all(

            pokemons.map(async (el) => {
                let res = await axios(el.url)
                return {
                    id: res.data.id,
                    name: res.data.name,
                    types: res.data.types.map((el) => el.type.name),
                    image: res.data.sprites.front_default,
                    life: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[3].base_stat,
                    height: res.data.height,
                    weight: res.data.weight,
                    createdDb: res.data.createdDb
                }
            })
        )

        return allPokemons;

    } catch (error) {
        return error.message;
    }
}

const getPokemonsDb = async () => {
    try {
        const allPokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        const dataDb = allPokemons.map((poke) => ({
            ...poke.toJSON(),
            types: poke.types.map((t) => t.name),
        }));


        if (!dataDb) throw new Error("The pokemon could not be found in the DDB")
        return dataDb;

    } catch (error) {
        return error.message;
    }
}

//Junto los get de Api y la Db para tener todos los resultados en un solo array
const getAllPokemons = async () => {
    try {
        const dataApi = await getPokemonsApi();
        const dataDb = await getPokemonsDb();
        const allPokemons = [...dataApi, ...dataDb];
        if (!allPokemons.length) throw Error("No pokemons found");
        return allPokemons;

    } catch (error) {
        return error.message;
    }
}

module.exports = getAllPokemons;

