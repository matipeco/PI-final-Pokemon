
import style from './Landing.module.css';
import { Link } from "react-router-dom";
import pokebola from './images/pokebola.jpg'

const Landing = () => {
    return (
        <div className={style.background}>

            <Link to='/home'><img className={style.pokebola} src={pokebola} alt="pokebola" /></Link>
        </div>
    )
}

export default Landing;