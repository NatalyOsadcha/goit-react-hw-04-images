import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ hit }) {
  const [showModal, setShowModal] = useState(false);

  const { webformatURL, tags, largeImageURL } = hit;
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.imageGalleryItemImage}>
        <img src={webformatURL} alt={tags} onClick={toggleModal} />
      </li>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.objectOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
