import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import { setUserData } from '../ApiService';
import ErrorPage from './ErrorPage';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import { successNotification } from '../Modals/Notification';
import { getUserAdmin } from '../redux/features/adminuser/userAdminSlice';
import UserPage from '../Modals/UserPage';

function Profile() {

    const accessToken = sessionStorage.getItem("token")
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    const [editable, setEditable] = useState("");
    const [newValue, setNewValue] = useState('');
    //------------------------------------------------------------------------------    
    const {profile} = useSelector((state) => state.profile);
    const {plan} = useSelector((state) => state.plan);
    const dispatch = useDispatch();
   //------------------------------------------------------------------------------   
    if(profile.length === 0){
        dispatch(fetchAllRedux())
    }
   //------------------------------------------------------------------------------   

    // SET PROFILE DATA
    const handleSetUserData = async (column) => {
      try {
        const result = await setUserData(accessToken, column, newValue);
        if (result.status === 200) {
          console.log('User data set successfully!');
          successNotification('BAŞARIYLA DEĞİŞTİRİLDİ');
          dispatch(fetchAllRedux())
        } else {
          console.error('Failed to set user data.');
        }
      } catch (error) {
        console.error('Error setting user data:', error);
      }
    };

    const updateUserData = (state) =>{
        handleSetUserData(state);
        setEditable(null);
    }

  return (

    <UserPage>
        <div className="col-9 mb-4">
            <div className="row ps-0 my-3 slideup ">
                <div className="col-9 my-auto">
                    <div className="col-12">
                        <h3 className='ms-4 purple'>Hoş geldiniz<i class="fa-solid fa-hands"></i>, Sayın {profile ? (
                            <>{profile.name} {profile.surname}</>
                            ) : (
                            <>Müşterimiz</>
                        )}.</h3>

                    </div>
                    <div className="col-12 ms-4 purple ">
                        <h6 className=''>Şu anda ödeme planınız; {plan ?(
                            <>{plan.currentPlan}</>
                        ) : (
                            <>Aktif Planınız yok</>
                        )}  
                        <button class="buton2 ms-2 mt-2 trans" onClick={()=>navigate('/Hizmetler')} ><i class="fa-solid fa-repeat"></i> Değiştir</button></h6>
                    </div>
                </div>
            </div>
        </div>
        <form>
        <div className="col-12 slideleft">
            <div className="row mb-3">
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Hesap Adı</p>
                        {profile ? (
                            <h6 className='profile-info'>{profile.accountName}</h6>
                            ) : (
                            <h6 className='profile-info'>No data</h6>
                        )}

                    </div>
                </div>
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>E-mail</p>
                        {profile ? (
                            <h6 className='profile-info'>{profile.email}</h6>
                            ) : (
                            <h6 className='profile-info'>No data </h6>
                        )}

                    </div>
                </div>
                
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Telefon</p>
                        {editable==="phone" ? (
                                // Content to display when editable is true (empty in this case)
                                <input type='text' className='profile-input' placeholder="Telefonunuz" ></input>
                            ) : (
                                profile ? (
                                    // Display user address if userData exists
                                    <h6 className='profile-info'>{profile.phone}</h6>
                                ) : (
                                    // Display an empty h6 element if userData doesn't exist
                                    <h6 className='profile-info'>No data </h6>
                                )
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Şirket Ünvanı</p>
                        {editable==="companyTitle" ? (
                                // Content to display when editable is true (empty in this case)
                                <div className="d-flex align-items-center">
                                    <input type='text' className='profile-input' placeholder="Şirket Ünvanınız" onChange={(e) => setNewValue(e.target.value)}></input>
                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("companyTitle")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                </div>
                            ) : (
                                profile ? (
                                    // Display user address if userData exists
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{profile.companyTitle}</h6>
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("companyTitle")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>No data</h6>
                                            <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("companyTitle")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>// Display an empty h6 element if userData doesn't exist
                                )
                        )}

                    </div>
                </div>
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Vergi Dairesi</p>
                        {editable==="taxAdmin" ? (
                                // Content to display when editable is true (empty in this case)
                                <div className="d-flex align-items-center">
                                    <input type='text' className='profile-input' placeholder="Vergi Daireniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("taxAdmin")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                </div>
                            ) : (
                                profile.taxAdmin ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex align-items-center">
                                        <h6 className='profile-info'>{profile.taxAdmin}</h6>
                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("taxAdmin")}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    </form>// Display user address if userData exists
                                ) : (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex align-items-center">
                                        <h6 className='profile-info'>No data</h6>
                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("taxAdmin")}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    </form>// Display an empty h6 element if userData doesn't exist
                                )
                        )}
                    </div>
                </div>
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Vergi Numarası</p>
                        {profile ? (
                            <h6 className='profile-info'>{profile.taxNumber}</h6>
                            ) : (
                            <h6 className='profile-info'>No data</h6>
                        )}

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-lg-4 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Şehir</p>
                        {editable==="city" ? (
                                // Content to display when editable is true (empty in this case)
                                <div className="d-flex align-items-center">
                                    <input type='text' className='profile-input' placeholder="Şehriniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("city")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                </div>
                            ) : (
                                profile ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex align-items-center">
                                        <h6 className='profile-info'>{profile.city}</h6>
                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("city")}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    </form>// Display user address if userData exists
                                ) : (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex align-items-center">
                                        <h6 className='profile-info'>No data</h6>
                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("city")}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    </form>// Display an empty h6 element if userData doesn't exist
                                )
                        )}

                    </div>
                </div>
                <div className="col-8 ps-0 pe-3">
                    <div className="pbg">
                        <p className='profile-title'>Açık Adres</p>
                        {editable==="address" ? (
                                // Content to display when editable is true (empty in this case)
                                <div className="d-flex align-items-center">
                                    <input type='text' className='profile-input' placeholder="Adresiniz" onChange={(e) => setNewValue(e.target.value)} ></input>
                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("address")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                </div>
                            ) : (
                                profile ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{profile.address}</h6>
                                            <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("address")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    
                                    </form>
                                ) : (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex align-items-center">
                                        <h6 className='profile-info'>No data</h6>
                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("address")}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    </form>// Display an empty h6 element if userData doesn't exist
                                )
                            )}
                    </div>
                </div>
            </div>
        </div>
        </form>
    </UserPage>
  );
}

export default Profile;
