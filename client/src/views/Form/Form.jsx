import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getPokemonTypes, postPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const types = useSelector((state) => state.types)

    //me creo un estado local donde me guarde la info del formulario
    //ese estado inicial va a ser un objeto con las props que necesita el POST
    const [input, setInput] = useState({
        image: "",
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: []
    })

    //manja mis cambios en los inputs
    const handleChange = (ev) => {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value
        })
    }

    const handleSelect = (ev) => {
        setInput({
            ...input,
            //cuando elija el type, me tre todo y concatena el target valuye
            //Va agregando en un array todo lo que va seleccionando
            types: [...input.types, ev.target.value]
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(postPokemon(input));
        alert("Pokemon created successfully!")
        //reinicio el form
        setInput({
            image: "",
            name: "",
            life: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: []
        })
        //useHistory, te redirige a la ruta que yo le diga
        history.push('/home')
    }

    const handleDeleteType = (elem) => {
        //traigo una copya del estadoinput y lo mapeo para quedarme con los typos distintos al que me manda el evento
        const filterDelete = input.types.filter((type) => type !== elem);

        //seteo el estado input
        setInput({
            ...input,
            types: filterDelete
        })

    }

    //hace un dispatch para los types
    //cuando se monte el componente que traiga los types
    useEffect(() => {
        dispatch(getPokemonTypes())
    }, [dispatch])

    return (

        <div>
            {/* //Le pongo un boton? */}
            <Link to='/home'>HOME</Link>
            <h2>CREATE YOUR POKEMON!</h2>

            <form onSubmit={(ev) => handleSubmit(ev)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={input.name} name="name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="life">Life</label>
                    <input type="number" value={input.life} id="life" name="life" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="attack">Attack</label>
                    <input type="number" value={input.attack} id="attack" name="attack" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="defense">Defense</label>
                    <input type="number" value={input.defense} id="defense" name="defense" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="speed">Speed</label>
                    <input type="number" value={input.speed} id="speed" name="speed" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <input type="number" value={input.height} id="height" name="height" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input type="number" value={input.weight} id="weight" name="weight" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="text" value={input.image} id="image" name="image" onChange={handleChange} />
                </div>
                <label >Type
                    <select name="type" onChange={(ev) => handleSelect(ev)}>
                        {
                            types.map((type) => (
                                <option key={type.name} value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>

                </label>
                {/* me hace una lista, toma del estado donde tomo los types, y me los va renderizando */}
                <button type="submit">CREATE</button>
                <ul>
                    {
                        input.types.map(elem =>
                            <li key={elem} >{elem}
                                <button type="button" onClick={() => handleDeleteType(elem)}>x</button>
                            </li>
                        )}
                </ul>
            </form>

        </div>
    )
}

export default Form;