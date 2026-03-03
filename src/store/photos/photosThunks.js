import {createAsyncThunk} from '@reduxjs/toolkit';
import {photosAPI} from '../../api/unsplash';

export const fetchPhotosAsync = createAsyncThunk(
  'photos/fetchPhotos',
  async (
    {page = 1, perPage = 30, isLoadMore = false},
    {getState, rejectWithValue},
  ) => {
    try {
      const {auth} = getState();
      const token = auth.token;

      let response;
      if (token) {
        response = await photosAPI.getPhotosAuth(token, page, perPage);
      } else {
        response = await photosAPI.getPhotos(page, perPage);
      }

      return {photos: response.data, page, isLoadMore};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || 'Ошибка загрузки фотографий',
      );
    }
  },
);

export const fetchPhotoByIdAsync = createAsyncThunk(
  'photos/fetchPhotoById',
  async (id, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const token = auth.token;

      let response;
      if (token) {
        response = await photosAPI.getPhotoByIdAuth(token, id);
      } else {
        response = await photosAPI.getPhotoById(id);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || 'Ошибка загрузки фотографии',
      );
    }
  },
);

export const likePhotoAsync = createAsyncThunk(
  'photos/likePhoto',
  async (id, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue('Необходима авторизация');
      }

      const {data} = await photosAPI.likePhoto(token, id);
      return data.photo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || 'Ошибка при лайке',
      );
    }
  },
);

export const unlikePhotoAsync = createAsyncThunk(
  'photos/unlikePhoto',
  async (id, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue('Необходима авторизация');
      }

      const {data} = await photosAPI.unlikePhoto(token, id);
      return data.photo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || 'Ошибка при снятии лайка',
      );
    }
  },
);
