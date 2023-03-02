import React from "react";
import style from './Paginado.module.css'

//Declaro mi paginado y me traigo las props de CardsContainer
export default function Paginado({ charactersPerPage, pokemons, paginado }) {
    const pageNumbers = [];

    //me va a redondear todos los personajes sobre los personajes que quiero por pagina
    for (let i = 1; i <= Math.ceil(pokemons / charactersPerPage); i++) {
        pageNumbers.push(i)
    }

    //Este componente va a renderizar los numeritos en sí
    return (
        <ul className={style.list}>
            {pageNumbers &&
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
        </ul>

    )
}