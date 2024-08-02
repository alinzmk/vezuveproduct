import React, { useEffect, useState } from "react";
import Sidebar2 from "../Modals/Sidebar2";
import logo from "../Assets/logo-renkli.png";
import mobilelogo from "../Assets/kare-logo.png";
import Whatsapp from "./Whatsapp";
import MobilSidebar2 from "./MobilSidebar2";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip, Navigation, Pagination } from "swiper/modules";
import VideoModal from '../Modals/VideoModal.jsx';

const UserPage = ({ pageName, children }) => {
  
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { announcement } = useSelector((state) => state.announcement);
  const dispatch = useDispatch()
  if (announcement.length === 0){
    dispatch(fetchAllRedux)
  }

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const toggleSidebar = () => {
    setNavOpen(!navOpen);
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const openModal = () => {
    const videoId = videos[pageName]
    console.log(videoId)
    setSelectedVideoId(videoId)
    setModalIsOpen(true)
  };

  const closeModal = () => {
      setSelectedVideoId(null);
      setModalIsOpen(false);
  };

  const videos = { "Market Finder": "MKS9jc0xk1s", "Proje Alanı": "WCPdkYrHLp8", "Ürünler": "SD7RcGUP2ek", "Panel": "Khcjboo_Gmo", "Profil": "9lDFJbaoKEI", "Belgeler": "S9o6UepsYOg", "Hizmetler": "UH-Ly21ftJs", "Dersler":"CVG6W7ywjAg",  }
 ;


  return (
    <>
      <VideoModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            videoId={selectedVideoId}
        />
      <Whatsapp/>
      <div className="main m-0">
        <div className="slideup"></div>
          <div className="row">
            <div className="p-0">
              {isMobile ? (
                <MobilSidebar2 isOpen={navOpen} toggleSidebar={toggleSidebar}/>
              ) : (
                <Sidebar2 />
              )}
            </div>
            <div className="container mt-4 slideleft right">
              <div className="row justify-content-center justify-content-lg-start">
                <div className="col-12 mb-0 p-0">
                  <div id="announcement">
                  <Swiper loop={true} speed={8000} autoplay={{ delay: 5000, disableOnInteraction: false,}} navigation={false} modules={[Autoplay]} className="mySwiper1">
                      {announcement && announcement.map((announ, index)=>
                        <SwiperSlide>
                            <h5 className="d-flex justify-content-center ps-3 p-1">{announcement[index].announcement}</h5>
                        </SwiperSlide>
                      )}
                  </Swiper>
                  </div>
                  <div className="row mb-3 me-0 me-lg-5 align-items-center">
                    <div className="col-auto d-flex">
                      <button
                        id="sideOpen"
                        className="d-block d-lg-none me-2"
                        onClick={() => setNavOpen(true)}
                      >
                        <i class="fa-solid fa-bars"></i>
                      </button>
                      <h4 className="purple w-auto m-auto">{pageName}</h4>
                      {pageName==="Proje Alanı"?(<>
                        <div class="btn-group">
                          <button type="button" class="btn btn-primary dropdown-toggle ms-3" data-bs-toggle="dropdown" aria-expanded="false">
                            Amazon
                          </button>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Amazon</a></li>
                            <li><a class="dropdown-item" href="#">Amazon Handmade</a></li>
                            <li><a class="dropdown-item" href="#">Etsy</a></li>
                            <li><a class="dropdown-item" href="#">Allegro</a></li>
                            <li><a class="dropdown-item" href="#">Trendyol</a></li>
                            <li><a class="dropdown-item" href="#">Walmart</a></li>
                            <li><a class="dropdown-item" href="#">Wayfair</a></li>
                            <li><a class="dropdown-item" href="#">Emag</a></li>
                            <li><a class="dropdown-item" href="#">Ozon</a></li>
                          </ul>
                        </div>
                      </>):(<>
                      
                      </>)
  
                      }
                    </div>
                    <div className="col text-end p-0">
                      {isMobile ? (
                        <>
                          <i onClick={() => openModal()} class="fa-solid fa-graduation-cap" style={{margin:"10px 10px auto auto", fontSize:"24px", color:"#1c1d22", cursor:"pointer"}}></i>
                          <img
                            src={mobilelogo}
                            style={{ maxWidth: "4rem" }}
                            className="sidebar-logo"
                            alt=""
                          />
                        </>
                      ) : (
                        <>
                          <span onClick={() => openModal()}  className="howto p-1 me-4" style={{display:"inline-block" ,margin:"auto ", fontSize:"15px", color:"rgba(28, 29, 34, 0.7)", cursor:"pointer", border:"1px solid rgba(28, 29, 34, 0.7)", borderRadius:"10px"}}>
                            Paneli Öğren
                            <i class="fa-solid fa-graduation-cap ms-1"></i>
                          </span>
                          <img src={logo} className="sidebar-logo" alt="" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default UserPage;
