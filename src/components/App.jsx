import { useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import SearchBar from './SearchBar';  // Імпортуємо компонент SearchBar
import { useToasts } from 'react-hot-toast';

const UnsplashSearch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY'; // Замініть це значення на ваш ключ доступу

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
      addToast('Error fetching images. Please try again later.', { duration: 3000, icon: '❌' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unsplash-search">
      <h1>Unsplash Image Search</h1>
      {/* Передаємо функцію handleSearch як пропс в SearchBar */}
      <SearchBar onSubmit={handleSearch} />
      {loading && <p>Loading...</p>}
      <div className="image-grid">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default UnsplashSearch;

