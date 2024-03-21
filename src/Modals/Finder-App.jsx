import "../App.css"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { EffectCreative } from 'swiper/modules';
import { useCallback } from "react";
import { toast } from 'react-toastify';
import { warningNotification } from "./Notification";
import { getMarketFinder } from "../ApiService";

export default function App(props) {

    const accessToken = sessionStorage.getItem("token")
    const [employeeCount, setEmployeeCount] = useState("Belirtilmedi");
    const [productCategory, setProductCategory] = useState("Belirtilmedi");
    const [TurkeySalesVolume, setTurkeySalesVolume] = useState("Belirtilmedi");
    const [hasWebsite, setHasWebsite] = useState(null);
    const [hasTurkeySales, setHasTurkeySales] = useState(null);
    const [hasInternationalSales, setHasInternationalSales] = useState(null);
    const [hasStore, setHasStore] = useState(null);
    const [desiInfo, setDesiInfo] = useState(null);
    const sliderRef = useRef(null);
    const [error, setError] = useState(null);
    const defaultOption = "Lütfen bir seçenek işaretleyiniz"

    const requestData = {
      category: productCategory,
      webPage: hasWebsite,
      activeSale: hasTurkeySales,
      saleAbroad: hasInternationalSales,
      totalSale: TurkeySalesVolume,
      realShop: hasStore,
      worker: employeeCount,
    };

    const handleGetMarketFinder = async () => {
      try {
        const result = await getMarketFinder(accessToken, requestData);
        if (result.status === 200) {
          onSelectData(data.find(item => item.name ===result.marketPlaces[0]), data.find(item => item.name ===result.marketPlaces[1]));
          setEmployeeCount("Belirtilmedi")
          setProductCategory("Belirtilmedi")
          setTurkeySalesVolume("Belirtilmedi")
          setHasWebsite(null)
          setHasTurkeySales(null)
          setHasInternationalSales(null)
          setHasStore(null)
          setDesiInfo(null)
        } else {
        }
      } catch (error) {
        setError('Error fetching market finder data. Please try again later.');
      }
      
    };

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handlePrevto1 = useCallback((x) => {
      if (x===null || x===""){
        return;
      }
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideTo(0);
  }, []);

    const handleNext = useCallback((x) => {
        if (x===null || x==="Belirtilmedi"){
          warningNotification("Lütfen bir seçenek işaretleyiniz")
          return;
        }
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

 
    

  const handleSubmit = (e) => {
      e.preventDefault();

      console.log(
        "employeeCount: ",employeeCount,
        "productCategory: ",productCategory,
        "TurkeySalesVolume: ",TurkeySalesVolume,
        "hasWebsite: ",hasWebsite,
        "hasTurkeySales: ",hasTurkeySales,
        "hasInternationalSales: ",hasInternationalSales,
        "hasStore: ",hasStore,
        "desiInfo: ",desiInfo,)


      handleGetMarketFinder()
      

  };


  const { onSelectData } = props;



  return (
    <>
      <form onSubmit={handleSubmit}>
      <Swiper
        allowTouchMove={false}
        ref={sliderRef}
        grabCursor={false}
        loop={false}
        speed={1000}
        slidesPerView={1}
        pagination={{
          type: 'progressbar',
        }}
        
        navigation={false}
        modules={[Pagination, Navigation, EffectCreative]}
        style={{
          }}
        className="mySwiper"
      >
        <SwiperSlide>
            
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye’de veya yurtdışında online satışa açık, Üretimini yaptığınız veya tedarik ettiğiniz ürünlerin bulunduğu, firmanızı anlatan bir web sitesine sahip misiniz ?
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-4">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasWebsite === true}
                      onChange={() => setHasWebsite(true)}
                    />
                    <span className="radio-label">Evet, Var.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasWebsite === false}
                      onChange={() => setHasWebsite(false)}
                    />
                    <span className="radio-label">Hayır, Yok.</span>
                  </label>
              </div>
              <div className="next-arrow" onClick={()=>handleNext(hasWebsite)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye pazaryerlerinde veya sosyal medya üzerinden (Trendyol, Hepsiburada, Amazon, Pttavm, instagram, Facebook) aktif olaran e-ticaret yapıyor musunuz? 
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasTurkeySales === true}
                      onChange={() => setHasTurkeySales(true)}
                    />
                    <span className="radio-label">Evet, Yapıyorum.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasTurkeySales === false}
                      onChange={() => setHasTurkeySales(false)}
                    />
                    <span className="radio-label">Hayır, Yapmıyorum.</span>
                  </label>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasTurkeySales)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Yurtdışında online pazarlar da (Amazon, Etsy, E-bay) perakende satış veya toplu ihracat yapıyor musunuz ?                  
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasInternationalSales === true}
                      onChange={() => setHasInternationalSales(true)}
                    />
                    <span className="radio-label">Evet, Yapıyorum.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasInternationalSales === false}
                      onChange={() => setHasInternationalSales(false)}
                    />
                    <span className="radio-label">Hayır, Yapmıyorum.</span>
                  </label>


              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasInternationalSales)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                      Türkiye pazarında online veya geleneksel ticaret ile firmanızın toplam satış geliri ortalaması hangi aralıktadır?
                  </h5>
                    <select className='custom-select text-center mt-3' value={TurkeySalesVolume} onChange={(e) => setTurkeySalesVolume(parseInt(e.target.value))}>
                        <option value="">{defaultOption}</option>
                        <option className="" value="250000">100.000₺-250.000₺</option>
                        <option className="" value="500000">250.000₺-500.000₺</option>
                        <option className="" value="1000000">500.000₺-1.000.000₺</option>
                        <option className="" value="1000001">1.000.000₺+</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(TurkeySalesVolume)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye de veya yurtdışında ürünlerinizi sergilediğiniz aktif satış taptığınız fiziki bir mağazanız bulunuyor mu ?                  
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasStore === true}
                      onChange={() => setHasStore(true)}
                    />
                    <span className="radio-label">Evet, Var.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasStore === false}
                      onChange={() => setHasStore(false)}
                    />
                    <span className="radio-label">Hayır, Yok.</span>
                  </label>


              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasStore)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Satışını yaptığınız ürün grubunun ana kategorisisi nedir ?
                  </h5>
                    <select className='custom-select text-center mt-3' defaultValue="Lütfen Seçiniz" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                      <option value="">{defaultOption}</option>
                      <option value="mobilya">Mobilya</option>
                      <option value="kozmetik">Kozmetik</option>
                      <option value="takı">Takı</option>
                      <option value="ev dekor">Ev-Dekor</option>
                      <option value="gıda">Gıda</option>
                      <option value="kıyafet">Kıyafet</option>
                      <option value="oyuncak">Oyuncak</option>
                      <option value="pet">Pet</option>
                      <option value="inşaat">İnşaat</option>
                      <option value="otomotiv">Otomotiv</option>
                      <option value="kırtasiye">Kırtasiye</option>
                      <option value="ayakkabı">Ayakkabı</option>
                      <option value="elektronik">Elektronik</option>
                      <option value="sağlık">Sağlık</option>
                      <option value="anne bebek">Anne/Bebek</option>
                      <option value="spor">Spor</option>
                      <option value="çanta">Çanta</option>
                      <option value="tarım">Tarım</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(productCategory)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Ürünleriniz ortalama hangi desi aralığındadır ?
                  </h5>
                    <select className='custom-select text-center mt-3' value={desiInfo} onChange={(e) => setDesiInfo(parseInt(e.target.value))}>
                      <option value="">{defaultOption}</option>
                      <option value="1">0-1 desi</option>
                      <option value="5">1-5 desi</option>
                      <option value="10">5-10 desi</option>
                      <option value="20">10-20 desi</option>
                      <option value="21">20+ desi</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(desiInfo)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiyede ki işletmenizde tüm birimler dahil kaç tam zamanlı çalışana sahipsiniz? 
                  </h5>
                    <select className='custom-select text-center mt-3'value={employeeCount} onChange={(e) => setEmployeeCount(parseInt(e.target.value))}>
                    <option value="">{defaultOption}</option>
                        <option value="10">1-10</option>
                        <option value="50">11-50</option>
                        <option value="100">51-100</option>
                        <option value="101">101+</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <button className='finder-submit mt-4' onClick={()=>handlePrevto1(employeeCount)} type="submit">PAZAR YERİ ÖNER<i class="fa-solid fa-angles-right ms-2"></i></button>
            </div>
        </SwiperSlide>
      </Swiper>
      </form>
    </>
  );
}


