import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ConfirmDeleteModal = ({ isOpen, closeModal, onDelete }) => {

  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 992); // Adjust breakpoint as needed
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
  
    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

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
          width: isMobile ? "auto" : "400px", // Adjust width as needed
          height: isMobile ? "160px" : "160px", // Adjust height as needed
          inset: "20px",
          overflow: "none",
          
          backgroundColor: "transparent", // Set background color to white or any other color
          margin: "auto",
          border: "none",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)"
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
