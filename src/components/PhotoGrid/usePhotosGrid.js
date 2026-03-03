import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosAsync } from '../../store/photos/photosThunks';

export const usePhotosGrid = () => {
  const dispatch = useDispatch();
  const { photos, page, hasMore, status, error } = useSelector(
    (state) => state.photos,
  );

  const observerRef = useRef();
  const isLoadingMore = useRef(false);

  const uniquePhotos = useMemo(() => {
    const seen = new Set();
    return photos.filter((photo) => {
      if (seen.has(photo.id)) return false;
      seen.add(photo.id);
      return true;
    });
  }, [photos]);

  useEffect(() => {
    if (page === 1 && photos.length === 0) {
      dispatch(fetchPhotosAsync({ page: 1, perPage: 30 }));
    }
  }, [dispatch, page, photos.length]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore.current || status === 'loading') return;

    isLoadingMore.current = true;
    dispatch(
      fetchPhotosAsync({
        page: page + 1,
        perPage: 30,
        isLoadMore: true,
      }),
    ).finally(() => {
      isLoadingMore.current = false;
    });
  }, [dispatch, page, hasMore, status]);

  const lastPhotoRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [status, hasMore, loadMore],
  );

  const retry = useCallback(() => {
    dispatch(fetchPhotosAsync({ page: 1, perPage: 30 }));
  }, [dispatch]);

  return {
    photos: uniquePhotos,
    status,
    error,
    hasMore,
    lastPhotoRef,
    retry
  };
};
