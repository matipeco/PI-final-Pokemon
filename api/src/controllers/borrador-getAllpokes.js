const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonsApi = async () => {
    try {
        const allPokemons = await axios
            //Me traigo 40 pokes, cada uno tiene una url, modifico el limit para que me muestre 40
            .get("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then((res) => {
                //Aca tengo a los 40 con sus url cada uno
                return res.data.results;
            })
            .then((data) => {
                //Hago un promise.all porque necesito resolver varias promesas de cada url
                return Promise.all(data.map((res) => axios.get(res.url)));
                //mapeo cada url
                //Otro get a cada url de cada poke
            })
            .then((data) => {
                return data.map((res) => res.data);
                //Agarro la resp del get y la retorno como con cualq promesa accedo a data del objeto res
            });

        //Me mapeo cada prop de cada poke 
        let pokemons = allPokemons.map((data) => {
            return {
                id: data.id,
                name: data.name,
                types: data.types.map((el) => el.type.name),
                image: data.sprites.front_default,
                life: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[3].base_stat,
                height: data.height,
                weight: data.weight,
                createdDb: data.createdDb
            }
        })
        if (!pokemons) throw new Error("The pokemon could not be found in the api");
        //Si el poke no es encontrado..

        return pokemons;
    } catch (error) {
        return error.message;
    }
}

const getPokemonsDb = async () => {
    try {
        const allPokemons = await Pokemon.findAll({
            //que me traiga todos los pokes incluida la relacion con el type
            include: {
                //Aca el modelo solo con atributo name
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        //Si no encuentra en la Db
        if (!allPokemons) throw new Error("The pokemon could not be found in the api")
        return allPokemons;

    } catch (error) {
        return error.message;
    }
}

//Fusionamos los get de Api y la Db para tener todos los resultados en un solo array
const getAllPokemons = async () => {
    try {
        const dataApi = await getPokemonsApi();
        const dataDb = await getPokemonsDb();
        //Juntamos ambos arrays en uno
        const allPokemons = [...dataApi, ...dataDb];

        if (!allPokemons.length) throw Error("No pokemons found");
        return allPokemons;

    } catch (error) {
        return error.message;
    }
}

module.exports = getAllPokemons;