const data = 
[
  {   
    name: "Amazon",
    logo: 'amazon.png',
    items: [
      "ABD Yıllık Satış 314 Milyar Dolar Aylık 3 Milyar Ziyaretçi",
      "UK Yıllık Satış 30 Milyar Euro Aylık 400 milyon Ziyaretçi",
      "AVRUPA 51 Milyar Euro Yıllık Satış Aylık 800 Milyon Ziyaretçi",
      "Satıcı Sayısı: 1,9 MİLYON",
      "Popüler Pazaryerleri: YouTube, Facebook",
    ],
    city: 0 ,
    items2: [
      {"ŞİRKET KURULUMU": "200-250 dolar"},
      {"Amazon aylık kira bedeli"	: "40 DOLAR"},
      {"GS1 Uluslararası barkod":	"1750-5000 tl"},
      {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
      {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
      {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
    ],
    buttonText: "Uzman Ekibimiz ile Hemen Amazon'da",
    marketLink: "https://drive.google.com/file/d/1R7fn5dOonJ_Xlwf9bm2pmmEM_t6wYvmx/view?usp=sharing"
  },
  {
      name: "Etsy",
      logo: 'etsy.png',
      items: [
        'Aylık Trafik: 454.2M',
        'Satıcı Sayısı: 7,5M',
        "Yıllık Ciro: 2,6 milyar ABD doları ",
        "Komisyon oranı: %6,5+3 tl Etsy paymet %6,5 satış komisyonu %1.1 Ülke kesintisi ",
        "Popüler Pazaryerleri: Pinterest, YouTube"

      ],
      
      city: 0 ,
      items2: [
        {"Şirket Kurulumu": " Zorunlu değildir isteğe bağlı maliyet:150-250 dolar"},
        {"Lojistik":	"15-25 dolar ( tekli gönderime uygun elde taşınabilen ürün grupları 10-15 desi). Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 350-400 dolar"},
        {"Günlük reklam maliyeti	Minimum": "15-45 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Etsy'de",
      marketLink: "https://drive.google.com/file/d/10iMVmWYO_N8J7peoViC-ImhtedmBtL7O/view?usp=drive_link"
    },
    {   
      name: "Emag",
      logo: 'emag.png',
      items: [
        'Aylık Trafik: 32.6M',
        'EMAG BULGARİSTAN 5.5M, EMAG MACARİSTAN 7.8 MİLYON TRAFİK ALIR',
        "Satıcı Sayısı: 30-32 BİN",
        "yıllık CİRO: 8.5 milyar dolarlık",
        "Popüler Pazaryerleri: Youtube, Facebook"
      ],
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"GS1 Uluslararası barkod":	"1750-5000 tl"},
        {"Lojistik":	"karayolu kargo; 50X60X60 standarlarında 10 koli 400-500 euro"},
        {"Günlük reklam maliyeti	Minimum": "35-50 LEİ "},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 LEİ ürün fiyatı aralığı için 500-750 LEİ"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Emag'de",
      marketLink: ""
    },
    {   
      name: "Allegro",
      logo: 'allegro.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "750 Euro"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"GS1 Uluslararası barkod":	" Şirket cirosuna göre:1750-5000 TL "},
        {"Lojistik":	"karayolu kargo; 50X60X60 standarlarında 10 koli 400-500 Euro"},
        {"Günlük reklam maliyeti	Minimum": "35-50 ZLOTİ"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 ZLOTİ ürün fiyatı aralığı için 500-750 ZLOTİ"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://drive.google.com/file/d/1KX-S83D7XOaFncb0iZ3uDEdyMSc2hZl2/view?usp=drive_link"
    },
    {
      name: "Wayfair",
      logo: 'wayfair.png',
      items: [
        'Aylık Trafik: 6.1M (İngiltere), 13M (Birleşik Devletler)',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 14 milyar dolar",
        "Ortalama 97.7 Milyon aylık trafiğe sahiptir.",
        "Popüler Pazaryerleri: Facebook, Pinterest"
      ],
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "1 Yıllık şirket kurulumu dahil kapsamlı paket piyasa fiyat ortalaması: 1000-1100 dolar"},
        {"Yalnız şirket kurulumu"	: "200-250 dolar"},
        {"GS1 Uluslararası barkod":	"Şirket cirosuna göre:1750-5000 TL "},
        {"Lojistik":	"Deniz yolu, hava yolu teklif almak için hizmetler sayfasına geçiş yapınız. (mobilya ürün grubunda stok miktarına göre maliyetleri oldukça değişkendir.)"},
        {"Günlük reklam maliyeti	Minimum": "25-50 Dolar"},
        {"Ara depo": "teklif almak için hizmetler sayfasına geçiş yapınız. (mobilya ürün grubunda stok miktarına göre maliyetleri oldukça değişkendir.)"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Wayfair'de",
      marketLink: "https://drive.google.com/file/d/1iGG382U2wtaU-SCC1-0Nn4Sw-CB_H3RE/view?usp=drive_link"
    },
    {
      name: "Zalando",
      logo: 'zalando.png',
      items: [
        'Aylık Trafik: 24 ülkede 1.7 Milyar',
        '50 MİLYON AKTİF MÜŞTERİ',
        "360 MİLYAR DOLAR ORTALAMA GELİR",
        "Popüler Pazaryerleri: YouTube"

      ],
      
      city: 0 ,
      items2: [
        {"Bulunamadı": "200-250 dolar"}
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Zalando'da",
      marketLink: ""
    },
    {
      name: "Bol.com",
      logo: 'bolcom.png',
      items: [
        'Aylık Trafik: 65M',
        'Satıcı Sayısı: 50.000',
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      
      city: 0 ,
      items2: [
        {"Bulunamadı": ""} ],
      buttonText: "Uzman Ekibimiz ile Hemen Bol.com'da",
      marketLink: ""
    },
    {
      name: "Ozon",
      logo: 'ozon.png',
      items: [
        'Aylık Trafik: 384.2M',
        'Satıcı Sayısı: 250.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Ozon'da %57 Markalı %43 Markasız ürün vardır. Pazaryerinde 20 farklı kategoride 130 milyon SKU üzerinde ürün bulunmaktadır.",
        "Popüler Pazaryerleri: YouTube, VK"

      ],
      
      city: 0 ,
      items2: [
        {"GS1 Uluslararası barkod": "Şirket cirosuna göre:1750-5000 TL "},
        {"Lojistik":	"Uçak kargo; 8-15 Dolar ( tekli gönderime uygun elde taşınabilen ürün grupları 10-15 desi)"},
        {"Günlük reklam maliyeti	Minimum": "5-7 dolar "}
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Ozon'da",
      marketLink: "https://drive.google.com/file/d/1xRuH9ejSnvk6KpT_F2cIrtiC0cXlEtmx/view?usp=drive_link"
    },
    {
      name: "Fruugo",
      logo: 'fruugo.png',
      items: [
        'Aylık Trafik: 2M (Birleşik Krallık), 1.6M (Romanya), 1.7(İsviçre), 1.5(Polonya)',
        '2021 yılında toplamda 240 milyon ziyaretçi ağırlamıştır.',
        "pazaryeri üzerinde satışta bulunan 42 milyon SKU ürün bulunmaktadır.",
        "2021 yılında 340 milyon pound değerinde 7.9 milyon adet ürün satışı gerçekleşmiştir.",
        "Popüler Pazaryerleri: YouTube, Instagram"
      ],
      city: 0 ,
      items2: [
        {"GS1 Uluslararası barkod": "Şirket cirosuna göre:1750-5000 TL "},
        {"Lojistik":	"Uçak kargo; 15-25 Euro ( tekli gönderime uygun elde taşınabilen ürün grupları 10-15 desi)"},
        {"Günlük reklam maliyeti	Minimum": "15-25 Dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 Dolar ürün fiyatı aralığı için 250-300 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Fruugo'da",
      marketLink: "https://drive.google.com/file/d/1EawMEif_htoo4Upi4nlsaePpCDHwJxWF/view?usp=drive_link"
    }


];

