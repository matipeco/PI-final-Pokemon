import { NavLink } from "react-router-dom"
import style from './NavBar.module.css'
import { useDispatch } from "react-redux"
import { getAllPokemons } from "../../redux/actions"

const NavBar = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getAllPokemons())
    }

    return (
        <div className={style.mainContainer}>
            <NavLink to='/home' onClick={handleClick}>HOME</NavLink>
            <NavLink to='/create'>CREATE POKEMON</NavLink>
        </div>
    )
}

export default NavBar;