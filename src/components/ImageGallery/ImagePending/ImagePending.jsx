import Loader from 'react-loader-spinner';
import s from './ImagePending.module.css';

export default function ImagePending() {
  return (
    <Loader
      className={s.loader}
      type="Puff"
      color="#47acce"
      height={500}
      width={500}
      timeout={3000}
    />
  );
}
