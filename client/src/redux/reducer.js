import {
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_POKEMON_BY_NAME,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_POKEMON_TYPES,
    POST_POKEMON,
    DELETE_CARD
} from "./action-types";

const initialState = {
    allPokemons: [],
    allPokemonsCopy: [],
    detail: {},
    types: []
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload
            }

        case GET_POKEMON_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                allPokemons: action.payload
            }

        case GET_POKEMON_TYPES:
            return {
                ...state,
                types: action.payload
            }

        //El post no hace absolutamente nada, necesito que me devuelva el estado como esta
        //porque yo voy a crear el personaje en una ruta nueva
        case POST_POKEMON:
            return {
                ...state
            }
        // case FILTER_BY_TYPES:
        //     const allPokemons = state.allPokemonsCopy;
        //     const typesFiltered = action.payload ? "all"  

        //     return {

        //     }
        case DELETE_CARD:
            const id = action.payload;
            const updateAllPokemons = state.allPokemons.filter((poke) => poke.id !== id)
            return {
                ...state,
                allPokemons: updateAllPokemons
            }

        case FILTER_CREATED:
            //va a tener la data que deseo filtrar
            const pokemons = state.allPokemonsCopy;
            const createdFilter = action.payload === 'created'
                ? pokemons.filter(el => el.createdDb)
                : pokemons.filter(el => !el.createdDb);

            return {
                ...state,
                allPokemons: action.payload === 'all' ? state.allPokemonsCopy : createdFilter
            }

        case ORDER_BY_NAME:
            const allPokemonsCopy = [...state.allPokemonsCopy];

            let sortedArr = action.payload === 'asc'
                //el sort compara dos valores... y lo va poniendo a la derecha o a la izquerda, si son iguales los deja igual.
                ? allPokemonsCopy.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                allPokemonsCopy.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });

            return {
                ...state,
                allPokemons: action.payload === 'default' ? state.allPokemonsCopy : sortedArr
            }

        case ORDER_BY_ATTACK:
            const allPokemonsCopyAttack = [...state.allPokemonsCopy];

            let sortedAttack = action.payload === 'attack-asc'
                //el sort compara dos valores... y lo va poniendo a la derecha o a la izquerda, si son iguales los deja igual.
                ? allPokemonsCopyAttack.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                }) :
                allPokemonsCopyAttack.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                allPokemons: action.payload === 'default' ? state.allPokemonsCopy : sortedAttack
            }

        default:
            return state;
    }
}