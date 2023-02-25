import axios from 'axios';
import {
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    FILTER_CREATED,
    FILTER_BY_TYPES,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_POKEMON_BY_NAME,
    GET_POKEMON_TYPES,
    DELETE_CARD
} from './action-types';

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/pokemon');

            dispatch({
                type: GET_ALL_POKEMONS,
                payload: data
            })
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemon/${id}`)

            dispatch({
                type: GET_POKEMON_DETAIL,
                payload: data
            })
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3001/pokemon?name=${name}`)

            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: res.data
            })
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const getPokemonTypes = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3001/types`)

            return dispatch({
                type: GET_POKEMON_TYPES,
                payload: res.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const postPokemon = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/pokemon`, payload)
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

// export const filterPokemonByTypes = (payload) => {
//     return {
//         type: FILTER_BY_TYPES,
//         payload
//     }
// }

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

////NO ANDA BIEN, LOS FILTROS!
export const deleteCard = (id) => {
    return {
        type: DELETE_CARD,
        payload: id
    }
}