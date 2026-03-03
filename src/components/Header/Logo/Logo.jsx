import {Link} from 'react-router-dom';
import style from './Logo.module.css';
import logo from './img/logo.jpeg';

export const Logo = () => (
  <Link to="/" className={style.link}>
    <img className={style.logo} src={logo} alt="Логотип Gallery-App" />
   
  </Link>
);
