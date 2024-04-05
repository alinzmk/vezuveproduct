import '../App.css';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { uploadDocument, downloadDocument } from '../ApiService';
import { getDocData } from '../redux/features/docdata/docSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import fetchAllRedux from '../redux/fetchAllRedux';
import { useNavigate } from 'react-router-dom';
import UserPage from '../Modals/UserPage';

function Documents() {

    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
       //------------------------------------------------------------------------------   
    const {doc} = useSelector((state) => state.doc);
    const dispatch = useDispatch();
   //------------------------------------------------------------------------------   
    if(doc.length === 0){
        dispatch(fetchAllRedux())
    }
   //------------------------------------------------------------------------------   
    // UPLOAD DOCUMENT
    const handleUploadDocument = async (fileName, selectedFile) => {
      try {
        const result = await uploadDocument(accessToken, fileName, selectedFile);
        if (result.status === 200) {    
            dispatch(getDocData());
        } else {
            console.error('Failed to upload document.');
        }
      } catch (error) {
            console.error('Error uploading document:', error);
      }
    };
    
    // DOWNLOAD DOCUMENT
    const handleDownloadDocument = async (fileName) => {
        try {
          const result = await downloadDocument(accessToken, fileName);
    
          if (result.status === 200) {
            console.log('Document download successful!');
          } else {
            console.error('Failed to download document.');
          }
        } catch (error) {
          console.error('Error downloading document:', error);
        }
      };


    const handleFileUpload = (event, additionalString) => {
        const file = event.target.files[0];
        console.log(additionalString ,file)
        handleUploadDocument(additionalString, file);
      };
    
  return (
    <UserPage pageName={"Belgeler"}>
        <section className='belgeler'>
            <div className="col-12 col-lg-10 p-0">
                <div className="col-12 w-auto pb-3">
                    <div className="pbg">
                        <div className="row justify-content-between p-3">
                            <div className="col-1 ms-0 ms-lg-5 my-auto">
                                <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                            </div>
                            <div className="col-7 my-auto text-left">
                                <h5 className='m-0 slideup d-flex align-items-center'>Banka Hesap Özeti 
                                    <div class="dropdown2 ms-3">
                                        <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-circle-info"></i>
                                        </button>
                                        <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                        Türkiye bankaları için Banka hesap özetinizi Mobil bankacılık üzerinden veya Banka şubenizden alabilirsiniz. Wise, Paypal gibi hesaplar
                                        için mobil bankacılık veya internet bankacılığı kullanılabilir.</div>
                                    </div>
                                </h5>
                            </div>
                            <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                {doc.bankInfo === false ? (
                                    <form>
                                        <label htmlFor="bankInfo-file-upload" class="buton4 slideup">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                        <input id="bankInfo-file-upload" className="d-none" type="file" onChange={(e) => handleFileUpload(e, "bankInfo")} />
                                    </form>
                                    ) : (
                                    <button onClick={()=>handleDownloadDocument("bankInfo")} className='buton3 m-0'>Yüklendi <i class="fa-solid fa-check-double"></i></button>
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
                            <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                        </div>
                        <div className="col-7 my-auto text-left">
                            <h5 className='m-0 slideup d-flex align-items-center'>Kimlik Belgesi
                            <div class="dropdown2 ms-3">
                                <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                    TC Kimlik kartınızın hem arka hem ön yüzünü tek bir sayfada renkli şekilde PDF dosyası halinde yükleyiniz.</div>
                            </div>
                            </h5>
                        </div>
                        <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                {doc.identityDocument === false ? (
                                    <form>
                                        <label htmlFor="identityDocument-file-upload" class="buton4 slideup">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                        <input  id="identityDocument-file-upload" className='d-none' type="file" onChange={(e) => handleFileUpload(e, "identityDocument")}  />
                                        <button type="submit" style={{ display: 'none' }} class="identityDocument"></button>
                                    </form>
                                    ) : (
                                        <button onClick={()=>handleDownloadDocument("identityDocument")} className='buton3 m-0'>Yüklendi <i class="fa-solid fa-check-double"></i></button>
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
                            <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                        </div>
                        <div className="col-7 my-auto text-left">
                            <h5 className='m-0 slideup d-flex align-items-center'>Faaliyet Belgesi
                            <div class="dropdown2 ms-3">
                                <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                    Türkiye Ticaret Odasına kayıtlı şirketinizin Faaliyet belgesini PDF formatında yükleyiniz. (faliyet belgesini kayıtlı olduğunuz ticaret odasından hem internet üzerinden hem fiziki olarak temin edebilirsiniz.)</div>
                            </div>
                            </h5>
                        </div>
                        <div className="col-3 my-auto p-0 justify-content-center d-flex">
                            {doc.activityDocument === false ? (
                                    <form>
                                        <label for="activityDocument-file-upload" class="buton4 slideup">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                        <input  id="activityDocument-file-upload" className='d-none' type="file" onChange={(e) => handleFileUpload(e, "activityDocument")}  />
                                        <button type="submit" style={{ display: 'none' }} class="activityDocument"></button>
                                    </form>
                                ) : (
                                    <button onClick={()=>handleDownloadDocument("activityDocument")}  className='buton3 m-0 slideup'>Yüklendi <i class="fa-solid fa-check-double"></i></button>
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
                            <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                        </div>
                        <div className="col-7 my-auto text-left">
                            <h5 className='m-0 slideup d-flex align-items-center'>Yurtdışı Şirket Kurulum Sertifikası
                            <div class="dropdown2 ms-3">
                                <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                    Yurtdışında kurduğunuz şirketinizin adı, kayıt numarası, ortaklık yapısı gibi bilgilerini içeren (kurulumu yapan firma tarafından size iletilen) dosyayı PDF olarak yükleyiniz.</div>
                            </div>
                            </h5>
                        </div>
                        <div className="col-3 my-auto p-0 justify-content-center d-flex">
                            {doc.englandCertificate === false ? (
                                    <form>
                                    <label for="englandCertificate-file-upload" class="buton4 slideup">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                    <input  id="englandCertificate-file-upload" className='d-none' type="file" onChange={(e) => handleFileUpload(e, "englandCertificate")}  />
                                    <button type="submit" style={{ display: 'none' }} class="englandCertificate"></button>
                                </form>
                                ) : (
                                    <button onClick={()=>handleDownloadDocument("englandCertificate")}  className='buton3 m-0 slideup'>Yüklendi <i class="fa-solid fa-check-double"></i></button>
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
                                <h2 className='my-auto mx-0'><i class="fa-regular fa-file"></i></h2>
                            </div>
                            <div className="col-7 my-auto text-left">
                                <h5 className='m-0 d-flex align-items-center'>Vergi Levhası
                                <div class="dropdown2 ms-3">
                                    <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-circle-info"></i>
                                    </button>
                                    <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                        Şirketirketinize ait vergi levhanızı PDF olarak yükleyiniz.</div>
                                </div>
                                </h5>
                            </div>
                            <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                {doc.taxPlate === false ? (
                                        <form>
                                        <label for="taxPlate-file-upload" class="buton4">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                        <input  id="taxPlate-file-upload" className='d-none' type="file" onChange={(e) => handleFileUpload(e, "taxPlate")}/>
                                        <button type="submit" style={{ display: 'none' }} class="taxPlate"></button>
                                    </form>
                                    ) : (
                                        <button onClick={()=>handleDownloadDocument("taxPlate")}  className='buton3 m-0'>Yüklendi <i class="fa-solid fa-check-double"></i></button>
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
                                <h2 className='my-auto mx-0'><i class="fa-regular fa-file"></i></h2>
                            </div>
                            <div className="col-7 my-auto text-left">
                                <h5 className='m-0 d-flex align-items-center'>Fatura (Elektrik, Gaz, İnternet)
                                <div class="dropdown2 ms-3">
                                    <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-circle-info"></i>
                                    </button>
                                    <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                        Şirketin en büyük hissedarına ait, doğrudan kendi adına kayıtlı Elektirik, doğalgaz, cep telefonu, internet faturasını
                                        PDF Formatında yükleyin.</div>
                                </div>
                                </h5>
                            </div>
                            <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                {doc.bill === false ? (
                                    <form>
                                        <label for="billInfo-file-upload" class="buton4">Yükle <i class="fa-solid fa-cloud-arrow-up"></i></label>
                                        <input  id="billInfo-file-upload" className='d-none' type="file" onChange={(e) => handleFileUpload(e, "bill")}   />
                                        <button type="submit" style={{ display: 'none' }} class="bill"></button>
                                    </form>
                                    ) : (
                                        <button onClick={()=>handleDownloadDocument("bill")}  className='buton3 m-0'>Yüklendi<i class="fa-solid fa-check-double"></i></button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </UserPage>
  );
}

export default Documents;




