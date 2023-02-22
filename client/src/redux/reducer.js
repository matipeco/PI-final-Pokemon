import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from "./action-types";

const initialState = {
    allPokemons: [],
    detail: {}
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload
            }

        case GET_POKEMON_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}