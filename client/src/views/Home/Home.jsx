import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, filterCreated, orderByName, orderByAttack, getPokemonTypes, filterByType } from "../../redux/actions";
import { useState, useEffect } from "react";

const Home = () => {
    //Botones/Opciones para filtrar por tipo, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
    //Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemones por orden alfabético y por ataque.
    const dispatch = useDispatch();

    const types = useSelector((state) => state.types)

    const [currentPage, setCurrentPage] = useState(1);

    const [/*render*/, setRender] = useState(``);//warning

    const handleFilter = (ev) => {
        ev.preventDefault();
        dispatch(filterByType(ev.target.value))
    }

    const handleClick = (ev) => {
        ev.preventDefault();
        dispatch(getAllPokemons())
    }

    const handleFilterCreated = (ev) => {
        dispatch(filterCreated(ev.target.value))
        setCurrentPage(1);
    }

    const handleSortName = (ev) => {
        ev.preventDefault();
        dispatch(orderByName(ev.target.value));
        //setCurrentPage lo coloco para que cuando haga el ordenamiento me setee la pagina en la primera
        setCurrentPage(1);
        //Lo coloco para que cuando setee el estado setCurrentPage me modifique el estado local y se renderice
        setRender(`Render ${ev.target.value}`)
    }

    const handleSortAttack = (ev) => {
        ev.preventDefault();
        dispatch(orderByAttack(ev.target.value))
        setCurrentPage(1);
        setRender(`Render ${ev.target.value}`)
    }

    useEffect(() => {
        dispatch(getPokemonTypes())
    }, [dispatch])


    return (
        <>  <button onClick={(ev) => handleClick(ev)}>Reload all my Pokemon </button>
            <div>
                <h3>Order By:</h3>
                <label>Attack
                    <select onChange={ev => handleSortAttack(ev)}>A
                        <option value="default">Default</option>
                        <option value="attack-asc">Ascendant</option>
                        <option value="attack-desc">Descendant</option>
                    </select>
                </label>

                <label>Origin
                    <select onChange={ev => handleFilterCreated(ev)} >
                        <option value="all">All</option>
                        <option value="api">Api</option>
                        <option value="created">Created</option>
                    </select>
                </label>

                <label>Name
                    <select onChange={ev => handleSortName(ev)} >
                        <option value="default">Default</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </label>

                <label >Type
                    <select name="type" onChange={(ev) => handleFilter(ev)}>
                        {
                            types.map((type) => (
                                <option key={type.name} value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>

                </label>
            </div>
            <CardsContainer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Home;