import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
    filterCreated,
    orderByName,
    orderByAttack,
    getPokemonTypes,
    filterByType,
    getAllPokemons
} from "../../redux/actions";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch();

    const types = useSelector((state) => state.types)

    const [currentPage, setCurrentPage] = useState(1);

    const handleFilter = (ev) => {
        dispatch(filterByType(ev.target.value))
        setCurrentPage(1);
    }

    const handleFilterCreated = (ev) => {
        dispatch(filterCreated(ev.target.value))
        setCurrentPage(1);
    }

    const handleSortName = (ev) => {
        dispatch(orderByName(ev.target.value));
        setCurrentPage(1);
    }

    const handleSortAttack = (ev) => {
        dispatch(orderByAttack(ev.target.value))
        setCurrentPage(1);
    }

    const handleReload = () => {
        dispatch(getAllPokemons())
    }

    useEffect(() => {
        dispatch(getPokemonTypes())
    }, [dispatch])

    return (
        <>  <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className={style.botonContainer}>
                <button onClick={handleReload} className={style.boton}>¡Reload!</button>
            </div>
            <div className={style.container}>
                <div className={style.containerChild}>
                    <h3>Filter By:</h3>
                    <label>Origin
                        <select onChange={ev => handleFilterCreated(ev)} >
                            <option value="all">All</option>
                            <option value="api">Api</option>
                            <option value="created">Created</option>
                        </select>
                    </label>
                    <label >Type
                        <select name="type" onChange={(ev) => handleFilter(ev)}>
                            <option value="all">All</option>
                            {
                                types.map((type) => (
                                    <option key={type.name} value={type.name}>{type.name}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
                <div className={style.containerChild}>
                    <h3>Order By:</h3>
                    <label>Attack
                        <select onChange={ev => handleSortAttack(ev)}>A
                            <option value="default">Default</option>
                            <option value="attack-asc">Ascendant</option>
                            <option value="attack-desc">Descendant</option>
                        </select>
                    </label>
                    <label>Name
                        <select onChange={ev => handleSortName(ev)} >
                            <option value="default">Default</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </label>
                </div>

            </div>
            <CardsContainer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Home;