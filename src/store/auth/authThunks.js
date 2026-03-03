import {createAsyncThunk} from '@reduxjs/toolkit';
import {userAPI} from '../../api/unsplash';

export const getCurrentUserAsync = createAsyncThunk(
  'auth/getCurrentUser',
  async (token, {rejectWithValue}) => {
    try {
      const response = await userAPI.getCurrentUser(token);
      return response.data;
    } catch (error) {
    
      if (error.response?.status === 401) {
        localStorage.removeItem('unsplash_token'); 
        return rejectWithValue('401 Unauthorized — сессия истекла');
      }

      return rejectWithValue(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.error_description ||
          error.message ||
          'Не удалось загрузить пользователя',
      );
    }
  },
);
