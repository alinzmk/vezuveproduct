import "../App.css";
import { useState, useEffect } from "react";
import logo from "../Assets/logo-renkli.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import amazon from "../Assets/amazon.png";
import allegro from "../Assets/allegro.png";
import walmart from "../Assets/walmart.png";
import wayfair from "../Assets/wayfair.png";
import etsy from "../Assets/etsy.png";
import emag from "../Assets/emag.png";
import ozon from "../Assets/ozon.png";
import mercado from "../Assets/mercado.png";
import jumia from "../Assets/jumia.png";
import ebay from "../Assets/ebay.png";
import cdiscount from "../Assets/cdiscount.png";
import onbuy from "../Assets/onbuy.png";
import fruugo from "../Assets/fruugo.png";
import trendyol from "../Assets/trendyol.png";
import Service1 from "../Modals/Plan";
import UserPage from "../Modals/UserPage";
import { successNotification } from "../Modals/Notification";
import { sendPartnerMail } from "../ApiService";
import fetchAllRedux from "../redux/fetchAllRedux";

function Services() {
  const accessToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/");
  }
  //------------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [activeTab, setActiveTab] = useState("amazon"); // Initialize with the default active tab
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  const { servicepkgs } = useSelector((state) => state.servicepkgs);
  const { partner } = useSelector((state) => state.partner);

  //------------------------------------------------------------------------------
  if (servicepkgs.length === 0) {
    dispatch(fetchAllRedux());
  }

  //------------------------------------------------------------------------------
  const forwardToLink = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const openModal = (item, list) => {
    setIsModalOpen(true);
    setSelectedItem(item);
    setSelectedList(list);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

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
    window.addEventListener("resize", checkWidth);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const handleSendPartnerMail = async (serviceID) => {
    try {
      const result = await sendPartnerMail(accessToken, serviceID);
      if (result.status === 200) {
        console.log("");
        successNotification("İsteğiniz Başarıyla Gönderildi");
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  };

  const filterPackagesByFirstWord = (packages, keyword) => {
    return packages.filter((pkg) => {
      return pkg.code.toLowerCase().startsWith(keyword.toLowerCase());
    });
  };

  const tostr = (x) => {
    return toString(x);
  };

  const content = (status)=>{

    switch (status) {
      case 'TAMZNABN':
        return(
          <>
            <p className="mb-2">Mağazası Olan Satıcılar</p>
              <ul className="packageList">
                <li>Amazon Reklam yönetimi</li>
                <li>Amazon İnfografik Görsel</li>
                <li>Liste Düzenleme (10 Liste)</li>
                <li>Amazon Stok Gönderimi</li>
                <li>1 Pazaryeri</li>
                <li>Amazon Marka Kaydı</li>
                <li>Amazon Vine Programı (Yorum Desteği)</li>
                <li>Zenginleştirilmiş Ürün Açıklaması (A+ Tasarım)</li>
                <li>Amazon Panel Eğitimleri</li>
                <li className="bold">Süre: 1 Ay</li>
              </ul>
          </>
        );

      case 'TAMZNBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Mağaza açılışı </li>
              <li>Ürün Listeleme  (20 Ürün)</li>
              <li>Amazon İnfografik Görsel</li>
              <li>1 Pazaryeri</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );

      case 'TAMZNGLB':
        return(
          <>
            <p className="mb-2">Business paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Ürün Listeleme  (30 Ürün)</li>
              <li>2 Pazaryeri</li>
              <li>Mağaza Tasarımı</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TETSYABN':
        return(
          <>
            <p className="mb-2">Mağazası Olan Satıcılar</p>
            <ul className="packageList">
              <li>Ürün Listeleme (20 Ürün)</li>
              <li>Etsy Reklam Yönetimi</li>
              <li>İnfografik Görsel</li>
              <li>Yabancı Dilde Listeleme (1 Dil)</li>
              <li>Giveaway Hizmeti (Yorum Desteği)</li>
              <li>Pinterest Hesap Yönetimi</li>
              <li>Kargo Gönderim Desteği</li>
              <li>Etsy Eğitim Videoları</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TETSYENT':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Mağaza açılışı </li>
              <li>Logo ve Banner Tasarımı</li>
              <li>Yabancı Dilde Listeleme (2 Dil)</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TETSYSTRSLR':
        return(
          <>
            <p className="mb-2">Enterprise paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Ürün Listeleme (30 Ürün)</li>
              <li>Yabancı Dilde Listeleme (4 Dil)</li>
              <li>Pinterest Reklam Yönetimi</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        
      case 'TOZONBSN':
        return(
          <>
            <ul className="packageList">
              <li>Ozon Mağaza Açılışı</li>
              <li>Ozon Reklam Yönetimi</li>
              <li>Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Kargolama Desteği</li>
              <li>Ödeme Altyapısı</li>
              <li>Ozon Panel Eğitimi </li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        case 'TOZONGLB':
          return(
          <>
            <p className="mb-2">Business paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Ürün Listeleme (25 Ürün)</li>
              <li>Rich Content (Zenginleştirilmiş Ürün Açıklaması)</li>
              <li>Ozon Kampanya Yönetimi</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TALGABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Allegro Mağaza açılışı</li>
              <li>Polonya VAT kaydı Desteği</li>
              <li>Lehçe Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Ara Depo Gönderimi</li>
              <li>Lehçe İletişim Desteği </li>
              <li>Giveaway (Yorum Desteği)</li>
              <li>Allegro ADS</li>
              <li>Kampanya Yönetimi</li>
              <li>Ödeme Altyapısı</li>
              <li>Allegro Panel Eğitimleri</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        case 'TALGBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Lehçe Ürün Listeleme (35 Ürün)</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'TEGABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>EMAG Mağaza açılışı</li>
              <li>Romanya VAT Kaydı Destek</li>
              <li>Romence Ürün Listeleme (10 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Emag Deposuna Stok Gönderme</li>
              <li>Giveaway (Yorum Desteği)</li>
              <li>Emag ADS</li>
              <li>Kampanya Yönetimi</li>
              <li>Ödeme Altyapısı</li>
              <li>Sipariş ve İade Yönetimi</li>
              <li>Emag Panel Eğitimleri</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        case 'TEGBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
        
      case 'TWFABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Wayfair Mağaza açılışı</li>
              <li>Yurtdışı Şirlet Kurulum Desteği</li>
              <li>Ürün Sorumluluk Sigortası</li>
              <li>WayMore Mağaza Tasarımı</li>
              <li>İnfografik Görsel (10 Görsel)</li>
              <li>Ürün Listeleme (30 Ürün)</li>
              <li>Wayfair Reklam Yönetimi</li>
              <li>Lojistik Entegrasyonu </li>
              <li>Ara Depo Entegrasyonu </li>
              <li>Ödeme Altyapısı</li>
              <li>Wayfair Panel Eğitimleri</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        
      case 'TWFBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li className="bold">Süre: 3 Ay</li>
            </ul>
          </>
        );
      case 'TFRGABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Fruugo Mağaza açılışı</li>
              <li>Reklam Yönetimi</li>
              <li>İnfografik Görsel (5 Görsel)</li>
              <li>Ürün Listeleme (15 Ürün)</li>
              <li>İngilizce İletişim Desteği</li>
              <li>GiveAway</li>
              <li>Ödeme Altyapısı</li>
              <li>Fruugo Panel Eğitimi </li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      
      case 'TFRGBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Ürün Listeleme (25 Ürün)</li>
              <li>EAN Barkod Desteği</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'THNMDAMZN':
        return(
          <>
            
          </>
        );
        
      case 'THNMDAMZNABN':
        return(
          <>
            
          </>
        );
      case 'TWLMTABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Walmart Mağaza açılışı</li>
              <li>SEO Ürün Listeleme (20 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Walmart Reklam Yönetimi</li>
              <li>WFS / Ara Depo Gönderimi</li>
              <li>GiveAway</li>
              <li>Walmart Kampanya Yönetimi</li>
              <li>Marka Kaydı</li>
              <li>Walmart Panel Eğitimleri</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        case 'TWLMTBSN':
          return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>ABD Şirket Kuruluş Desteği</li>
              <li>SEO Ürün Listeleme (40 Ürün)</li>
              <li className="bold">Süre: 3 Ay</li>
            </ul>
          </>
        );
        case 'TTRDYABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Ürün Seçimi</li>
              <li>Mağaza Açılışı</li>
              <li>Ürün Listeleme (20 Ürün)</li>
              <li>İnfografik Görsel </li>
              <li>Mağaza Tasarımı</li>
              <li>Reklam Yönetimi</li>
              <li>Kampanya Yönetimi</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TTRDYKB':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Ürün Listeleme (35 Ürün)</li>
              <li>GiveAway</li>
              <li>Satış Raporlama</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'TESK':
        return(
          <>
            <p className="mb-2">Mağazası Olan Satıcılar</p>
            <ul className="packageList">
              <li>E-İhracat Altyapısı (İkas)</li>
              <li>Site Kurulumu</li>
              <li>Ürün Listeleme (30 Ürün)</li>
              <li>Trendyol Entegrasyonu</li>
              <li>Mağaza Tasarımı</li>
              <li>3 yabancı dil desteği</li>
              <li>Google Ads Reklam Yönetimi</li>
              <li>Meta Reklam Yönetimi</li>
              <li>Ödeme Altyapısı</li>
              <li>Vezuport Uygulaması</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'TMRCLABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Mercado Libre Mağaza açılışı</li>
              <li>Optimize Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Ara Depo Desteği</li>
              <li>İletişim Desteği </li>
              <li>Reklam Yönetimi</li>
              <li>Kampanya Yönetimi</li>
              <li>Ürün Gönderimi</li>
              <li>Ödeme Altyapısı </li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TMRCLBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Optimize Ürün Listeleme (30 Ürün)</li>
              <li>İnfografik Görsel (10 Görsel)</li>
              <li className="bold">Süre: 3 Ay</li>
            </ul>
          </>
        );
      case 'TONBYABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>OnBuy Mağaza açılışı</li>
              <li>Optimize Ürün Listeleme (10 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>Ara Depo Gönderimleri</li>
              <li>İngilizce İletişim Desteği</li>
              <li>OnBuy Ads</li>
              <li>OnBuy Boost</li>
              <li>Ödeme Altyapısı</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TONBYBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Yurtdışı Şirket Kuruluş Desteği</li>
              <li>Optimize Ürün Listeleme (25 Ürün)</li>
              <li>Ean Barkod Desteği</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'TCDSCABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>CDiscount Mağaza açılışı</li>
              <li>Optimize Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel</li>
              <li>FullFilment Gönderimleri</li>
              <li>Cdiscount ADS</li>
              <li>Sipariş ve İade Yönetimi</li>
              <li>İnternational Marketplace Network</li>
              <li>İndirim ve Kuponlar</li>
              <li>Ödeme Altyapısı</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
        case 'TCDSCBSN':
          return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Optimize Ürün Listeleme (25 Ürün)</li>
              <li>Yurtdışı şirket kuruluş desteği</li>
              <li>EAN Barkod Desteği</li>
              <li className="bold">Süre: 3 Ay</li>
            </ul>
          </>
        );
      case 'TJMABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>Jumia Mağaza açılışı</li>
              <li>Optimize Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel (5 Görsel)</li>
              <li>Ara Depo Gönderimleri</li>
              <li>Cdiscount ADS</li>
              <li>İletişim Desteği</li>
              <li>Giveaway </li>
              <li>Reklam Yönetimi </li>
              <li>Ödeme Altyapısı</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TJMBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Optimize Ürün Listeleme (30 Ürün)</li>
              <li>İnfografik Görsel (10 Görsel)</li>
              <li>Kampanya Yönetimi</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
      case 'TEBAYABN':
        return(
          <>
            <p className="mb-2"></p>
            <ul className="packageList">
              <li>EBAY Mağaza açılışı</li>
              <li>Optimize Ürün Listeleme (15 Ürün)</li>
              <li>İnfografik Görsel (5 Görsel)</li>
              <li>Kargo Gönderim Desteği</li>
              <li>Sipariş ve İade Yönetimi</li>
              <li>Reklam Yönetimi </li>
              <li>Kampanya Yönetimi </li>
              <li>Ödeme Altyapısı</li>
              <li className="bold">Süre: 1 Ay</li>
            </ul>
          </>
        );
      case 'TEBAYBSN':
        return(
          <>
            <p className="mb-2">Abonelik paketindeki tüm özelliklere ek</p>
            <ul className="packageList">
              <li>Pazar Araştırması</li>
              <li>Optimize Ürün Listeleme (20 Ürün)</li>
              <li className="bold">Süre: 2 Ay</li>
            </ul>
          </>
        );
        default:
          return(
            <>

          </>
        );
    }
  }




  return (
    <>
      <Service1
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        selectedList={selectedList}
      />
      <UserPage pageName={"Hizmetler"}>
        <section className="hizmetler">
          <div className="col-12 slideleft">
            <div className="row justify-content-center justify-content-lg-start">
              <div className="col-11 pbg pt-3">
                <nav>
                  <div class="nav nav-tabs" id="service-tab" role="tablist">
                    <button class="nav-link active services-active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                      Destekler
                    </button>
                    <button class="nav-link  services-active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                      Hizmetler
                    </button>
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
                                    <div
                                      className={`tab-pane fade ${
                                        activeTab === "amazon"
                                          ? "show active"
                                          : ""
                                      }`}
                                      id="amazon"
                                      role="tabpanel"
                                      aria-labelledby="amazon-tab"
                                    >
                                      <div className="row mt-4">
                                        {filterPackagesByFirstWord(
                                          servicepkgs,
                                          "TAMZN"
                                        ).map((pkg, index) => (
                                          <>
                                            <div className="col-xl-3 col-lg-6 col-12 mb-4">
                                              <div
                                                onClick={() => openModal(pkg, content(pkg.code))}
                                                className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 amazon"
                                              >
                                                <p className="hizmet-isim">
                                                  {pkg.name}
                                                </p>
                                                <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                  {pkg.old_price} {pkg.currency}
                                                </p>
                                                <p className="hizmet-ücret">
                                                  {pkg.price}
                                                  {pkg.currency}
                                                </p>
                                                <img
                                                  className="hizmet-img"
                                                  src={amazon}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ))}
                                      </div>
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
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TET"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 allegro"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={etsy}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
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
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TALG"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 allegro"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={allegro}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
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
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TTRDY"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 amazon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={trendyol}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>{" "}
                                </div>
                              
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
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TWLMT"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 walmart"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={walmart}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
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
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TWF"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 wayfair"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={wayfair}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
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
                                        {filterPackagesByFirstWord(
                                          servicepkgs,
                                          "TEG"
                                        ).map((pkg, index) => (
                                          <>
                                            <div className="col-12 col-lg-3 mb-4">
                                              <div
                                                onClick={() => openModal(pkg, content(pkg.code))}
                                                className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 walmart"
                                              >
                                                <p className="hizmet-isim">
                                                  {pkg.name}
                                                </p>
                                                <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                  {pkg.old_price} {pkg.currency}
                                                </p>
                                                <p className="hizmet-ücret">
                                                  {pkg.price} {pkg.currency}
                                                </p>
                                                <img
                                                  className="hizmet-img"
                                                  src={emag}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ))}
                                      </div>
                                    </div>
                                  </div>{" "}
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingNine">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                    Ozon
                                  </button>
                                </h2>
                                <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TOZON"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={ozon}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTen">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                    Fruugo
                                  </button>
                                </h2>
                                <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TFRG"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={fruugo}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwelve">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                    Mercado Libre
                                  </button>
                                </h2>
                                <div id="collapseTwelve" class="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TMRCL"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={mercado}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThirteen">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                    OnBuy
                                  </button>
                                </h2>
                                <div id="collapseThirteen" class="accordion-collapse collapse" aria-labelledby="headingThirteen" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TONBY"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={onbuy}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>
                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFourteen">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
                                    CDiscount
                                  </button>
                                </h2>
                                <div id="collapseFourteen" class="accordion-collapse collapse" aria-labelledby="headingFourteen" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TCDSC"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={cdiscount}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFifteen">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
                                    Jumia
                                  </button>
                                </h2>
                                <div id="collapseFifteen" class="accordion-collapse collapse" aria-labelledby="headingFifteen" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TJM"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={jumia}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingSixteen">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
                                    Ebay
                                  </button>
                                </h2>
                                <div id="collapseSixteen" class="accordion-collapse collapse" aria-labelledby="headingSixteen" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TEBAY"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret-indirim mb-0" style={{textDecoration:"line-through"}}>
                                                {pkg.old_price} {pkg.currency}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={ebay}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>

                              <div class="accordion-item">
                                <h2 class="accordion-header" id="headingEleven">
                                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                    Web Altyapı
                                  </button>
                                </h2>
                                <div id="collapseEleven" class="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row mt-4">
                                      {filterPackagesByFirstWord(
                                        servicepkgs,
                                        "TESK"
                                      ).map((pkg, index) => (
                                        <>
                                          <div className="col-12 col-lg-3 mb-4">
                                            <div
                                              onClick={() => openModal(pkg, content(pkg.code))}
                                              className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                            >
                                              <p className="hizmet-isim">
                                                {pkg.name}
                                              </p>
                                              <p className="hizmet-ücret">
                                                {pkg.price} {pkg.currency}
                                              </p>
                                              <img
                                                className="hizmet-img"
                                                src={logo}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <nav>
                              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className={`nav-link ${   activeTab === "amazon" ? "active" : "" }`} id="amazon-tab" data-bs-toggle="tab" data-bs-target="#amazon" type="button" role="tab" aria-controls="amazon" aria-selected={   activeTab === "amazon" ? "true" : "false" }>
                                  Amazon
                                </button>
                                <button className={`nav-link ${   activeTab === "etsy" ? "active" : "" }`} id="etsy-tab" data-bs-toggle="tab" data-bs-target="#etsy" type="button" role="tab" aria-controls="etsy" aria-selected="true">
                                  Etsy
                                </button>
                                <button className={`nav-link ${   activeTab === "allegro" ? "active" : "" }`} id="allegro-tab" data-bs-toggle="tab" data-bs-target="#allegro" type="button" role="tab" aria-controls="allegro" aria-selected="false">
                                  Allegro
                                </button>
                                <button className={`nav-link ${   activeTab === "trendyol" ? "active" : "" }`} id="trendyol-tab" data-bs-toggle="tab" data-bs-target="#trendyol" type="button" role="tab" aria-controls="trendyol" aria-selected="false">
                                  Trendyol
                                </button>
                                <button className={`nav-link ${   activeTab === "walmart" ? "active" : "" }`} id="walmart-tab" data-bs-toggle="tab" data-bs-target="#walmart" type="button" role="tab" aria-controls="walmart" aria-selected="false">
                                  Walmart
                                </button>
                                <button className={`nav-link ${   activeTab === "wayfair" ? "active" : "" }`} id="wayfair-tab" data-bs-toggle="tab" data-bs-target="#wayfair" type="button" role="tab" aria-controls="wayfair" aria-selected="false">
                                  Wayfair
                                </button>
                                <button className={`nav-link ${   activeTab === "emag" ? "active" : "" }`} id="emag-tab" data-bs-toggle="tab" data-bs-target="#emag" type="button" role="tab" aria-controls="emag" aria-selected="false">
                                  Emag
                                </button>
                                <button className={`nav-link ${   activeTab === "ozon" ? "active" : "" }`} id="ozon-tab" data-bs-toggle="tab" data-bs-target="#ozon" type="button" role="tab" aria-controls="ozon" aria-selected="false">
                                  Ozon
                                </button>
                                <button className={`nav-link ${   activeTab === "fruugo" ? "active" : "" }`} id="fruugo-tab" data-bs-toggle="tab" data-bs-target="#fruugo" type="button" role="tab" aria-controls="fruugo" aria-selected="false">
                                  Fruugo
                                </button>
                                <button className={`nav-link ${   activeTab === "mercado" ? "active" : "" }`} id="mercado-tab" data-bs-toggle="tab" data-bs-target="#mercado" type="button" role="tab" aria-controls="mercado" aria-selected="false">
                                  Mercado Libre
                                </button>
                                <button className={`nav-link ${   activeTab === "onbuy" ? "active" : "" }`} id="onbuy-tab" data-bs-toggle="tab" data-bs-target="#onbuy" type="button" role="tab" aria-controls="onbuy" aria-selected="false">
                                  Onbuy
                                </button>
                                <button className={`nav-link ${   activeTab === "cdiscount" ? "active" : "" }`} id="cdiscount-tab" data-bs-toggle="tab" data-bs-target="#cdiscount" type="button" role="tab" aria-controls="cdiscount" aria-selected="false">
                                  CDiscount 
                                </button>
                                <button className={`nav-link ${   activeTab === "jumia" ? "active" : "" }`} id="jumia-tab" data-bs-toggle="tab" data-bs-target="#jumia" type="button" role="tab" aria-controls="jumia" aria-selected="false">
                                  Jumia 
                                </button>
                                <button className={`nav-link ${   activeTab === "ebay" ? "active" : "" }`} id="ebay-tab" data-bs-toggle="tab" data-bs-target="#ebay" type="button" role="tab" aria-controls="ebay" aria-selected="false">
                                  Ebay 
                                </button>
                                <button className={`nav-link ${   activeTab === "vezuve" ? "active" : "" }`} id="vezuve-tab" data-bs-toggle="tab" data-bs-target="#vezuve" type="button" role="tab" aria-controls="vezuve" aria-selected="false">
                                  Web Altyapı
                                </button>
                              </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                              <div className={`tab-pane fade ${   activeTab === "amazon" ? "show active" : "" }`} id="amazon" role="tabpanel" aria-labelledby="amazon-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TAMZN"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-xl-3 col-lg-6 col-12 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 amazon "
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={amazon}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                            <div className="mt-auto">
                                              <div className="text-center d-flex justify-content-center mt-auto">
                                                <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                              </div>
                                              <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                                12 Taksitle Ödeme İmkanı
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                    </>
                                    
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "etsy" ? "show active" : "" }`} id="etsy" role="tabpanel" aria-labelledby="etsy-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TET"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 allegro"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name} 
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={etsy}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "allegro" ? "show active" : "" }`} id="allegro" role="tabpanel" aria-labelledby="allegro-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TALG"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 allegro"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={allegro}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "trendyol" ? "show active" : "" }`} id="trendyol" role="tabpanel" aria-labelledby="trendyol-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TTRDY"
                                  ).reverse().map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 amazon"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={trendyol}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "walmart" ? "show active" : "" }`} id="walmart" role="tabpanel" aria-labelledby="walmart-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TWLMT"
                                  ).reverse().map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 walmart"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={walmart}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "wayfair" ? "show active" : "" }`} id="wayfair" role="tabpanel" aria-labelledby="wayfair-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TWF"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 wayfair"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={wayfair}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "emag" ? "show active" : "" }`} id="emag" role="tabpanel" aria-labelledby="emag-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TEG"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 walmart"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={emag}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "ozon" ? "show active" : "" }`} id="ozon" role="tabpanel" aria-labelledby="ozon-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TOZON"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={ozon}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "fruugo" ? "show active" : "" }`} id="fruugo" role="tabpanel" aria-labelledby="fruugo-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TFRG"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={fruugo}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "mercado" ? "show active" : "" }`} id="mercado" role="tabpanel" aria-labelledby="mercado-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TMRCL"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 mercado"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={mercado}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "onbuy" ? "show active" : "" }`} id="onbuy" role="tabpanel" aria-labelledby="onbuy-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TONBY"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 ozon"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={onbuy}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "cdiscount" ? "show active" : "" }`} id="cdiscount" role="tabpanel" aria-labelledby="cdiscount-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TCDSC"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 cdiscount"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={cdiscount}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "jumia" ? "show active" : "" }`} id="jumia" role="tabpanel" aria-labelledby="jumia-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TJM"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 allegro"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={jumia}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                               <div className={`tab-pane fade ${   activeTab === "ebay" ? "show active" : "" }`} id="ebay" role="tabpanel" aria-labelledby="ebay-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TEBAY"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 mercado"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={ebay}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className={`tab-pane fade ${   activeTab === "vezuve" ? "show active" : "" }`} id="vezuve" role="tabpanel" aria-labelledby="vezuve-tab">
                                <div className="row mt-4">
                                  {filterPackagesByFirstWord(
                                    servicepkgs,
                                    "TESK"
                                  ).map((pkg, index) => (
                                    <>
                                      <div
                                        className="col-12 col-lg-3 mb-4"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => forwardToLink(pkg.link)}
                                          className="hizmet d-flex flex-column h-100 d-flex flex-column h-100 wayfair"
                                        >
                                          <p className="hizmet-isim">
                                            {pkg.name}
                                          </p>
                                          <p className="hizmet-ücret-indirim">
                                            {pkg.old_price} {pkg.currency}
                                          </p>
                                          <p className="hizmet-ücret">
                                            {pkg.price} {pkg.currency}
                                          </p>
                                          <img
                                            className="hizmet-img"
                                            src={logo}
                                            alt=""
                                          />
                                          {content(pkg.code)}
                                          <div className="mt-auto">
                                            <div className="text-center d-flex justify-content-center">
                                              <button className='satin-al mt-4 d-flex' type="">Satın Al</button>
                                            </div>
                                            <div className="text-center d-flex justify-content-center taksit12 mt-2">
                                              12 Taksitle Ödeme İmkanı
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="hizmet-wrap-vezu">
                      <p>Hizmet Açıklamalarını Okumak İçin Hizmetin Üstüne Tıklayınız.</p>
                      <div className="row mt-3">
                        {partner &&
                          partner.data &&
                          partner.data.partners &&
                          partner.data.partners.map((ppartner, index) => (
                            <div className="col-12 col-lg-4 mb-4" key={index}>
                              <div className="">
                                <div
                                  className="accordion accordion-flush hizmet d-flex flex-column h-100 vezu"
                                  id={`accordionPanelsStayOpenExample-${index}`}
                                >
                                  <div class="accordion-item">
                                    <h2
                                      className="accordion-header"
                                      id={`panelsStayOpen-heading-${index}`}
                                    >
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${index}`}>
                                        <p className="hizmet-isim">
                                          {ppartner.category}
                                        </p>
                                      </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading-${index}`}>
                                      <div class="accordion-body pt-0">
                                        <p className="hizmet-tür">
                                          {ppartner.detail}
                                        </p>
                                      </div>
                                    </div>
                                    {ppartner.partner_id !== undefined ? (
                                      partner.data.user.includes(
                                        ppartner.partner_id.toString()
                                      ) ? (
                                        // If ppartner.partner_id exists in partner.data.user
                                        <>
                                          <button className="hizmet-buton2">
                                            Talebiniz Alındı
                                          </button>
                                        </>
                                      ) : (
                                        // If ppartner.partner_id doesn't exist in partner.data.user
                                        <>
                                          <button
                                            className="hizmet-buton"
                                            onClick={() =>
                                              handleSendPartnerMail(
                                                ppartner.partner_id
                                              )
                                            }
                                          >
                                            Teklif Alın
                                          </button>
                                        </>
                                      )
                                    ) : (
                                      // Handle the case where ppartner.partner_id is undefined
                                      // You can render some fallback UI or handle it as per your requirement
                                      <div>Partner ID is undefined</div>
                                    )}
                                    <img
                                      className="hizmet-img"
                                      src={logo}
                                      alt=""
                                    />
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
