import {Logo} from './Logo/Logo';
import {UserMenu} from './UserMenu/UserMenu';
import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Logo />
        <div className={style.auth}>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
