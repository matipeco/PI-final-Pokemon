import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from './Detail.module.css'
import { useEffect } from 'react';
import { getPokemonDetail } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";

export const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const pokemon = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [dispatch, id])//warning

    if (!pokemon.image && !pokemon.types && !pokemon.id && !pokemon.attack && !pokemon.life) return <Loading />

    return (
        <div className={style.container}>
            <article className={style.card}>
                <p className={style.id}><span>Id:</span>{pokemon.id}</p>
                <img src={pokemon.image} alt="pokemon" />
                <h2>{pokemon.name}</h2>
                <div className={style.containerParrafos}>
                    <p className={style.parrafos}><span>Life:</span>{pokemon.life}</p>
                    <p className={style.parrafos}><span>Attack:</span>{pokemon.attack}</p>
                    <p className={style.parrafos}><span>Defense:</span>{pokemon.defense}</p>
                    <p className={style.parrafos}><span>Speed:</span>{pokemon.speed}</p>
                    <p className={style.parrafos}><span> Height:</span>{pokemon.height}</p>
                    <p className={style.parrafos}><span>Weight:</span>{pokemon.weight}</p>
                    <p className={style.parrafos}><span>Type:</span>{pokemon.types.join(' - ')}</p>
                </div>
            </article>
        </div>
    )
}

export default Detail;
