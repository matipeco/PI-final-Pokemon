//en este controlador voy a buscar en mi array de todos los pokemones que coincidan con el nombre que me envian por query

const getAllPokemons = require('../controllers/getAllPokemon')

const getPokemonByName = async (name) => {
    const allPokemon = await getAllPokemons();
    const pokeFoundName = allPokemon.find(poke => name.toLowerCase() === poke.name.toLowerCase());
    if (!pokeFoundName) throw new Error(`Pokemon not found by name: ${name}.`);

    return pokeFoundName;
}

module.exports = getPokemonByName;