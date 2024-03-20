import '../admin.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import {  useNavigate  } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import amazon from "../Assets/amazon.png";
import allegro from "../Assets/allegro.png";
import walmart from "../Assets/walmart.png";
import wayfair from "../Assets/wayfair.png";
import etsy from "../Assets/etsy.png"
import emag from "../Assets/emag.png"
import ozon from "../Assets/ozon.png"
import trendyol from "../Assets/trendyol.png"
import Service1 from '../Modals/Plan';
import AdminPage from '../Modals/AdminPage';

function Services() {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);

        const openModal = (item) => {
            setIsModalOpen(true);
            setSelectedItem(item);
            document.body.classList.add('modal-open');
        }

        const closeModal = () => {
            setIsModalOpen(false);    
            document.body.classList.remove('modal-open');
        }

        const serviceItems = [
                { name: 'Amazon Business', type: 'Business', firstPrice:"95.000",  month: false, price: '80.000', logo: "amazon.png", image: "amazon_business.png", 
            },

                { name: 'Amazon Global', type: 'Global', firstPrice:"130.000",  month: false, price: '100.000', logo: "amazon.png", image: "amazon_global.png", 
            },

                { name: 'Amazon Abonelik', type: 'Aylık Abonelik', firstPrice:"22.000", month: "aylık ", price: '17.999', logo: "amazon.png", image: "amazon_abonelik.png", 
            },

                { name: 'Amazon Handmade', type: 'Handmade', firstPrice:"75.000", month: false, price: '59.999', logo: "amazon.png", image: "amazon_handmade.png", 
                info1:"3 aylık Amazon Handmade süreniz dolduktan sonra talep edersiniz Abonelik paketimizle size amazon departman hizmeti",
            },

                { name: 'Amazon Handmade', type: 'Aylık Abonelik', firstPrice:"18.000", month:"true" , price: '13.999', logo: "amazon.png", image: "amazon_handmade_abonelik.png", 
                info1:"3 aylık Amazon Handmade süreniz dolduktan sonra talep edersiniz Abonelik paketimizle size amazon departman hizmeti",
            },

                { name: 'Etsy Enterprise', type: 'Enterprise', firstPrice:"32.000", month: false, price: '27.500', logo: "etsy.png", image: "etsy_enterprise.png", 
            },

                { name: 'Etsy Star-Seller', type: 'Star-Seller', firstPrice:"36.000", month: false, price: '32.000', logo: "etsy.png", image: "etsy_star.png", 
            },

                { name: 'Etsy Abonelik', type: 'Aylık Abonelik', firstPrice:"13.000", month: false, price: '9.999', logo: "etsy.png", image: "etsy_abonelik.png", 
                info1:"Abonelik sistemimizle çalışan firmalarımız talep ettiği sürece her ay aboneliği yenilenmektedir.",
            },

                { name: 'Etsy Yeni Girişimci', type: 'KOBİ Paketi', firstPrice:"18.000", month: false, price: '25.000', logo: "etsy.png", image: "etsy_starter.png", 
                info1:"Atölyeler, ev hanımları ve genç girişimciler için hazırlanmış özel paketimiz. \nHizmet süresi sonunda müşterilerimiz aylık abonelik hizmetimizle çalışmaya devam edebilirler.",
            },

                { name: 'Allegro Business', type: 'Business', firstPrice:"39.000", month: false, price: '34.000', logo: "allegro.png", image: "allegro_business.png", 
                info2: "Döviz ödemeleri güncel döviz kurundan TL ile yapılabilmektedir.",
            },

                { name: 'Allegro Abonelik', type: 'Aylık Abonelik', firstPrice:"20.000", month: true , price: '17.500', logo: "allegro.png", image: "allegro_abonelik.png", 
                info2: "Döviz ödemeleri güncel döviz kurundan TL ile yapılabilmektedir.",
            },

                { name: 'Trendyol KOBİ', type: 'KOBİ Paketi', firstPrice:"22.000", month: false, price: '18.000', logo: "trendyol.png", image: "trendyol_kobi.png", 
            },

                { name: 'Trendyol Abonelik', type: 'Aylık Abonelik', firstPrice:"12.000", month:"true" , price: '10.000', logo: "trendyol.png", image: "trendyol_abonelik.png", 
            },

                { name: 'Walmart Business', type: 'Business', firstPrice:"95.000", month: false, price: '80.000', logo: "walmart.png", image: "walmart_business.png", 
            },

                { name: 'Walmart Abonelik', type: 'Aylık Abonelik', firstPrice:"35.000", month:"true" , price: '29.000', logo: "walmart.png", image: "walmart_abonelik.png", 
            },

                { name: 'Wayfair Business', type: 'Business', firstPrice:"85.000", month: false, price: '73.999', logo: "wayfair.png", image: "wayfair_business.png", 
            },

                { name: 'Wayfair Abonelik', type: 'Aylık Abonelik', firstPrice:"31.000", month:"true" , price: '25.999', logo: "wayfair.png", image: "wayfair_abonelik.png", 
            },

                { name: 'Emag Giriş', type: 'Starter', firstPrice:"21.000", month: false, price: '17.999', logo: "emag.png", image: "emag_starter.png", 
                info3: "Vezüve Romanya ofisi ve ara deposuyla sizlere hizmet vermektedir.",
            },

                { name: 'Ozon Global', type: 'Global', firstPrice:"37.000", month: false, price: '29.999', logo: "ozon.png", image: "ozon_global.png", 
                info4:"Vezüve Ozon'nun Türkiye'deki yetkili servis sağlayıcısıdır."
            },

                { name: 'Ozon Abonelik', type: 'Aylık Abonelik', firstPrice:"15.000", month:"true" , price: '11.999', logo: "ozon.png", image: "ozon_abonelik.png", 
                info4:"Vezüve Ozon'nun Türkiye'deki yetkili servis sağlayıcısıdır."
            },
            ];

        const ownServices = [
            {name: "İNGİLTERE ŞİRKET KURULUMU" , price:"deneme", description:"İngiltere pazarında satış süreçlerini başlatmak için İngiltere’de Tüzel kişiliğe sahip olmanız gerekir. Partner firmalarımız ile şirket kurulum süreçleriniz hızla tamamlayın.", },
            {name: "İNGİLTERE MUHASEBE HİZMETİ" ,  price:"deneme", description:"İngiltere’de muhasebe süreçlerinizi takip etmesi için bir muhasebeci ile çalışmalısınız. Partner firmalarımız ile en uygun fiyatlara muhasebe hizmeti satın alın.", },
            {name: "ABD ŞİRKET KURULUMU" ,  price:"deneme", description:"Amerika pazarında satış süreçlerini başlatmak için Amerika’da Tüzel kişiliğe sahip olmanız gerekir. Partner firmalarımız ile şirket kurulum süreçleriniz hızla tamamlayın.",},
            {name: "AMERİKA MUHASEBE HİZMETİ" ,  price:"deneme", description:"Amerikada Muhasebesel süreçlerinizi takip etmesi için bir muhasebeci ile çalışmalısınız. Partner firmalarımız ile en uygun fiyatlara muhasebe hizmeti satın alın.",},
            {name: "ALMANYA VAT KAYDI" ,  price:"deneme", description:"Avrupa’da satış süreçlerinizi başlatmak için Türkiyedeki şirketiniz adına Vergi kaydı oluşturmalısınız. Partner firmalarımız ile en uygun fiyatlara vat kaydı hizmeti satın alın.",},
            {name: "WEB SİTESİ ALTYAPISI" ,  price:"deneme", description:"E-Ticarete başladığınızda markanızı ve ürünlerinizi tanıtacak size ait bir web siteniz olmalı. Vezüve partnerleri ile yüksek hızlı, e-ihracat uygun, web sitelerinizi oluşturun. ",},
            {name: "YURTDIŞI MARKA TESCİLİ" ,  price:"deneme", description:"Markanızı satış yaptığınız ülkede tescil ettirmek ürünlerinizi ve fikirlerinizi korur. Yurtdışı marka tescil işlemleri için Vezüve partnerleri ile çalışın.",},
            {name: "LOJİSTİK" ,  price:"deneme", description:"Ürünlerinizi yurtdışına güvenli şekilde taşımak için lojistik firmalarından teklif alın.",},   
            {name: "GÜMRÜK" ,  price:"deneme", description:"İhracat süreçlerinizi tamamlamak, beyannamelerinizi hazırlamak için partner gümrük şirketlerinden teklif alın.",},
            {name: "SERTİFİKASYON BELGELENDİRME" ,  price:"deneme", description:"Ürünlerinizin yurtdışına çıkabilmesi için bazı sertifikalara ihtiyacı olabilir. FDA, MSDS gibi belgelendirme süreçlerini hızla tamamlayın.",},
        ];

        const [activeTab, setActiveTab] = useState('amazon'); // Initialize with the default active tab

        useEffect(() => {
            const storedTab = JSON.parse(localStorage.getItem("tab"));
            if (storedTab) {
                setActiveTab(storedTab);
            }
            localStorage.setItem("tab", JSON.stringify(""));
        }, []);
        
        
        return (
            <>
            <Service1 isOpen={isModalOpen} onClose={closeModal} selectedItem={selectedItem} serviceItems={serviceItems} />

            <AdminPage  pageName={"Hizmetlerimiz"}>

            <div className="col-12 slideleft">
                            <div className="row">
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
                                                                <div className="col-3 mb-4">
                                                                        <div  onClick={() => openModal(serviceItems[0])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{serviceItems[0].name}</p>
                                                                            <p className='hizmet-tür' >{serviceItems[0].type}</p>
                                                                            <p className='hizmet-ücret' >{serviceItems[0].price}₺</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>  
                                                                
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                        <div onClick={() => openModal(serviceItems[1])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >{serviceItems[1].name}</p>
                                                                            <p className='hizmet-tür' >{serviceItems[1].type}</p>
                                                                            <p className='hizmet-ücret' >{serviceItems[1].price}₺</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[2])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >Amazon Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >17.999₺/aylık</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'handmade' ? 'show active' : ''}`} id="amazonHandmade" role="tabpanel" aria-labelledby="amazonHandmade-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[3])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >Amazon Handmade</p>
                                                                            <p className='hizmet-tür' >Handmade</p>
                                                                            <p className='hizmet-ücret' >59.999₺</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[4])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >Amazon Handmade</p>
                                                                            <p className='hizmet-tür' >Abonelik </p>
                                                                            <p className='hizmet-ücret' >13.999₺/aylık</p>
                                                                            <img className='hizmet-img' src={amazon} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'etsy' ? 'show active' : ''}`} id="etsy" role="tabpanel" aria-labelledby="etsy-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[5])} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Etsy Enterprise</p>
                                                                            <p className='hizmet-tür' >Enterprise</p>
                                                                            <p className='hizmet-ücret' >27.500₺</p>
                                                                            <img className='hizmet-img' src={etsy} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[6])} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Etsy Star-seller</p>
                                                                            <p className='hizmet-tür' > Star-seller </p>
                                                                            <p className='hizmet-ücret' >32.000₺</p>
                                                                            <img className='hizmet-img' src={etsy} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                                <div onClick={() => openModal(serviceItems[7])} className="col-3 mb-4">
                                                                    
                                                                        <div className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Etsy Aylık</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik </p>
                                                                            <p className='hizmet-ücret' >9.999₺/aylık</p>
                                                                            <img className='hizmet-img' src={etsy} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div onClick={() => openModal(serviceItems[8])} className="col-3 mb-4">
                                                                    
                                                                        <div className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Etsy Yeni Girişimci</p>
                                                                            <p className='hizmet-tür' >Kobi Paketi</p>
                                                                            <p className='hizmet-ücret' >18.000₺</p>
                                                                            <img className='hizmet-img' src={etsy} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'allegro' ? 'show active' : ''}`} id="allegro" role="tabpanel" aria-labelledby="allegro-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[9])} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Allegro Business</p>
                                                                            <p className='hizmet-tür' >Business</p>
                                                                            <p className='hizmet-ücret' >34.000₺</p>
                                                                            <img className='hizmet-img' src={allegro} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[10])} className="hizmet allegro">
                                                                            <p className='hizmet-isim' >Allegro Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >17.500₺/aylık</p>
                                                                            <img className='hizmet-img' src={allegro} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'trendyol' ? 'show active' : ''}`} id="trendyol" role="tabpanel" aria-labelledby="trendyol-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[11])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >Trendyol KOBİ</p>
                                                                            <p className='hizmet-tür' >KOBİ</p>
                                                                            <p className='hizmet-ücret' >18.000₺</p>
                                                                            <img className='hizmet-img' src={trendyol} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[12])} className="hizmet amazon">
                                                                            <p className='hizmet-isim' >Trendyol Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >10.000₺/aylık</p>
                                                                            <img className='hizmet-img' src={trendyol} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'walmart' ? 'show active' : ''}`} id="walmart" role="tabpanel" aria-labelledby="walmart-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[13])} className="hizmet walmart">
                                                                            <p className='hizmet-isim' >Walmart Business</p>
                                                                            <p className='hizmet-tür' >Business</p>
                                                                            <p className='hizmet-ücret' >80.000₺</p>
                                                                            <img className='hizmet-img' src={walmart} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[14])} className="hizmet walmart">
                                                                            <p className='hizmet-isim' >Walmart Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >29.000₺/aylık</p>
                                                                            <img className='hizmet-img' src={walmart} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'wayfair' ? 'show active' : ''}`} id="wayfair" role="tabpanel" aria-labelledby="wayfair-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[15])} className="hizmet wayfair">
                                                                            <p className='hizmet-isim' >Wayfair Business</p>
                                                                            <p className='hizmet-tür' >Business</p>
                                                                            <p className='hizmet-ücret' >73.999₺</p>
                                                                            <img className='hizmet-img' src={wayfair} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[16])} className="hizmet wayfair">
                                                                            <p className='hizmet-isim' >Wayfair Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >25.999₺/aylık</p>
                                                                            <img className='hizmet-img' src={wayfair} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'emag' ? 'show active' : ''}`} id="emag" role="tabpanel" aria-labelledby="emag-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[17])} className="hizmet ozon">
                                                                            <p className='hizmet-isim' >Emag Giriş</p>
                                                                            <p className='hizmet-tür' >Starter Pack</p>
                                                                            <p className='hizmet-ücret' >17.500₺</p>
                                                                            <img className='hizmet-img' src={emag} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane fade ${activeTab === 'ozon' ? 'show active' : ''}`} id="ozon" role="tabpanel" aria-labelledby="ozon-tab">
                                                            <div className="row mt-4">
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[18])} className="hizmet ozon">
                                                                            <p className='hizmet-isim' >Ozon Business</p>
                                                                            <p className='hizmet-tür' >Hizmet Türü</p>
                                                                            <p className='hizmet-ücret' >29.999₺</p>
                                                                            <img className='hizmet-img' src={ozon} alt="" />
                                                                        </div>  
                                                                    
                                                                </div>
                                                                <div className="col-3 mb-4">
                                                                    
                                                                        <div onClick={() => openModal(serviceItems[19])} className="hizmet ozon">
                                                                            <p className='hizmet-isim' >Ozon Abonelik</p>
                                                                            <p className='hizmet-tür' >Aylık Abonelik</p>
                                                                            <p className='hizmet-ücret' >11.999/aylık</p>
                                                                            <img className='hizmet-img' src={ozon} alt="" />
                                                                        </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <div className="hizmet-wrap-vezu">
                                                <p>Hizmet Açıklamalarını Okumak İçin Hizmetin Üstüne Tıklayınız.</p>
                                            <div className="row mt-3">
                                                {ownServices.map((service, index) => (
                                                    <div className="col-4 mb-4" key={index}>
                                                        <div className="">
                                                            <div className="accordion accordion-flush hizmet vezu" id={`accordionPanelsStayOpenExample-${index}`}>  
                                                                <div class="accordion-item">
                                                                    <h2 className="accordion-header" id={`panelsStayOpen-heading-${index}`}> 
                                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${index}`}>    
                                                                            <p className='hizmet-isim'>{service.name}</p>
                                                                        </button>
                                                                    </h2>
                                                                    <div id={`panelsStayOpen-collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading-${index}`}>      
                                                                        <div class="accordion-body pt-0">
                                                                            <p className='hizmet-tür'>{service.description}</p>
                                                                        </div>
                                                                    </div>
                                                            <button className='hizmet-buton'>Teklif Alın</button>
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
            </AdminPage>
        
    </>
  );
}

export default Services;
