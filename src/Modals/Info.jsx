import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const InfoModal = ({ isOpen, closeModal, onDelete }) => {


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
        <p className='m-0'>"Vezuporta kayıt oluşturduğunuz için teşekkür ederiz. Uygulamamız yayınlandığında sizi bilgilendireceğiz."</p>
      </div>
    </Modal>
  );
};

export default InfoModal;
