import axios from 'axios';
import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from './action-types';

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

