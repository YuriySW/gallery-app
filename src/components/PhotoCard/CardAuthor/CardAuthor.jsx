import React from 'react';
import { Avatar } from '../../../UI/Avatar/Avatar';
import { Icon } from '../../../UI/Icon/Icon';
import styles from './CardAuthor.module.css';

export const CardAuthor = ({ user }) => {
  return (
    <div className={styles.author}>
      <Avatar src={user.profile_image.small} alt={user.name} size="small" />
      <div className={styles.info}>
        <a
          href={user.links.html}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.name}
          onClick={(e) => e.stopPropagation()}
        >
          {user.name}
          <Icon name="external" size={12} className={styles.externalIcon} />
        </a>
        <span className={styles.username}>@{user.username}</span>
      </div>
    </div>
  );
};
