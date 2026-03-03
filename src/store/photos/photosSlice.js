import {createSlice} from '@reduxjs/toolkit';
import {
  fetchPhotosAsync,
  fetchPhotoByIdAsync,
  likePhotoAsync,
  unlikePhotoAsync,
} from './photosThunks';

const initialState = {
  photos: [],
  currentPhoto: null,
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotos: (state) => {
      state.photos = [];
      state.page = 1;
      state.hasMore = true;
    },
    clearCurrentPhoto: (state) => {
      state.currentPhoto = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Photos
      .addCase(fetchPhotosAsync.pending, (state, action) => {
        const {isLoadMore} = action.meta.arg;
        if (!isLoadMore) {
          state.status = 'loading';
        }
      })
      .addCase(fetchPhotosAsync.fulfilled, (state, action) => {
        const {photos, page, isLoadMore} = action.payload;
        if (isLoadMore) {
          state.photos = [...state.photos, ...photos];
        } else {
          state.photos = photos;
          state.status = 'success';
        }
        state.page = page;
        state.hasMore = photos.length === 30;
        state.error = null;
      })
      .addCase(fetchPhotosAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      // Fetch Photo by ID
      .addCase(fetchPhotoByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotoByIdAsync.fulfilled, (state, action) => {
        state.currentPhoto = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPhotoByIdAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      // Like Photo
      .addCase(likePhotoAsync.fulfilled, (state, action) => {
        const photo = action.payload;
        // Обновляем в списке
        const index = state.photos.findIndex((p) => p.id === photo.id);
        if (index !== -1) {
          state.photos[index] = photo;
        }
        // Обновляем текущее фото
        if (state.currentPhoto?.id === photo.id) {
          state.currentPhoto = photo;
        }
      })
      // Unlike Photo
      .addCase(unlikePhotoAsync.fulfilled, (state, action) => {
        const photo = action.payload;
        const index = state.photos.findIndex((p) => p.id === photo.id);
        if (index !== -1) {
          state.photos[index] = photo;
        }
        if (state.currentPhoto?.id === photo.id) {
          state.currentPhoto = photo;
        }
      });
  },
});

export const {clearPhotos, clearCurrentPhoto} = photosSlice.actions;
export default photosSlice.reducer;
