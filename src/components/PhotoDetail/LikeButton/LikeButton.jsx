import React from 'react';
import { Icon } from '../../../UI/Icon/Icon';
import styles from './LikeButton.module.css';

export const LikeButton = ({ isLiked, likesCount, onClick, disabled, isLoading }) => {
  return (
    <button
      className={`${styles.button} ${isLiked ? styles.liked : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
    >
      <span className={styles.iconWrapper}>
        <Icon 
          name={isLiked ? 'heart' : 'heartOutline'} 
          className={styles.icon} 
          color={isLiked ? '#f43f5e' : 'currentColor'}
        />
      </span>
      <span className={styles.count}>{isLoading ? '...' : likesCount}</span>
    </button>
  );
};
