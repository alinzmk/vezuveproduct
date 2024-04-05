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
          width: "400px", 
          height: "160px", 
          overflow: "none",
          margin: "auto",
          backgroundColor: "transparent",
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
