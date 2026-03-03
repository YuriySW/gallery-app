// src/UI/Preloader/Preloader.jsx
import RingLoader from 'react-spinners/RingLoader';
import style from './Preloader.module.css';

export const Preloader = () => (
  <div className={style.preloader}>
    <RingLoader color="#3b82f6" size={60} />
  </div>
);
