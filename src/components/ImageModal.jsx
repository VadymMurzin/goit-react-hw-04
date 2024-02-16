import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from './imageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, src, alt, author, likes }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName="modal-overlay"
      className={css.modalOverlay}
    >
      {src && alt && (
        <div className={css.modalContent}>
          <img src={src} alt={alt} />
          <div>
            <p>Author: {author}</p>
            <p>Likes: {likes}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
  author: PropTypes.string,
  likes: PropTypes.number,
};

export default ImageModal;
