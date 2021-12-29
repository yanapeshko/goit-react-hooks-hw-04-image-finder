import { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ImageDataView from './ImageDataView';
import ImagePending from './ImagePending';
import { fetchArticles } from '../../services/pixabayApi';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ imageName, openModal }) {
  const [imagesArray, setImagesArray] = useState([]);
  const [imagePrevName, setImagePrevName] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  useLayoutEffect(() => {
    if (!imageName) {
      return;
    }
    if (imageName !== imagePrevName) {
      setPage(1);
      setImagesArray([]);
    }

    const asyncFetch = async () => {
      setStatus(Status.PENDING);

      const { hits: newImagesArray, totalHits: totalImages } =
        await fetchArticles(imageName, page);
      if (newImagesArray.length === 0 && totalImages === 0) {
        toast.error('Sorry nothing found');
        return;
      }
      if (newImagesArray.length === 0 && totalImages !== 0) {
        toast.warning('Nothing more found');
        return;
      }

      if (page === 1) {
        toast.success(`Found ${totalImages} images`);
      }
      setImagePrevName(imageName);
      setImagesArray([...imagesArray, ...newImagesArray]);
      setStatus(Status.RESOLVED);
    };

    asyncFetch();
  }, [imageName, imagePrevName, page]);

  const updatePage = () => {
    setPage(state => state + 1);
  };

  return (
    <>
      {status === Status.IDLE && <h2 className={s.enterData}>Pixabay</h2>}

      {status === Status.PENDING && <ImagePending />}

      {(status === Status.RESOLVED || status === Status.PENDING) && (
        <ImageDataView
          imagesArray={imagesArray}
          openModal={openModal}
          loadMore={updatePage}
        />
      )}

      {status === Status.REJECTED && toast.error('Ooops')}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
