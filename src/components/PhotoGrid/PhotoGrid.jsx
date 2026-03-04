import {usePhotosGrid} from './usePhotosGrid';
import PhotoCard from '../PhotoCard/PhotoCard';
import {Preloader} from '../../UI/Preloader/Preloader';
import style from './PhotoGrid.module.css';

const PhotoGrid = () => {
  const {photos, status, error, hasMore, lastPhotoRef, retry} = usePhotosGrid();

  if (status === 'loading' && photos.length === 0) {
    return (
      <div className={style.loaderWrapper}>
        <p className={style.loading}>Загрузка...</p>
      </div>
    );
  }

  if (status === 'error' && photos.length === 0) {
    return (
      <div className={style.error}>
        <p className={style.errorText}>Ошибка: {error}</p>
        <button className={style.retryBtn} onClick={retry}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.grid}>
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;
          const key = photo.id || `photo-${index}`;

          return (
            <div key={key} ref={isLast ? lastPhotoRef : null}>
              <PhotoCard photo={photo} />
            </div>
          );
        })}
      </div>

      {hasMore && photos.length > 0 && (
        <div className={style.loadingMore}>
          <Preloader />
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <p className={style.endMessage}>Все фотографии загружены</p>
      )}
    </div>
  );
};

export default PhotoGrid;
