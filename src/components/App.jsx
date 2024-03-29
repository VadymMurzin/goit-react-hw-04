import { useState, useEffect } from 'react';
import {fetchImage} from '../api';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ImageModal from './ImageModal';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [total, setTotal] = useState([]);

  


  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData () {
      try {
        setError(false);
        setLoading(true);
        const fetchedData = await fetchImage(query.split('/')[1], page);
        setImages(prevImages => [...prevImages, ...fetchedData.results]);

        setTotal(fetchedData.total);


      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images. Please try again later.');
        toast('Failed to load images. Please try again later.', { duration: 3000, icon: '❌' });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const handleSearch = async newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setImages([]);
    setLoading(false);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      const handleKeyPress = e => {
        if (e.key === 'Escape') {
          handleModalClose();
        }
      };

      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [modalIsOpen]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {/* {images.length > 0 && (<LoadMoreBtn onLoadMore={handleLoadMore} />)} */}

      {/* {images.length > 0 && results.length - 1 > 0 &&  <LoadMoreBtn onLoadMore={handleLoadMore} />} */}

      {images.length > 0 && images.length !== total &&  <LoadMoreBtn onLoadMore={handleLoadMore} />}

      <Toaster />
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          author={selectedImage.user.username}
          likes={selectedImage.likes}
        />
      )}
    </div>
  );
};

export default App;