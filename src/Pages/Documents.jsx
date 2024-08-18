import "../App.css";
import logo from "../Assets/logo-renkli.png";
import Sidebar2 from "../Modals/Sidebar2";
import {
  uploadDocument,
  downloadDocument,
  setMarketRequirements,
} from "../ApiService";
import { getDocData } from "../redux/features/docdata/docSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import fetchAllRedux from "../redux/fetchAllRedux";
import { useNavigate } from "react-router-dom";
import UserPage from "../Modals/UserPage";
import { successNotification, warningNotification } from "../Modals/Notification";

function Documents() {
  const accessToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/");
  }
  //------------------------------------------------------------------------------
  const { doc } = useSelector((state) => state.doc);
  
  const {plan} = useSelector((state) => state.plan);
  const { marketreq } = useSelector((state) => state.marketreq);
  const dispatch = useDispatch();
  //------------------------------------------------------------------------------
  if (doc.length === 0) {
    dispatch(fetchAllRedux());
  }
  //------------------------------------------------------------------------------
  // UPLOAD DOCUMENT
  const handleUploadDocument = async (fileName, selectedFile) => {
    try {
      const result = await uploadDocument(accessToken, fileName, selectedFile);
      if (result.status === 200) {
        successNotification("Dosyanız Başarıyla Yüklendi");
        dispatch(getDocData());
      } else {
        console.error("Failed to upload document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  // DOWNLOAD DOCUMENT
  const handleDownloadDocument = async (fileName) => {
    try {
      const result = await downloadDocument(accessToken, fileName);

      if (result.status === 200) {
        console.log("Document download successful!");
      } else {
        console.error("Failed to download document.");
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleFileUpload = (event, additionalString) => {
    const file = event.target.files[0];
    console.log(additionalString, file);
    handleUploadDocument(additionalString, file);
  };

  const renderFormData = () => {
    // Initialize an empty array to store isFilled values
    const isFilledArray = [];
    // Initialize an empty array to store JSX elements for checkboxes
    const checkboxes = [];

    // Iterate through the keys of marketreq
    Object.keys(marketreq).forEach((key) => {
      // Push the isFilled value for each key into the array
      isFilledArray.push(marketreq[key].isFilled);

      // Create JSX for the checkbox and push it to the checkboxes array
      checkboxes.push(
        <div className="" key={key}>
          <div className="row">
            <div className="col-auto">
              <input
                style={{ cursor: "pointer" }}
                className="form-check-input me-3"
                type="checkbox"
                onClick={() =>
                  handleSetMarketRequirement(key, !marketreq[key].isFilled)
                }
                checked={marketreq[key].isFilled}
              />
            </div>
            <div className="col p-0">
              <label className="form-check-label">{marketreq[key].name}</label>
            </div>
          </div>
        </div>
      );
    });

    // Calculate the percentage of true values in the isFilledArray
    const trueCount = isFilledArray.filter((value) => value).length;
    const totalCount = isFilledArray.length;
    const percentage = parseInt((trueCount / totalCount) * 100);

    // Render the checkboxes and the progress bar
    return (
      <div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentage}%`, transition: "1s" }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <span>{`%${percentage} Tamamlandı`}</span>
        <div className="mt-4">
          {checkboxes} {/* Render the checkboxes */}
        </div>
      </div>
    );
  };

  const handleSetMarketRequirement = async (checkedReq, boolean) => {
    try {
      console.log(checkedReq);
      await setMarketRequirements(accessToken, checkedReq, boolean); // Example: set a requirement as added
      dispatch(fetchAllRedux());
    } catch (error) {
      console.error("Error setting market requirement:", error);
      // Handle error
    }
  };

  /*  activityDocument :  true bankInfo :  true bill :  true eu_company :  false eu_tax :  false gsone :  false identityDocument :  true taxPlate :  true trademark :  false usa_company :  false usa_tax :  false
   */

  return (
    <UserPage pageName={"Belgeler"}>
      <section className="belgeler">
      {plan.currentPlan === "" || plan.currentPlan === " " || plan.currentPlan === null  ? (<>

        <div className="slideleft pbg p-3">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="doc-tab"
                data-bs-toggle="tab"
                data-bs-target="#doc"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Belgeler
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="req-tab"
                data-bs-toggle="tab"
                data-bs-target="#req"
                type="button"
                role="tab"
                aria-controls="req"
                aria-selected="false"
              >
                Gereklilikler
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="doc"
              role="tabpanel"
              aria-labelledby="doc-tab"
            >
              <div className="col-12 col-lg-10 p-0">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Banka Hesap Özeti
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Türkiye bankaları için Banka hesap özetinizi Mobil
                              bankacılık üzerinden veya Banka şubenizden
                              alabilirsiniz. Wise, Paypal gibi hesaplar için
                              mobil bankacılık veya internet bankacılığı
                              kullanılabilir.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                          <form>
                            <label
                              htmlFor="bankInfo-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="bankInfo-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Kimlik Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              TC Kimlik kartınızın hem arka hem ön yüzünü tek
                              bir sayfada renkli şekilde PDF dosyası halinde
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label
                              htmlFor="identityDocument-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="identityDocument-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="identityDocument"
                            ></button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Faaliyet Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Türkiye Ticaret Odasına kayıtlı şirketinizin
                              Faaliyet belgesini PDF formatında yükleyiniz.
                              (faliyet belgesini kayıtlı olduğunuz ticaret
                              odasından hem internet üzerinden hem fiziki olarak
                              temin edebilirsiniz.)
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                          <form>
                            <label
                              for="activityDocument-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="activityDocument-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="activityDocument"
                            ></button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Avrupa Şirket Açılımı
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                          <form>
                            <label
                              for="eu_company-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="eu_company-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_company"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Avrupa Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label
                              for="eu_tax-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="eu_tax-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Amerika Şirket Açılımı
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label
                              for="usa_company-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="usa_company-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Amerika Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label
                              for="usa_tax-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="usa_tax-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="taxPlate-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="taxPlate-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="taxPlate"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          GS1 Kayıt Sertifikası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="gsone-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="gsone-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="gsone"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Marka Tescil Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="trademark-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="trademark-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="trademark"
                            ></button>
                          </form>
    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Fatura (Elektrik, Gaz, İnternet)
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketin en büyük hissedarına ait, doğrudan kendi
                              adına kayıtlı Elektirik, doğalgaz, cep telefonu,
                              internet faturasını PDF Formatında yükleyin.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="billInfo-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="billInfo-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="bill"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Sözleşme
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Sözleşme
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="agreement-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="agreement-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="agreement"
                            ></button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          İkametgah Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              İkametgah Belgesi
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">

                          <form>
                            <label for="residence-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="residence-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => warningNotification("Belge yüklemeden önce hizmetler sayfasından paket satın almanız gerekmektedir")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="residence"
                            ></button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="req"
              role="tabpanel"
              aria-labelledby="req-tab"
            >
              <div>
                <div className="p-3">{renderFormData()}</div>
              </div>
            </div>
          </div>
        </div>

      </>):(<>
      
        <div className="slideleft pbg p-3">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="doc-tab"
                data-bs-toggle="tab"
                data-bs-target="#doc"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Belgeler
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="req-tab"
                data-bs-toggle="tab"
                data-bs-target="#req"
                type="button"
                role="tab"
                aria-controls="req"
                aria-selected="false"
              >
                Gereklilikler
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="doc"
              role="tabpanel"
              aria-labelledby="doc-tab"
            >
              <div className="col-12 col-lg-10 p-0">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Banka Hesap Özeti
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Türkiye bankaları için Banka hesap özetinizi Mobil
                              bankacılık üzerinden veya Banka şubenizden
                              alabilirsiniz. Wise, Paypal gibi hesaplar için
                              mobil bankacılık veya internet bankacılığı
                              kullanılabilir.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.bankInfo === false ? (
                          <form>
                            <label
                              htmlFor="bankInfo-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="bankInfo-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "bankInfo")}
                            />
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("bankInfo")}
                            className="buton3 m-0"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Kimlik Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              TC Kimlik kartınızın hem arka hem ön yüzünü tek
                              bir sayfada renkli şekilde PDF dosyası halinde
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.identityDocument === false ? (
                          <form>
                            <label
                              htmlFor="identityDocument-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="identityDocument-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(e, "identityDocument")
                              }
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="identityDocument"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() =>
                              handleDownloadDocument("identityDocument")
                            }
                            className="buton3 m-0"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Faaliyet Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Türkiye Ticaret Odasına kayıtlı şirketinizin
                              Faaliyet belgesini PDF formatında yükleyiniz.
                              (faliyet belgesini kayıtlı olduğunuz ticaret
                              odasından hem internet üzerinden hem fiziki olarak
                              temin edebilirsiniz.)
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.activityDocument === false ? (
                          <form>
                            <label
                              for="activityDocument-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="activityDocument-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(e, "activityDocument")
                              }
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="activityDocument"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() =>
                              handleDownloadDocument("activityDocument")
                            }
                            className="buton3 m-0 slideup"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Avrupa Şirket Açılımı
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.eu_company === false ? (
                          <form>
                            <label
                              for="eu_company-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="eu_company-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(e, "eu_company")
                              }
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_company"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("eu_company")}
                            className="buton3 m-0 slideup"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Avrupa Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.eu_tax === false ? (
                          <form>
                            <label
                              for="eu_tax-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="eu_tax-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "eu_tax")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("eu_tax")}
                            className="buton3 m-0 slideup"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Amerika Şirket Açılımı
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.usa_company === false ? (
                          <form>
                            <label
                              for="usa_company-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="usa_company-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(e, "usa_company")
                              }
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() =>
                              handleDownloadDocument("usa_company")
                            }
                            className="buton3 m-0 slideup"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0 slideup">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 slideup d-flex align-items-center">
                          Amerika Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Yurtdışında kurduğunuz şirketinizin adı, kayıt
                              numarası, ortaklık yapısı gibi bilgilerini içeren
                              (kurulumu yapan firma tarafından size iletilen)
                              dosyayı PDF olarak yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.usa_tax === false ? (
                          <form>
                            <label
                              for="usa_tax-file-upload"
                              class="buton4 slideup"
                            >
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="usa_tax-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "usa_tax")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="eu_tax"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("usa_tax")}
                            className="buton3 m-0 slideup"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Vergi Levhası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.taxPlate === false ? (
                          <form>
                            <label for="taxPlate-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="taxPlate-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "taxPlate")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="taxPlate"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("taxPlate")}
                            className="buton3 m-0"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          GS1 Kayıt Sertifikası
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.gsone === false ? (
                          <form>
                            <label for="gsone-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="gsone-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "gsone")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="gsone"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("gsone")}
                            className="buton3 m-0"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Marka Tescil Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketirketinize ait vergi levhanızı PDF olarak
                              yükleyiniz.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.trademark === false ? (
                          <form>
                            <label for="trademark-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="trademark-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "trademark")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="trademark"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("trademark")}
                            className="buton3 m-0"
                          >
                            Yüklendi{" "}
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Fatura (Elektrik, Gaz, İnternet)
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Şirketin en büyük hissedarına ait, doğrudan kendi
                              adına kayıtlı Elektirik, doğalgaz, cep telefonu,
                              internet faturasını PDF Formatında yükleyin.
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.bill === false ? (
                          <form>
                            <label for="billInfo-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="billInfo-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "bill")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="bill"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("bill")}
                            className="buton3 m-0"
                          >
                            Yüklendi<i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          Sözleşme
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              Sözleşme
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.agreement === false ? (
                          <form>
                            <label for="agreement-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="agreement-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "agreement")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="agreement"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("agreement")}
                            className="buton3 m-0"
                          >
                            Yüklendi<i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10 p-0 slideup">
                <div className="col-12 w-auto pb-3">
                  <div className="pbg">
                    <div className="row justify-content-between p-3">
                      <div className="col-1 ms-0 ms-lg-5 my-auto">
                        <h2 className="my-auto mx-0">
                          <i class="fa-regular fa-file"></i>
                        </h2>
                      </div>
                      <div className="col-7 my-auto text-left">
                        <h5 className="m-0 d-flex align-items-center">
                          İkametgah Belgesi
                          <div class="dropdown2 ms-3">
                            <button
                              class="d-flex info-btn"
                              type="button"
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <div
                              class="dropdown-menu info"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              İkametgah Belgesi
                            </div>
                          </div>
                        </h5>
                      </div>
                      <div className="col-3 my-auto p-0 justify-content-center d-flex">
                        {doc.residence === false ? (
                          <form>
                            <label for="residence-file-upload" class="buton4">
                              Yükle <i class="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                            <input
                              id="residence-file-upload"
                              className="d-none"
                              type="file"
                              onChange={(e) => handleFileUpload(e, "residence")}
                            />
                            <button
                              type="submit"
                              style={{ display: "none" }}
                              class="residence"
                            ></button>
                          </form>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument("residence")}
                            className="buton3 m-0"
                          >
                            Yüklendi<i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="req"
              role="tabpanel"
              aria-labelledby="req-tab"
            >
              <div>
                <div className="p-3">{renderFormData()}</div>
              </div>
            </div>
          </div>
        </div>

      </>)}
      </section>
    </UserPage>
  );
}

export default Documents;
