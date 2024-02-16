import css from './loadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return <button onClick={onLoadMore} className={css.button}>Load more</button>;
};

export default LoadMoreBtn;

