import React from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, closeModal, videoId }) => {
const videoid = "https://www.youtube.com/embed/"+videoId

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Video Modal"
      style={
        {content: {
          width: "1020px",
          height: "650px",
          margin: "auto",
          backgroundColor: "transparent",
          border: "none",
        },
        overlay:{
          backgroundColor: "rgba(0,0,0,0.6)"
        }
      }
      }
      >
        <div className='videoModal '>
          <div className='row'>
            <div className='col-12 text-center position-relative'>
              <button onClick={closeModal} class="closeBtn"><i class="fa-solid fa-x"></i></button>
              <iframe width="1000" height="600" src={videoid}
                  title="Yaşam Standardını Düşüren Şey Nedir?"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen></iframe>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default VideoModal;