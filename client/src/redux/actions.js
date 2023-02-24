import axios from 'axios';
import {
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_POKEMON_BY_NAME
} from './action-types';

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/pokemon/');

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