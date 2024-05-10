import '../App.css';
import logo from "../Assets/logo-renkli.png"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import Finder from '../Modals/Finder-App';
import map from "../Assets/worldmap.png"
import Requirements from '../Modals/Requirements';
import UserPage from '../Modals/UserPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

function MarketFinder() {

    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    //------------------------------------------------------------------------------   
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState("");
    const [selectedData, setSelectedData] = useState(null);
    const [selectedData2, setSelectedData2] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    //------------------------------------------------------------------------------ 
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

    const openModal = (x) => {
        setSelectedMarket(x);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedMarket(null);
        setModalIsOpen(false);
    };
    
    const handleSelectData = (data, data2) => {
        setSelectedData(data);
        setSelectedData2(data2);
    };

    const handleClick = (fullData) => {
        openModal(fullData);
    };

    const resetData = () => {
        setSelectedData(null)
        setSelectedData2(null)
    }

  return (
      <>
      <Requirements
            isOpen={modalIsOpen}
            closeModal={closeModal}
            fullData={{selectedMarket}}
        />
        <UserPage pageName={"Market Finder"}>
            <div className="finder-wrapper">
                <div className="row slideleft ">
                    {isMobile ? (
                        <>
                        { selectedData ? (
                            <>
                                <div>
                                    {selectedData && selectedData2 && <ResultComponentMobile
                                        full={selectedData}
                                        
                                        name={selectedData.name}
                                        logo={selectedData.logo}
                                        title={selectedData.title}
                                        items={selectedData.items}
                                        flag={selectedData.flag}
                                        flag2={selectedData.flag2}
                                        title2={selectedData.title2}
                                        items2={selectedData.items2}
                                        buttonText={selectedData.buttonText}
                                        link={selectedData.marketLink}
                                        full_2={selectedData2}
                                        name_2={selectedData2.name}
                                        logo_2={selectedData2.logo}
                                        title_2={selectedData2.title}
                                        items_2={selectedData2.items}
                                        flag_2={selectedData2.flag}
                                        flag2_2={selectedData2.flag2}
                                        title2_2={selectedData2.title2}
                                        items2_2={selectedData2.items2}
                                        buttonText_2={selectedData2.buttonText}
                                        link_2={selectedData2.marketLink}
                                        handleReset={resetData}
                                        handleClick={handleClick}
                                    />}
                                </div>
                            </>
                        ):(
                            <>
                                <div className="col-12 col-lg-4 ps-0 pe-0 pe-lg-4 mb-3 mb-lg-0">
                                    <div className="pbg py-5 px-3">
                                        <Finder onSelectData={handleSelectData}/>
                                    </div>
                                </div>
                            </>
                        )

                        }
                        </>
                    ):(
                        <>
                            {!selectedData && (
                            <div className="col-12 col-lg-4 ps-0 pe-0 pe-lg-4 mb-3 mb-lg-0">
                                <div className="pbg py-5 px-3">
                                    <Finder onSelectData={handleSelectData}/>
                                </div>
                            </div>
                            )}
                            <div className={"col-12 ps-0 pe-0 pe-lg-4 mb-3 mb-lg-0" + (selectedData ? ' col-lg-12 ' : ' col-lg-8 ')}>
                                <div className="pbg p-5">   
                                    <div className={`row finder-text ${selectedData ? 'd-none' : ''}`}>
                                        <div className="col-12 my-auto text-center">
                                            <p className=''>    
                                                Market Finder aracımızla ürünlerin için en uygun olan hedef ülkeyi ve pazaryerini belirleyebileceksiniz. 
                                                Markef Finder, sizin işletmenizle alakali verdiginiz bilgileri yapay zeka ve kendi veritabanları ile
                                                harmanlayarak size hızlı ve etkili bir pazar önerisi sunar.
                                            </p>
                                            <img className='map' src={map} alt="" />
                                            <h5 className='mt-4'>    
                                                Sizin ise tek yapmanız gereken şirketinizin bilgilerini doğru şekilde girerek şirketiniz için en
                                                doğru pazarı bulmak.
                                            </h5>
                                        </div>
                                    </div>
                                    <div>
                                        {selectedData && selectedData2 && <ResultComponent
                                            full={selectedData}
                                            
                                            name={selectedData.name}
                                            logo={selectedData.logo}
                                            title={selectedData.title}
                                            items={selectedData.items}
                                            flag={selectedData.flag}
                                            flag2={selectedData.flag2}
                                            title2={selectedData.title2}
                                            items2={selectedData.items2}
                                            buttonText={selectedData.buttonText}
                                            link={selectedData.marketLink}

                                            full_2={selectedData2}
                                            name_2={selectedData2.name}
                                            logo_2={selectedData2.logo}
                                            title_2={selectedData2.title}
                                            items_2={selectedData2.items}
                                            flag_2={selectedData2.flag}
                                            flag2_2={selectedData2.flag2}
                                            title2_2={selectedData2.title2}
                                            items2_2={selectedData2.items2}
                                            buttonText_2={selectedData2.buttonText}
                                            link_2={selectedData2.marketLink}
                                            handleReset={resetData}
                                            handleClick={handleClick}
                                        />}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </UserPage>
    </>
  );
}

export default MarketFinder;



const ResultComponent = ({ handleReset, full,  logo, items,  link, link_2, buttonText, handleClick, full_2, logo_2, items_2, buttonText_2}) => (
    <div className='row finder-result slideUp fadeIn'>
        <div className="col-6 mt-2">
            <img className='result-logo' src={require(`../Assets/${logo}`)} alt="" />
            <h5>İstatistikler</h5>
            <ul className='finder-ul mb-1'>
                {items.map((item, index) => (
                    <li className='finder-li' key={index}>
                        <p>{item}</p>
                    </li>
                ))}
                    <li className='finder-li'>
                        <p>Daha fazla bilgi almak için <strong><a target='_blank' href={link}>TIKLAYINIZ</a></strong>.</p>
                    </li>
            </ul>
            <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                 <p  className=' mb-2'>
                    {buttonText}
                </p>
                {buttonText && <button className='satin-al' onClick={() => handleClick(full)}>Satışa Başla</button>}
            </div>
        </div>
        <div className="col-6 mt-2">
            <img className='result-logo' src={require(`../Assets/${logo_2}`)} alt="" />
            <h5>İstatistikler</h5>
            <ul className='finder-ul mb-1'>
                {items_2.map((item, index) => (
                    <li className='finder-li' key={index}>
                        <p>{item}</p>
                    </li>
                ))}
                    <li className='finder-li'>
                        <p>Daha fazla bilgi almak için <strong><a target='_blank' href={link_2}>TIKLAYINIZ</a></strong>.</p>
                    </li>
            </ul>
            <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                 <p className=' mb-2'>
                    {buttonText_2}
                </p>
                {buttonText_2 && <button className='satin-al' onClick={() => handleClick(full_2)}>Satışa Başla</button>}
            </div>
        </div>
        <div className='col-12 d-flex justify-content-center'>
            <button onClick={handleReset} className='satin-al me-3'><i class="fa-solid fa-arrow-rotate-left"></i> Ankete Yeniden Başla</button>
        </div>
    </div>
);


const ResultComponentMobile = ({ handleReset, full,  logo, items,  link, link_2, buttonText, handleClick, full_2, logo_2, items_2, buttonText_2}) => (
    <>
    <div className='row finder-result slideUp fadeIn'>
        <Swiper
        allowTouchMove={true}
        grabCursor={true}
        loop={false}
        speed={1000}
        slidesPerView={1}
        pagination={{
          type: 'progressbar',
        }}
        
        navigation={false}
        modules={[Pagination, Navigation]}
        style={{
          }}
      >
        
        <SwiperSlide>
            <div style={{height:"auto"}} className="pbg p-4 col-12 mt-2">
                <img className='result-logo' src={require(`../Assets/${logo}`)} alt="" />
                <h5>İstatistikler</h5>
                <ul className='finder-ul mb-1'>
                    {items.map((item, index) => (
                        <li className='finder-li' key={index}>
                            <p>{item}</p>
                        </li>
                    ))}
                        <li className='finder-li'>
                            <p>Daha fazla bilgi almak için <strong><a target='_blank' href={link}>TIKLAYINIZ</a></strong>.</p>
                        </li>
                </ul>
                <div className='row'>
                    <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                        <button onClick={handleReset} className='satin-al me-3'><i class="fa-solid fa-arrow-rotate-left"></i></button>
                        {buttonText && <button className='satin-al' onClick={() => handleClick(full)}>Satışa Başla</button>}
                    </div>

                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>

                <div style={{height:"auto"}} className="pbg p-4 col-12 mt-2">
                    <img className='result-logo' src={require(`../Assets/${logo_2}`)} alt="" />
                    <h5>İstatistikler</h5>
                    <ul className='finder-ul mb-1'>
                        {items_2.map((item, index) => (
                            <li className='finder-li' key={index}>
                                <p>{item}</p>
                            </li>
                        ))}
                            <li className='finder-li'>
                                <p>Daha fazla bilgi almak için <strong><a target='_blank' href={link_2}>TIKLAYINIZ</a></strong>.</p>
                            </li>
                    </ul>
                    <div className='row'>
                    <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                        <button onClick={handleReset} className='satin-al me-3'><i class="fa-solid fa-arrow-rotate-left"></i></button>
                        {buttonText && <button className='satin-al' onClick={() => handleClick(full)}>Satışa Başla</button>}
                    </div>

                </div>
                </div>
        </SwiperSlide>
        </Swiper>
        </div>
    </>
);
