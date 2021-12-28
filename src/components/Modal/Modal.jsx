import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, modalImg }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const { src, alt } = modalImg;
  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <button type="button" className={s.buttonClose} onClick={() => onClose()}>
        <GrClose style={{ color: 'white', width: 30, height: 30 }} />
      </button>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  modalImg: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
