import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName="modal-overlay"
    >
      <div onClick={onRequestClose} className="modal-overlay" />
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.alt_description} />
          {/* Додайти інші дані зображення, які мені потрібні: треба розібратися... */}
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
