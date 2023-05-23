import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ hits }) {
  return (
    <>
      <ul className={css.imageGallery}>
        {hits.map(hit => (
          <ImageGalleryItem hit={hit} key={hit.id} />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      hit: PropTypes.object.isRequired,
    }).isRequired).isRequired
};
