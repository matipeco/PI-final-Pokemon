import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from './Detail.module.css'
import { useEffect } from 'react';
import { getPokemonDetail } from "../../redux/actions";

export const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const pokemon = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [])

    if (!pokemon.image || !pokemon.types) return <p>Loading...</p>

    return (
        <>
            <article className={style.card}>
                <p>Id:{pokemon.id}</p>
                <img src={pokemon.image} alt="pokemon" />
                <h2 className={style.name}>Name:{pokemon.name}</h2>
                <p>Life:{pokemon.life}</p>
                <p>Attack:{pokemon.attack}</p>
                <p>Defense:{pokemon.defense}</p>
                <p>Speed:{pokemon.speed}</p>
                <p>Height:{pokemon.height}</p>
                <p>Weight:{pokemon.weight}</p>
                <p>Type:{pokemon.types.join(' - ')}</p>
            </article>
        </>
    )
}

export default Detail;
//<p>Type:{pokemon?types?join(' - ')}</p>