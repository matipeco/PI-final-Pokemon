import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";

const SearchBar = (props) => {
    const dispatch = useDispatch();
    //Creamos un estado local, para guardarme lo que aparezca en el input
    const [name, setName] = useState("");

    const handleInputChange = (ev) => {
        //seteo el estado con lo que me llegue por el input
        setName(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        //aca despacho la action
        //lo que tenga en mi estado local name le va a estar llegando a mi action, que va a llamar al back y le va a pasar lo que el usuario este escibiendo
        dispatch(getPokemonByName(name))
        props.setCurrentPage(1);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="Pokemon name..."
                        onChange={ev => handleInputChange(ev)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
        </div>
    )

}

export default SearchBar;