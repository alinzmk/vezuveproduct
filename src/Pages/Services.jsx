import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import {  useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import amazon from "../Assets/amazon.png";
import allegro from "../Assets/allegro.png";
import walmart from "../Assets/walmart.png";
import wayfair from "../Assets/wayfair.png";
import etsy from "../Assets/etsy.png"
import emag from "../Assets/emag.png"
import ozon from "../Assets/ozon.png"
import trendyol from "../Assets/trendyol.png"
import Service1 from '../Modals/Plan';
import UserPage from '../Modals/UserPage';
import { successNotification } from '../Modals/Notification';
import {sendPartnerMail} from "../ApiService"
import fetchAllRedux from '../redux/fetchAllRedux';

function Services() {

        const accessToken = sessionStorage.getItem("token");
        const navigate = useNavigate();
        if(!accessToken) {
            navigate("/");
        }
       //------------------------------------------------------------------------------   
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);
        const [activeTab, setActiveTab] = useState('amazon'); // Initialize with the default active tab
        const [isMobile, setIsMobile] = useState(false);
        
        const dispatch = useDispatch();
        
        const {servicepkgs} = useSelector((state) => state.servicepkgs);
        const {partner} = useSelector((state) => state.partner);
        console.log(servicepkgs)
        //------------------------------------------------------------------------------   
        if(servicepkgs.length === 0){
            dispatch(fetchAllRedux())
        }   
        
        //------------------------------------------------------------------------------   
        const openModal = (item) => {
            setIsModalOpen(true);
            setSelectedItem(item);
            document.body.classList.add('modal-open');
        }
    
        const closeModal = () => {
            setIsModalOpen(false);    
            document.body.classList.remove('modal-open');
        }
    
     
        useEffect(() => {
            const storedTab = JSON.parse(sessionStorage.getItem("tab"));
            if (storedTab) {
                setActiveTab(storedTab);
            }
            sessionStorage.setItem("tab", JSON.stringify(""));
        }, []);
    
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
    
    
        const handleSendPartnerMail = async (serviceID) => {
            try {
            const result = await sendPartnerMail(accessToken, serviceID);
            if (result.status === 200) {
                console.log('');
                successNotification('İsteğiniz Başarıyla Gönderildi');
            } else {
                console.error(result);
            }
            } catch (error) {
            console.error('Error setting user data:', error);
            }
        };
        
          
        const filterPackagesByFirstWord = (packages, keyword) => {
        return packages.filter(pkg => {
            return pkg.code.toLowerCase().startsWith(keyword.toLowerCase());
        });
        };

        const tostr = (x) => {
            return toString(x)
        }

    
    
        return (
    <>
    <Service1 isOpen={isModalOpen} onClose={closeModal} selectedItem={selectedItem} />
        <UserPage pageName={"Hizmetler"}>
            <section className='hizmetler'>
                <div className="col-12 slideleft">
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="col-11 pbg pt-3">
                            <nav>
                                <div class="nav nav-tabs" id="service-tab" role="tablist">
                                    <button class="nav-link active services-active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Destekler</button>
                                    <button class="nav-link  services-active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Hizmetler</button>
                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div className="hizmet-wrap">
                                        <div className="row">
                                            {isMobile ? (
                                                <>
                                                    <div class="accordion" id="accordionExample">
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingOne">
                                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                Amazon
                                                            </button>
                                                            </h2>
                                                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body">
                                                                    <div className={`tab-pane fade ${activeTab === 'amazon' ? 'show active' : ''}`} id="amazon" role="tabpanel" aria-labelledby="amazon-tab">
                                                                        <div className="row mt-4">
                                                                        {filterPackagesByFirstWord(servicepkgs, 'TAMZN').map((pkg, index)=>
                                                                            <>
                                                                                <div className="col-xl-3 col-lg-6 col-12 mb-4">
                                                                                    <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                                        <p className='hizmet-isim' >{pkg.name}</p>
                                                                                        <p className='hizmet-ücret' >{pkg.price}{pkg.currency}</p>
                                                                                        <img className='hizmet-img' src={amazon} alt="" />
                                                                                    </div>  
                                                                                </div>  
                                                                            </>
                                                                        )}
                                                                        </div>
                                                                    </div>                                                            
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingTwo">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Amazon Handmade
                                                            </button>
                                                            </h2>
                                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                        {filterPackagesByFirstWord(servicepkgs, 'THNM').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4">
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                        
                                                    </div>                                                            
                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingThree">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                Etsy
                                                            </button>
                                                            </h2>
                                                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TET').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4">
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet allegro">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={etsy} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                                
                                                        </div>    
                                                    </div>                                                            
                                                    </div>
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingFour">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                Allegro
                                                            </button>
                                                            </h2>
                                                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                        {filterPackagesByFirstWord(servicepkgs, 'TALG').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4">
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={allegro} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>                                                     
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingFive">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                Trendyol
                                                            </button>
                                                            </h2>
                                                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TTRDY').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4">
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={trendyol} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                            
                                                        </div>
                                                    </div>                                                            </div>
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingSix">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                                Walmart
                                                            </button>
                                                            </h2>
                                                            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                                        <div className="row mt-4">
                                                                        {filterPackagesByFirstWord(servicepkgs, 'TWLMT').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4">
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet walmart">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={walmart} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                                        </div>
                                                                </div>   
                                                                </div>
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingSeven">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                                Wayfair
                                                            </button>
                                                            </h2>
                                                            <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                        {filterPackagesByFirstWord(servicepkgs, 'TWF').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4">
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet wayfair">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={wayfair} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>                                 
                                                    </div>
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingEight">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                                                Emag
                                                            </button>
                                                            </h2>
                                                            <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                            
                                                        <div className="row mt-4">
                                                            <div className="col-12 col-lg-3 mb-4">
                                                                {filterPackagesByFirstWord(servicepkgs, 'TEG').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4">
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet walmart">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={emag} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>                                                            </div>
                                                            </div>
                                                        
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingNine">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                                                Ozon
                                                            </button>
                                                            </h2>
                                                            <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TO').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4">
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet ozon">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={ozon} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>                                                        
                                                        </div>
                                                        </div>
                                                        </div>
                                                    
                                                    </div>
                                                </>
                                            ):(<>
                                                <nav>
                                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <button className={`nav-link ${activeTab === 'amazon' ? 'active' : ''}`} id="amazon-tab" data-bs-toggle="tab" data-bs-target="#amazon" type="button" role="tab" aria-controls="amazon" aria-selected={activeTab === 'amazon' ? 'true' : 'false'}>Amazon</button>
                                                        <button className={`nav-link ${activeTab === 'handmade' ? 'active' : ''}`} id="amazonHandmade-tab" data-bs-toggle="tab" data-bs-target="#amazonHandmade" type="button" role="tab" aria-controls="amazonHandmade" aria-selected={activeTab === 'handmade' ? 'true' : 'false'}>Amazon Handmade</button>
                                                        <button className={`nav-link ${activeTab === 'etsy' ? 'active' : ''}`} id="etsy-tab" data-bs-toggle="tab" data-bs-target="#etsy" type="button" role="tab" aria-controls="etsy" aria-selected="true">Etsy</button>
                                                        <button className={`nav-link ${activeTab === 'allegro' ? 'active' : ''}`} id="allegro-tab" data-bs-toggle="tab" data-bs-target="#allegro" type="button" role="tab" aria-controls="allegro" aria-selected="false">Allegro</button>
                                                        <button className={`nav-link ${activeTab === 'trendyol' ? 'active' : ''}`} id="trendyol-tab" data-bs-toggle="tab" data-bs-target="#trendyol" type="button" role="tab" aria-controls="trendyol" aria-selected="false">Trendyol</button>
                                                        <button className={`nav-link ${activeTab === 'walmart' ? 'active' : ''}`} id="walmart-tab" data-bs-toggle="tab" data-bs-target="#walmart" type="button" role="tab" aria-controls="walmart" aria-selected="false">Walmart</button>
                                                        <button className={`nav-link ${activeTab === 'wayfair' ? 'active' : ''}`} id="wayfair-tab" data-bs-toggle="tab" data-bs-target="#wayfair" type="button" role="tab" aria-controls="wayfair" aria-selected="false">Wayfair</button>
                                                        <button className={`nav-link ${activeTab === 'emag' ? 'active' : ''}`} id="emag-tab" data-bs-toggle="tab" data-bs-target="#emag" type="button" role="tab" aria-controls="emag" aria-selected="false">Emag</button>
                                                        <button className={`nav-link ${activeTab === 'ozon' ? 'active' : ''}`} id="ozon-tab" data-bs-toggle="tab" data-bs-target="#ozon" type="button" role="tab" aria-controls="ozon" aria-selected="false">Ozon</button>
                                                    </div>
                                                </nav>
                                                <div class="tab-content" id="nav-tabContent">
                                                    <div className={`tab-pane fade ${activeTab === 'amazon' ? 'show active' : ''}`} id="amazon" role="tabpanel" aria-labelledby="amazon-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TAMZN').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-xl-3 col-lg-6 col-12 mb-4" key={index}>
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'handmade' ? 'show active' : ''}`} id="amazonHandmade" role="tabpanel" aria-labelledby="amazonHandmade-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'THNM').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'etsy' ? 'show active' : ''}`} id="etsy" role="tabpanel" aria-labelledby="etsy-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TET').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={etsy} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'allegro' ? 'show active' : ''}`} id="allegro" role="tabpanel" aria-labelledby="allegro-tab">
                                                        <div className="row mt-4">
                                                        {filterPackagesByFirstWord(servicepkgs, 'TALG').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={allegro} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'trendyol' ? 'show active' : ''}`} id="trendyol" role="tabpanel" aria-labelledby="trendyol-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TTRDY').map((pkg, index)=>
                                                                <>
                                                                    <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                        <div  onClick={() => openModal(pkg)} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{pkg.name}</p>
                                                                            <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                            <img className='hizmet-img' src={trendyol} alt="" />
                                                                        </div>  
                                                                    </div>  
                                                                </>
                                                            )}
                                                            
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'walmart' ? 'show active' : ''}`} id="walmart" role="tabpanel" aria-labelledby="walmart-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TWLMT').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet walmart">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={walmart} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'wayfair' ? 'show active' : ''}`} id="wayfair" role="tabpanel" aria-labelledby="wayfair-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TWF').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet wayfair">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={wayfair} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'emag' ? 'show active' : ''}`} id="emag" role="tabpanel" aria-labelledby="emag-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TEG').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet walmart">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={emag} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${activeTab === 'ozon' ? 'show active' : ''}`} id="ozon" role="tabpanel" aria-labelledby="ozon-tab">
                                                        <div className="row mt-4">
                                                            {filterPackagesByFirstWord(servicepkgs, 'TO').map((pkg, index)=>
                                                                    <>
                                                                        <div className="col-12 col-lg-3 mb-4" key={index}>
                                                                            <div  onClick={() => openModal(pkg)} className="hizmet ozon">
                                                                                <p className='hizmet-isim' >{pkg.name}</p>
                                                                                <p className='hizmet-ücret' >{pkg.price} {pkg.currency}</p>
                                                                                <img className='hizmet-img' src={ozon} alt="" />
                                                                            </div>  
                                                                        </div>  
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)}
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className="hizmet-wrap-vezu">
                                        <p>Hizmet Açıklamalarını Okumak İçin Hizmetin Üstüne Tıklayınız.</p>
                                        <div className="row mt-3">
                                            {partner && partner.data && partner.data.partners && partner.data.partners.map((ppartner, index) => (
                                                <div className="col-12 col-lg-4 mb-4" key={index}>
                                                    <div className="">
                                                        <div className="accordion accordion-flush hizmet vezu" id={`accordionPanelsStayOpenExample-${index}`}>  
                                                            <div class="accordion-item">
                                                                <h2 className="accordion-header" id={`panelsStayOpen-heading-${index}`}>
                                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${index}`}>    
                                                                        <p className='hizmet-isim'>{ppartner.category}</p>
                                                                    </button>
                                                                </h2>
                                                                <div id={`panelsStayOpen-collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading-${index}`}>
                                                                    <div class="accordion-body pt-0">
                                                                        <p className='hizmet-tür'>{ppartner.detail}</p>
                                                                    </div>
                                                                </div>
                                                                {ppartner.partner_id !== undefined ? (
                                                                    partner.data.user.includes(ppartner.partner_id.toString()) ? (
                                                                        // If ppartner.partner_id exists in partner.data.user
                                                                        <>
                                                                            <button className='hizmet-buton2'>
                                                                                Talebiniz Alındı
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        // If ppartner.partner_id doesn't exist in partner.data.user
                                                                        <>
                                                                            <button className='hizmet-buton' onClick={() => handleSendPartnerMail(ppartner.partner_id)}>
                                                                                Teklif Alın
                                                                            </button>
                                                                        </>
                                                                    )
                                                                ) : (
                                                                    // Handle the case where ppartner.partner_id is undefined
                                                                    // You can render some fallback UI or handle it as per your requirement
                                                                    <div>Partner ID is undefined</div>
                                                                )}
                                                                <img className='hizmet-img' src={logo} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserPage>
    </>
  );
}

export default Services;
