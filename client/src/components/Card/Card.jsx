//Este componente debe mostrar..
//la info de cada usuario mapeado, pero ademas darnos un link para ir al detalle del usuario en cuestion

import style from './Card.module.css'
import { Link } from 'react-router-dom';
import { deleteCard } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Card = ({ pokemon }) => {
    const dispatch = useDispatch();

    ///NO ANDA BIEN, LOS FILTROS ME REINICIAN EL ESTADO
    const handleDelete = (id) => {
        dispatch(deleteCard(id));
    }

    return (
        <div>
            <button type='button' value={pokemon.id} onClick={() => handleDelete(pokemon.id)}>x</button>
            <Link to={`detail/${pokemon.id}`}>
                <article className={style.card}>
                    <img src={pokemon.image ? pokemon.image : 'https://i.pinimg.com/originals/85/0b/9a/850b9adf969f4ca7b2c564ae5b6b87e3.png'} alt="pokemon" />
                    <h2 className={style.name}>{pokemon.name}</h2>
                    <p className={style.type}>{pokemon.attack}</p>
                    <p className={style.type}>{pokemon.types.join(' - ')}</p>
                </article>
            </Link>
        </div>

    )
}

export default Card;