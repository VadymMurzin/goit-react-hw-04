import css from './app.module.css';

export default function ImageCard({ image }) {
  return (
    <div className={css.imageCard}>
      <img src={image.urls.small} alt={image.alt_description} />
      <div className={css.imageInfo}>
        <p>Author: {image.user.username}</p>
        <p>Likes: {image.likes}</p>
        <p>Description: {image.description || 'No description'}</p>
      </div>
    </div>
  );
}
