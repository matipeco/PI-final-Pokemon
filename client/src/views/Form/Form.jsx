import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPokemonTypes, postPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const validate = (state) => {
    const error = {}

    if (!state.name.length || state.name.length > 15) {
        error.name = "Name must be between 1 and 15 characters";
    }

    if (state.image && !/^http.+.\.(jpg|jpeg|gif|png|webp)$/.test(state.image)) {
        error.image = "Invalid image";
    }
    if (state.life < 1 || state.life > 255) {
        error.life = "Life must be between 1 and 255";
    }
    if (state.attack < 1 || state.attack > 255) {
        error.attack = "Attack must be between 1 and 255";
    }
    if (state.defense < 1 || state.defense > 255) {
        error.defense = "Defense must be between 1 and 255";
    }
    if (state.speed < 0 || state.speed > 255) {
        error.speed = "Speed must be between 0 and 255";
    }
    if (state.weight < 0 || state.weight > 255) {
        error.weight = "Weight must be between 0 and 255";
    }
    if (state.height < 0 || state.height > 255) {
        error.height = "Height must be between 0 and 255";
    }
    if (state.types.length > 2 || state.types.length < 1) {
        error.types = "You must choose one or two types";
    }

    return error;
}

const initialState = {
    image: "",
    name: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: []
}

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const types = useSelector((state) => state.types)

    //me creo un estado local donde me guarde la info del formulario
    //ese estado inicial va a ser un objeto con las props que necesita el POST
    const [input, setInput] = useState(initialState)

    const [touch, setTouch] = useState({});

    const errors = validate(input);
    console.log(errors)

    const isFormValid = Object.keys(errors).length === 0;
    //manja mis cambios en los inputs
    const handleChange = (ev) => {
        const { name, value } = ev.target;
        const convertToNumber = name !== "image" && name !== "name" && name !== "types";

        setInput({
            ...input,
            [name]: convertToNumber ? Number(value) : value
        })
    }
    console.log(input)

    const handleSelect = (ev) => {
        if (!input.types.includes(ev.target.value)) {
            setInput({
                ...input,
                //cuando elija el type, me tre todo y concatena el target valuye
                //Va agregando en un array todo lo que va seleccionando
                types: [...input.types, ev.target.value]
            })
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (isFormValid) {
            dispatch(postPokemon(input));
            alert("Pokemon created successfully!")
            //reinicio el form
            setInput(initialState)
            //useHistory, te redirige a la ruta que yo le diga
            history.push('/home')
        }
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

    const handleBlur = (ev) => {
        setTouch({
            ...touch,
            [ev.target.name]: true
        })
    }

    //hace un dispatch para los types
    //cuando se monte el componente que traiga los types
    useEffect(() => {
        dispatch(getPokemonTypes())
    }, [dispatch])

    return (

        <div>
            <h2>CREATE YOUR POKEMON!</h2>

            <form onSubmit={(ev) => handleSubmit(ev)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required value={input.name} name="name" onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && touch.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="life">Life</label>
                    <input min={1} max={255} type="number" required value={input.life} id="life" name="life" onChange={handleChange} onBlur={handleBlur} />
                    {errors.life && touch.life && <p>{errors.life}</p>}
                </div>
                <div>
                    <label htmlFor="attack">Attack</label>
                    <input min={0} max={255} type="number" required value={input.attack} id="attack" name="attack" onChange={handleChange} onBlur={handleBlur} />
                    {errors.attack && touch.attack && <p>{errors.attack}</p>}

                </div>
                <div>
                    <label htmlFor="defense">Defense</label>
                    <input min={0} max={255} type="number" required value={input.defense} id="defense" name="defense" onChange={handleChange} onBlur={handleBlur} />
                    {errors.defense && touch.defense && <p>{errors.defense}</p>}

                </div>
                <div>
                    <label htmlFor="speed">Speed</label>
                    <input min={0} max={255} type="number" required value={input.speed} id="speed" name="speed" onChange={handleChange} onBlur={handleBlur} />
                    {errors.speed && touch.speed && <p>{errors.speed}</p>}
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <input min={0} max={255} type="number" required value={input.height} id="height" name="height" onChange={handleChange} onBlur={handleBlur} />
                    {errors.height && touch.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input min={0} max={255} type="number" required value={input.weight} id="weight" name="weight" onChange={handleChange} onBlur={handleBlur} />
                    {errors.weight && touch.weight && <p>{errors.weight}</p>}
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="text" value={input.image} id="image" name="image" onChange={handleChange} onBlur={handleBlur} />
                    {errors.image && touch.image && <p>{errors.image}</p>}
                </div>
                <label >Type
                    <select name="types" onChange={handleSelect} disabled={input.types.length >= 2} onBlur={handleBlur}>
                        {
                            types.map((type) => (
                                <option key={type.name} value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>
                    {errors.types && touch.types && <p>{errors.types}</p>}

                </label>
                {/* me hace una lista, toma del estado donde tomo los types, y me los va renderizando */}
                <button type="submit" disabled={!isFormValid}>CREATE</button>
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