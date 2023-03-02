//tiene que renderizar el componente Cards
//Este componente debe tomar un array de usuarios y por cada usuario renderizar un componetne cards

import Card from "../Card/Card";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearPokemonsFilters, getAllPokemons } from "../../redux/actions";
import style from './CardsContainer.module.css'
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";

const CardsContainer = (props) => {
    const dispatch = useDispatch();
    const { allPokemons, filteredPokemons } = useSelector((state) => state);
    const pokemons = filteredPokemons.length ? filteredPokemons : allPokemons;

    useEffect(() => {
        dispatch(getAllPokemons());
        return () => dispatch(clearPokemonsFilters())
    }, [dispatch])

    //creamos otro estado local para almacenar cuantos personajes quiero por pagina
    const [charactersPerPage, /*setCharactersPerPage*/] = useState(12)

    //creamos una constante donde me guardo el indice del ultimo personaje
    const indexOfLastCharacter = props.currentPage * charactersPerPage;

    //declaro otra constante con el indice del primer personaje
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    //personajes que van a estar en mi pagina actual
    //El slice toma un array y agarra una porcion delo que le pase por parametro(indexOfFirstCharacter, indexOfLastCharacter)
    const currentCharacters = pokemons?.slice(indexOfFirstCharacter, indexOfLastCharacter);

    //declaro una const paginado que recibe un numero de pagina
    //y seteo la pagina en ese numero de pagina
    const paginado = (pageNumber) => {
        props.setCurrentPage(pageNumber);
    }

    if (pokemons.length === 0) return <Loading />

    return (
        <>
            <div className={style.cardContainer}>
                {currentCharacters?.map((poke) => (
                    <Card key={poke.id} pokemon={poke} />
                ))}
            </div>
            <Paginado
                charactersPerPage={charactersPerPage}
                pokemons={pokemons.length}
                paginado={paginado} />
        </>
    )
}

export default CardsContainer;