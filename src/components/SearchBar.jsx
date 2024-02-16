import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './searchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast('Please enter a search term.', { duration: 2000, icon: '❗' });
    } else {
      onSubmit(query);
    }
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={css.button}>Search</button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;


