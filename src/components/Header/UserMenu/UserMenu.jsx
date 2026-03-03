import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/authSlice';
import { getAuthURL } from '../../../api/unsplash';
import { Button } from '../../../UI/Button/Button';
import { Icon } from '../../../UI/Icon/Icon';
import { Preloader } from '../../../UI/Preloader/Preloader';
import { Avatar } from '../../../UI/Avatar/Avatar';
import styles from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    window.location.href = getAuthURL();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={handleLogin} variant="unsplash">
        <Icon name="unsplash" size={20} />
        Войти через Unsplash
      </Button>
    );
  }

  if (loading || !user) {
    return (
      <div className={styles.loadingWrapper}>
        <Preloader size="small" />
      </div>
    );
  }

  return (
    <div className={styles.userInfo}>
      <Avatar 
        src={user.profile_image?.small} 
        alt={user.name || user.username} 
        size="small" 
      />
      <span className={styles.username}>
        {user.name || user.username || 'User'}
      </span>
      <Button onClick={handleLogout} variant="rounded">
        <Icon name="logout" size={18} />
        Выйти
      </Button>
    </div>
  );
};
