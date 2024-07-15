import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, closeModal, videoId }) => {
  const videoid = "https://www.youtube.com/embed/"+videoId

  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Video Modal"
      style={
        {content: {
          width: isMobile ? "300px" : "1020px",
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
              <iframe width="1000" height="600" src={videoid}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen></iframe>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default VideoModal;