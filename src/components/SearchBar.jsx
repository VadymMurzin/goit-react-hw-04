import { useState } from 'react';
import { useToasts } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const { addToast } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      addToast('Please enter a search query.', { duration: 2000, icon: '❌' });
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;

