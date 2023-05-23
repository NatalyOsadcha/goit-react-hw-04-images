import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { getSearchImage } from 'components/Api/getSearchImage';
import Button from './Button/Button';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';

export default function App() {
  const [searchImage, setSearchImage] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = ({ searchImage }) => {
    setSearchImage(searchImage);
    setIsLoading(false);
    setPage(1);
    setHits([]);
    setTotalHits(null);
  };

  const handleLoadMore = page => {
    setPage(page);
  };

  const hideButton = () => {
    const finalPage = Math.ceil(Number(totalHits / 12));
    if (page === finalPage || Number(totalHits) < 13) {
      return 'none';
    }
    return 'block';
  };

  useEffect(() => {
    if (!searchImage) {
      return;
    }
    setIsLoading(true);
    getSearchImage(searchImage, page)
      .then(data => {
        if (data.hits) {
          setHits(prevHits => [...prevHits, ...data.hits]);
          setTotalHits(data.totalHits);
        }

        return Promise.reject(data.message);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [searchImage, page]);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearch} />
      {IsLoading && <BallTriangle color="#4b5cdd" />}
      {error && <Alert severity="error">Oops, something goes wrong</Alert>}
      {totalHits === 0 && (
        <Alert severity="warning">Nothing found for your request</Alert>
      )}
      {hits && hits.length > 0 && <ImageGallery hits={hits} />}
      <Button onClick={handleLoadMore} page={page} hideButton={hideButton} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}
