import axios from 'axios';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const SECRET_KEY = process.env.REACT_APP_UNSPLASH_SECRET_KEY;
const API_URL = 'https://api.unsplash.com';
const AUTH_URL = 'https://unsplash.com/oauth';
const TOKEN_URL = 'https://unsplash.com/oauth/token';

export const unsplashAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const createAuthAPI = (token) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Ссылка для начала авторизации (теперь используем code flow)
export const getAuthURL = () => {
  const url = new URL(`${AUTH_URL}/authorize`);
  url.searchParams.append('client_id', ACCESS_KEY);
  url.searchParams.append('redirect_uri', process.env.REACT_APP_REDIRECT_URI);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('scope', 'public read_user read_photos write_likes');
  return url.toString();
};

// Обмен code на access_token
export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post(TOKEN_URL, {
      client_id: ACCESS_KEY,
      client_secret: SECRET_KEY,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      code,
      grant_type: 'authorization_code',
    });

    return response.data; // { access_token, token_type, scope, ... }
  } catch (error) {
    console.error(
      'Ошибка обмена кода на токен:',
      error.response?.data || error,
    );
    throw error;
  }
};

export const photosAPI = {
  getPhotos: (page = 1, perPage = 30) =>
    unsplashAPI.get('/photos', {
      params: {page, per_page: perPage},
    }),

  getPhotoById: (id) => unsplashAPI.get(`/photos/${id}`),

  getPhotosAuth: (token, page = 1, perPage = 30) =>
    createAuthAPI(token).get('/photos', {
      params: {page, per_page: perPage},
    }),

  getPhotoByIdAuth: (token, id) => createAuthAPI(token).get(`/photos/${id}`),

  likePhoto: (token, id) => createAuthAPI(token).post(`/photos/${id}/like`),

  unlikePhoto: (token, id) => createAuthAPI(token).delete(`/photos/${id}/like`),

  trackDownload: (downloadLink) => axios.get(downloadLink),
};

export const userAPI = {
  getCurrentUser: (token) => createAuthAPI(token).get('/me'),
};
