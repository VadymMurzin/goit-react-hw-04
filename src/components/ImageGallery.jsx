import ImageCard from './ImageCard';
import css from './imageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.liStyle}>
      {images.map((image) => (
        <li key={image.id}>
          <div onClick={() => onImageClick(image)}>
            <ImageCard imageUrl={image.urls.small} alt={image.alt_description} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
