import PropTypes from 'prop-types';

const ImageCard = ({ imageUrl, alt }) => {
  if (typeof imageUrl === 'object' && imageUrl.urls && imageUrl.urls.small) {
    imageUrl = imageUrl.urls.small;
  }

  const altText = alt && typeof alt === 'string' ? alt : 'Image';

  return (
    <div>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

ImageCard.propTypes = {
  imageUrl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ]).isRequired,
  alt: PropTypes.string,
};

export default ImageCard;




