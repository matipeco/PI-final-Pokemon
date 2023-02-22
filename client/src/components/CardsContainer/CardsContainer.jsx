//tiene que renderizar el componente Cards
//Este componente debe tomar un array de usuarios y por cada usuario renderizar un componetne cards

import Card from "../Card/Card";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons } from "../../redux/actions";
import style from './CardsContainer.module.css'

const CardsContainer = () => {
    //ejecuto acciones del reducer
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.allPokemons);

    //cuando se monte hago tal cosa
    useEffect(() => {
        dispatch(getAllPokemons())
    }, [])


    return (
        <div className={style.cardContainer}>
            {
                pokemons.map((poke) => (
                    <Card pokemon={poke} />
                ))
            }
        </div>

    )
}

export default CardsContainer;