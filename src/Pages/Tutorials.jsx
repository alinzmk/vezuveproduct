import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2.jsx';
import VideoModal from '../Modals/VideoModal.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import UserPage from '../Modals/UserPage.jsx';
import { useSelector } from 'react-redux';

function Tutorials() {

    const accessToken = sessionStorage.getItem("token");

    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    //------------------------------------------------------------------------------   
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState("");
    const {plan} = useSelector((state) => state.plan);
    //------------------------------------------------------------------------------       

    const videos = [
        { id: 1, name: "Amazon", url: ['gZED_Ehgu2c', "vDdmETZVX8s", "yyvtELyoh6c", 'Z4YpjvZIRek', "ezK2qr2dheU", "jD4OF4IOy-o", 
            "QDvr3cduQns", "kKNqAMrSsJg", "w80OpwLGLZY", "HceHTsNY3XA",  "s6ng27mH1IU", "BlhlSoohC1c", "21lqRNz0veM", "-hYtcVgFeC4",] },
        { id: 2, name: "Etsy", url: ['pM02q3fRlwU', "tNQrhuAdfw4", "aH_xrT5A1wY", 'bboCtvJW_58', "a1lr8ETZrUU", "yOPB_cxZXeg", "z_iXf2YCb28", "VA0MXistifw"] },
        { id: 3, name: "Emag", url: ['83hpX65gV3o', "2XQmUWuRGv4", "1M-rMT_dDLk", 'L2l16ydrTjM', "u4CH9Q6byhM", "h6ru47d7LVU", "5cSjyGOn648","Dr_S-KUKYG0","fyBokcop5xo", "wYgEYUZ040w", "jWMPBl2Mvk8"] },
        { id: 4, name: "Allegro", url: ['l6UwOGvl1ps', "ijSIDYY4ceE", "zd0-cFxV3UA", 'RLTpYwHROTU', "WU7ZGiaKfQA"] },
        { id: 5, name: "Ozon Global", url: ['fKvUuYLDbus', "ff2ZaAmzHXk", "K1AAQ04mjHE", 'z9yalh91RRE', "SUCbatqLXbc", "lTwIwfLXnWk", 'LmEXF5OmLP4', "BRAwbtFfYJA", "eB3FFtXBgdI", "yfmcwEUyOLE", "qr-Sa5B_v_s", "n8wlcTtUC60"] },
        { id: 6, name: "Wayfair", url: ['SPfXR48elnI', "AUWvB1xqzx0", "7JWg33NdamE"] },
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
        
        <UserPage pageName={"Dersler"}>
        {plan.currentPlan === "" || plan.currentPlan === " " || plan.currentPlan === null  ? (
            <>
                <>
    <div style={{ position: "relative" }}>
        <div className="row justify-content-center justify-content-lg-start slideleft" style={{ filter: "blur(10px)" }}>
            <div style={{ overflow: "hidden" }} className='col-11 pbg videoWrapper'>
                {videos.map((video, index) => (
                    <div className="row mt-3" key={index}>
                        <h5>{video.name} Eğitim Videoları</h5>
                        <Swiper
                            breakpoints={{
                                992: {
                                    slidesPerView: 4,
                                },
                            }}
                            spaceBetween={0}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            className=""
                        >
                            {video.url.map((url, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="col-12 ">
                                        <div style={{ backgroundImage: getThumbnail(url) }} className='text-center videoInner mx-5'></div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </div>
        {/* Centered div */}
        <div className='position-fixed top-50 start-50 translate-middle' style={{ zIndex: 1 }}>
            <div className='m-auto d-flex justify-content-center' style={{ backgroundColor: "white", borderRadius: "10px", border: "2px solid black", padding: "1rem" }}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span className='mx-2'>Dersleri görmek için abonelik almanız gerekmektedir.</span>
                <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
        </div>
    </div>
</>


            </>
            
            ):(
                <>
                    <div className="row  justify-content-center justify-content-lg-start slideleft">
                        <div style={{overflow:"hidden"}} className='col-11 pbg videoWrapper'>
                            {videos.map((video, index) => (
                                <div className="row mt-3">
                                    <h5>{video.name} Eğitim Videoları</h5>
                                    <Swiper
                                        breakpoints={{
                                        992: {
                                            slidesPerView: 4,
                                        },
                                        }}
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
                </>
            )
        }
        </UserPage>
    </>
  );
}

export default Tutorials;
