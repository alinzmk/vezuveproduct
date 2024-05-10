import logo from "../Assets/logo-renkli.png"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import Finder from '../Modals/Finder-App';
import map from "../Assets/worldmap.png"
import Requirements from '../Modals/Requirements';
import AdminPage from '../Modals/AdminPage';

function MarketFinder() {


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState("");

    const [selectedData, setSelectedData] = useState(null);
    const [selectedData2, setSelectedData2] = useState(null);

    const openModal = (x) => {
        setSelectedVideoId(x);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedVideoId(null);
        setModalIsOpen(false);
    };
    

    const handleSelectData = (data, data2) => {
        setSelectedData(data);
        setSelectedData2(data2);
    };

    const handleClick = (fullData) => {
        openModal(fullData);
    };

  return (
      <>
      <Requirements
            isOpen={modalIsOpen}
            closeModal={closeModal}
            fullData={{selectedVideoId}}
        />

        <AdminPage pageName={"Market Finder (BETA)"}>
        <div className="finder-wrapper">
            <div className="row slideleft ">

                <div className="col-4 ps-0 pe-4">
                    <div className="pbg py-5 px-3">
                        <Finder onSelectData={handleSelectData}/>
                    </div>
                </div>

                <div className="col-8 ps-0 h-100">
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
                                
                                handleClick={handleClick}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AdminPage>
    </>
  );
}

export default MarketFinder;



const ResultComponent = ({ full, name, logo, items, flag, flag2, items2, buttonText, handleClick, full_2, name_2, logo_2, title_2, items_2, flag_2, flag2_2, title2_2, items2_2, buttonText_2}) => (
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
                        <p>Daha fazla bilgi almak için <strong><a target='_blank' href={flag}>TIKLAYINIZ</a></strong>.</p>
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
                        <p>Daha fazla bilgi almak için <strong><a target='_blank' href={flag}>TIKLAYINIZ</a></strong>.</p>
                    </li>
            </ul>
            <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                 <p className=' mb-2'>
                    {buttonText_2}
                </p>
                {buttonText_2 && <button className='satin-al' onClick={() => handleClick(full_2)}>Satışa Başla</button>}
            </div>
        </div>
    </div>
);
