import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import ScrollUp from '../ScrollUp';
import Searchbar from '../Searchbar';
import Section from '../Section';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({ src: '', alt: '' });

  const onFormSubmit = imageName => {
    setImageName(imageName);
  };

  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setModalImg({ src, alt });
  };

  return (
    <>
      <Section>
        <Searchbar onSubmit={onFormSubmit} />
      </Section>
      <Section>
        <ImageGallery imageName={imageName} openModal={toggleModal} />
        <ScrollUp />
      </Section>

      {showModal && <Modal onClose={toggleModal} modalImg={modalImg} />}
      <ToastContainer autoClose={3000} />
    </>
  );
}
