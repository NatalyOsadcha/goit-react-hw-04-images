import React from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as GlassIcon } from '../../icons/glass.svg';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit}) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchImage = form.elements.searchImage.value.toLowerCase().trim();
    if (searchImage === '') {
      return toast('Enter something for searching images');
    }
    onSubmit({ searchImage });
    form.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchbarForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <GlassIcon width={18} height={18} />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchImage"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
