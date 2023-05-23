import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, tags, toggleModal }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleModal]);

  const handleOverlay = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
