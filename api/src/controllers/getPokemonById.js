const getAllPokemon = require('../controllers/getAllPokemon');

const getPokemonById = async (id) => {
    //Me traigo todos los poke
    const allPokemon = await getAllPokemon();
    //Busco el poke con el id correspondientes
    let pokemonFound = await allPokemon.find((poke) =>
        poke.id === id || poke.id === Number(id)
    );
    //
    if (!pokemonFound) throw new Error(`Pokemon with that id:${id} not found.`);

    return pokemonFound;
}

module.exports = getPokemonById;