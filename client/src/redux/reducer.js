import {
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_POKEMON_BY_NAME,
    FILTER_CREATED,
    FILTER_BY_TYPES,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_POKEMON_TYPES,
    CLEAR_POKEMONS_FILTERS,
} from "./action-types";

const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    detail: {},
    types: []
}

export const reducer = (state = initialState, action) => {

    const pokemonsToOrder = [...(state.filteredPokemons.length ? state.filteredPokemons : state.allPokemons)];

    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: []
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

        case FILTER_BY_TYPES:
            if (action.payload === 'all') {
                return {
                    ...state,
                    filteredPokemons: state.allPokemons
                }
            }

            return {
                ...state,
                filteredPokemons: state.allPokemons.filter((poke) => poke.types.includes(action.payload))
            }

        case FILTER_CREATED:
            if (action.payload === 'all') {
                return {
                    ...state,
                    filteredPokemons: state.allPokemons
                }
            }

            return {
                ...state,
                filteredPokemons: state.allPokemons.filter(poke => (
                    action.payload === 'created' ? poke.createdDb : !poke.createdDb
                ))
            }

        case ORDER_BY_NAME: {

            if (action.payload === "default") {
                return {
                    ...state,
                    filteredPokemons: pokemonsToOrder.sort((a, b) => a.id - b.id)
                }
            }

            return {
                ...state,
                filteredPokemons: pokemonsToOrder.sort((a, b) => (
                    action.payload === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name)
                ))
            }

        }

        case ORDER_BY_ATTACK: {

            if (action.payload === "default") {
                return {
                    ...state,
                    filteredPokemons: pokemonsToOrder.sort((a, b) => a.id - b.id)
                }
            }

            return {
                ...state,
                filteredPokemons: pokemonsToOrder.sort((a, b) => (
                    action.payload === 'attack-asc'
                        ? a.attack - b.attack
                        : b.attack - a.attack
                ))
            }
        }

        case CLEAR_POKEMONS_FILTERS:
            return {
                ...state,
                filteredPokemons: [],
            }

        default:
            return state;
    }
}