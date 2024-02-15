const ImageCard = ({ imageUrl, alt }) => {
  return (
    <div>
      <img src={imageUrl} alt={alt} />
    </div>
  );
};

export default ImageCard;

