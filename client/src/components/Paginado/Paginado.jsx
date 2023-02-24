import React from "react";

//Declaro mi paginado y me traigo las props del otro componente
export default function Paginado({ charactersPerPage, pokemons, paginado }) {
    //numero de pagina
    const pageNumbers = [];


    //el math.ceil redondea hacia arriba
    //me va a redondear todos los personajes sobre los personajes que quiero por pagina


    for (let i = 1; i <= Math.ceil(pokemons / charactersPerPage); i++) {
        pageNumbers.push(i)
    }
    //Este componente va a renderizar los numeritos en sí
    return (
        <nav>
            <ul>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}