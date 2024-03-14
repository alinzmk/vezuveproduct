import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ConfirmDeleteModal = ({ isOpen, closeModal, onDelete }) => {

  const handleDelete = () => {
    onDelete(); 
    closeModal(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      style={{
        content: {
          width: "400px", // Adjust width as needed
          height: "160px", // Adjust height as needed
          overflow: "none",
          margin: "auto",
          backgroundColor: "transparent", // Set background color to white or any other color
          border: "none",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.6)"
        }
      }}
    >
      <div className="confirm-modal text-center">
        <h2>Ürün Silmeyi Onayla</h2>
        <p>Bu ürünü silmeyi onaylıyor musun?</p>
        <div className="confirm-actions">
          <button className='btn' onClick={handleDelete}>Onayla</button>
          <button className='btn' onClick={closeModal}>Vazgeç</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
