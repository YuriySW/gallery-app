import {Link} from 'react-router-dom';
import {Icon} from '../../UI/Icon/Icon';
import style from './NotFound.module.css';

const NotFound = () => (
  <div className={style.container}>
    <h1 className={style.title}>404</h1>
    <p className={style.text}>Страница не найдена</p>
    <Link to="/" className={style.link}>
      <Icon name="back" size={20} />
      Вернуться на главную
    </Link>
  </div>
);

export default NotFound;
