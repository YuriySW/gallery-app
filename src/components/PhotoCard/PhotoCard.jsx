import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Icon} from '../../UI/Icon/Icon';
import {CardAuthor} from './CardAuthor/CardAuthor';
import style from './PhotoCard.module.css';

const PhotoCard = ({photo}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photo/${photo.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className={style.card} onClick={handleClick}>
      <div className={style.imageWrapper}>
        <img
          src={photo.urls.small}
          alt={photo.alt_description || 'Photo'}
          className={style.image}
          loading="lazy"
        />
        {photo.liked_by_user && (
          <div className={style.likedBadge}>
            <Icon name="heart" size={20} />
          </div>
        )}
      </div>

      <div className={style.info}>
        <CardAuthor user={photo.user} />

        <div className={style.meta}>
          <span className={style.date}>{formatDate(photo.created_at)}</span>
          <span className={style.likes}>
            <Icon name="heart" size={16} />
            {photo.likes}
          </span>
        </div>
      </div>
    </div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profile_image: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      links: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
    liked_by_user: PropTypes.bool,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default PhotoCard;
