import {useEffect, useRef} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setToken} from '../../store/auth/authSlice';
import {getCurrentUserAsync} from '../../store/auth/authThunks';
import {exchangeCodeForToken} from '../../api/unsplash';
import {Preloader} from '../../UI/Preloader/Preloader';
import style from './AuthCallback.module.css';

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isProcessing = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        console.error(
          'Ошибка авторизации от Unsplash:',
          error,
          params.get('error_description'),
        );
        navigate('/');
        return;
      }

      if (!code) {
        console.error('Код авторизации не найден в URL');
        navigate('/');
        return;
      }

      try {
        // Обмен кода на токен
        const tokenData = await exchangeCodeForToken(code);
        const accessToken = tokenData.access_token;

        // Сохраняем токен
        dispatch(setToken(accessToken));

        // Загружаем пользователя
        await dispatch(getCurrentUserAsync(accessToken));

        // Успех → на главную
        navigate('/');
      } catch (err) {
        console.error('Ошибка при обмене кода или загрузке пользователя:', err);
        navigate('/');
      }
    };

    handleCallback();
  }, [location, dispatch, navigate]);

  return (
    <div className={style.container}>
      <Preloader />
      <p className={style.text}>Авторизация...</p>
    </div>
  );
};

export default AuthCallback;
