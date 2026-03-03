import {createSlice} from '@reduxjs/toolkit';
import {getCurrentUserAsync} from './authThunks';

const initialState = {
  token: localStorage.getItem('unsplash_token') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('unsplash_token'),
  loading: !!localStorage.getItem('unsplash_token'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('unsplash_token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = true; 
      state.error = null;
      localStorage.setItem('unsplash_token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      
        const errMsg = (action.payload || '').toLowerCase();
        const isAuthError =
          action.error?.message?.includes('401') ||
          errMsg.includes('401') ||
          errMsg.includes('unauthorized') ||
          errMsg.includes('invalid token') ||
          errMsg.includes('oauth error');

        if (isAuthError) {
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          state.error = 'Сессия истекла. Пожалуйста, войдите заново.';
          localStorage.removeItem('unsplash_token');
        }
      });
  },
});

export const {logout, setToken} = authSlice.actions;
export default authSlice.reducer;
