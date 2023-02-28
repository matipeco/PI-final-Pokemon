//en este controlador voy a buscar en mi array de todos los pokemones que coincidan con el nombre que me envian por query

const getAllPokemons = require('../controllers/getAllPokemon')

const getPokemonByName = async (name) => {
    const allPokemon = await getAllPokemons();
    const pokeFoundName = allPokemon.filter(poke => name.toLowerCase() === poke.name.toLowerCase());
    if (pokeFoundName.length === 0) throw new Error(`Pokemon not found with name: ${name}.`);

    return pokeFoundName;
}

module.exports = getPokemonByName;