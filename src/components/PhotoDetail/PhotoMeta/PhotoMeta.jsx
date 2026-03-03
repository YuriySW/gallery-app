import React from 'react';
import styles from './PhotoMeta.module.css';

export const PhotoMeta = ({ createdAt, views, downloads }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.meta}>
      <div className={styles.item}>
        <span className={styles.label}>Опубликовано:</span>
        <span className={styles.value}>{createdAt ? formatDate(createdAt) : '—'}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Просмотры:</span>
        <span className={styles.value}>{(views || 0).toLocaleString()}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Скачивания:</span>
        <span className={styles.value}>{(downloads || 0).toLocaleString()}</span>
      </div>
    </div>
  );
};
