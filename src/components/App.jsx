import { useState, useEffect } from 'react';
import axios from 'axios';
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


  const accessKey = 'U8xAAUR5Fxct90hrHZPN8X0OTN8GSELW7D9-rpK04bA';

const handleSearch = async (query) => {
    try {
        setError(null);
        setLoading(true);
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=1&client_id=${accessKey}`);
        setImages(response.data.results);
        setPage(2); 
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images. Please try again later.');
        toast('Failed to load images. Please try again later.', { duration: 3000, icon: '❌' });
      } finally {
        setLoading(false);
      }
  };

  const handleLoadMore = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}`);
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
      toast('Failed to load more images. Please try again later.', { duration: 3000, icon: '❌' });
    } finally {
      setLoading(false);
    }

  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      const handleKeyPress = (e) => {
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
      {images.length > 0 && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <Toaster />
      {modalIsOpen && (
        <ImageModal isOpen={modalIsOpen} onRequestClose={handleModalClose} image={selectedImage} />
      )}
    </div>
  );
};

export default App;
