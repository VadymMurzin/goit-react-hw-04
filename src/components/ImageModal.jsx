import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName="modal-overlay"
    >
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.alt_description} />
          <div>
            <p>Author: {image.user.username}</p>
            <p>Likes: {image.likes}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }),
};

export default ImageModal;

