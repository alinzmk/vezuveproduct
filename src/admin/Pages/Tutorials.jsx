import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2.jsx';
import VideoModal from '../Modals/VideoModal.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { EffectCreative } from 'swiper/modules';
import AdminPage from '../Modals/AdminPage.jsx';

function Tutorials() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState("");
    
    
    const videos = [
        { id: 1, name: "Amazon", url: ['jRg9e428tNo', "jRg9e428tNo", "jRg9e428tNo", 'jRg9e428tNo', "jRg9e428tNo", "jRg9e428tNo"] },
        { id: 2, name: "Etsy", url: ['sYFyacD_OlE', "sYFyacD_OlE", "sYFyacD_OlE", 'sYFyacD_OlE', "sYFyacD_OlE", "sYFyacD_OlE"] },
        { id: 3, name: "Emag", url: ['FyQ_5uLyFMo', "FyQ_5uLyFMo", "FyQ_5uLyFMo", 'FyQ_5uLyFMo', "FyQ_5uLyFMo", "FyQ_5uLyFMo"] },
        { id: 4, name: "Allegro", url: ['jRg9e428tNo', "jRg9e428tNo", "jRg9e428tNo", 'jRg9e428tNo', "jRg9e428tNo", "jRg9e428tNo"] },
      ];

    const openModal = (videoId) => {
        setSelectedVideoId(videoId);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedVideoId(null);
        setModalIsOpen(false);
    };
    
    const getThumbnail = (link) =>{
        return "url('https://img.youtube.com/vi/"+link+"/sddefault.jpg')";
    }
    



  return (
    <>
        <VideoModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            videoId={selectedVideoId}
        />
        <AdminPage  pageName={"Dersler"}>
            <div className="row slideleft">
                <div style={{overflow:"hidden"}} className='col-11 pbg videoWrapper'>
                    {videos.map((video, index) => (
                        <div className="row mt-3">
                            <h5>{video.name} Eğitim Videoları</h5>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={0}
                                pagination={{
                                clickable: true,
                                dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                className=""
                            >
                                    {video.url.map((url, idx) => (
                                <SwiperSlide>
                                        <div key={index} className="col-12 ">
                                            <div key={idx} style={{backgroundImage:getThumbnail(url)}} className='text-center videoInner mx-5' onClick={() => openModal(url)}>
                                                
                                            </div>
                                        </div>
                                </SwiperSlide>
                                    ))}
                                    

                            </Swiper>
                        </div>
                    ))}
                </div>
            </div>    
        </AdminPage>
    </>
  );
}

export default Tutorials;


