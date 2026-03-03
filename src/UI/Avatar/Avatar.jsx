import React from 'react';
import styles from './Avatar.module.css';

export const Avatar = ({ src, alt, size = 'medium', className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${styles[size]} ${className || ''}`}
      loading="lazy"
    />
  );
};
