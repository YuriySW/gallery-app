import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUserAsync} from '../store/auth/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {token, user} = useSelector((state) => state.auth); 

  useEffect(() => {
    if (token && !user) {
      console.log(
        'useAuth → dispatching getCurrentUserAsync (token exists, no user yet)',
      );
      dispatch(getCurrentUserAsync(token));
    }
  }, [token, user, dispatch]); 
};
