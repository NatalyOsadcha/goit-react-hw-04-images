import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ page, onClick, hideButton }) {
  const handlePage = () => {
    let changePage = page;
    changePage += 1;
    onClick(changePage);
  };
  return (
    <button
      type="button"
      className={css.buttonLoadMore}
      onClick={handlePage}
      style={{ display: hideButton() }}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  hideButton: PropTypes.func.isRequired,
};
