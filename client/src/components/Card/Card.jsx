//Este componente debe mostrar..
//la info de cada usuario mapeado, pero ademas darnos un link para ir al detalle del usuario en cuestion

import style from './Card.module.css'
import { Link } from 'react-router-dom';


const Card = ({ pokemon }) => {

    return (
        <Link to={`detail/${pokemon.id}`}>
            <article className={style.card}>
                <img src={pokemon.image} alt="pokemon" />
                <h2 className={style.name}>{pokemon.name}</h2>
                <p className={style.type}>{pokemon.types.join(' - ')}</p>
            </article>
        </Link>
    )
}

export default Card;