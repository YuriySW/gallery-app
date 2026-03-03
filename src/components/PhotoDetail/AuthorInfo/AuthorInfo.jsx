import React from 'react';
import { Avatar } from '../../../UI/Avatar/Avatar';
import styles from './AuthorInfo.module.css';

export const AuthorInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className={styles.author}>
      <Avatar 
        src={user.profile_image.medium} 
        alt={user.name} 
        size="large" 
      />
      <div className={styles.info}>
        <a
          href={user.links.html}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.name}
        >
          {user.name}
        </a>
        <span className={styles.username}>@{user.username}</span>
      </div>
    </div>
  );
};
