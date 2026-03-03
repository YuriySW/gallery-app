import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPhotoByIdAsync,
  likePhotoAsync,
  unlikePhotoAsync,
} from '../../store/photos/photosThunks';
import {clearCurrentPhoto} from '../../store/photos/photosSlice';
import {Button} from '../../UI/Button/Button';
import {Preloader} from '../../UI/Preloader/Preloader';
import {LikeButton} from './LikeButton/LikeButton';
import {AuthorInfo} from './AuthorInfo/AuthorInfo';
import {PhotoMeta} from './PhotoMeta/PhotoMeta';
import {Icon} from '../../UI/Icon/Icon';
import style from './PhotoDetail.module.css';

const PhotoDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentPhoto, status, error} = useSelector((state) => state.photos);
  const {isAuthenticated} = useSelector((state) => state.auth);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    dispatch(fetchPhotoByIdAsync(id));

    return () => {
      dispatch(clearCurrentPhoto());
    };
  }, [dispatch, id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Необходима авторизация для лайков');
      return;
    }

    setIsLiking(true);
    try {
      if (currentPhoto.liked_by_user) {
        await dispatch(unlikePhotoAsync(currentPhoto.id)).unwrap();
      } else {
        await dispatch(likePhotoAsync(currentPhoto.id)).unwrap();
      }
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'error') {
    return (
      <div className={style.error}>
        <p className={style.errorText}>Ошибка: {error}</p>
        <Button onClick={handleBack}>Вернуться к ленте</Button>
      </div>
    );
  }

  if (!currentPhoto) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <Button onClick={handleBack} variant="rounded" className={style.backBtn}>
          <Icon name="back" size={20} />
          Назад к ленте
        </Button>
      </div>

      <div className={style.content}>
        <div className={style.imageSection}>
          <img
            src={currentPhoto.urls.regular}
            alt={currentPhoto.alt_description || 'Photo'}
            className={style.image}
          />
        </div>

        <div className={style.infoSection}>
          <AuthorInfo user={currentPhoto.user} />

          {currentPhoto.description && (
            <p className={style.description}>{currentPhoto.description}</p>
          )}

          <PhotoMeta
            createdAt={currentPhoto.created_at}
            views={currentPhoto.views}
            downloads={currentPhoto.downloads}
          />

          <div className={style.actions}>
            <LikeButton
              isLiked={currentPhoto.liked_by_user}
              likesCount={currentPhoto.likes}
              onClick={handleLike}
              disabled={!isAuthenticated}
              isLoading={isLiking}
            />

            {!isAuthenticated && (
              <p className={style.authHint}>Войдите, чтобы ставить лайки</p>
            )}
          </div>

          <div className={style.unsplashLink}>
            <a
              href={currentPhoto.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
            >
              Открыть на Unsplash
              <Icon name="external" size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
