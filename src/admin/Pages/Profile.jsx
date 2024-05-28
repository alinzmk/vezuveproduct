import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import axios from 'axios';
import { getAllUserData, setUserData, getUserPlan } from '../AdminApiService';
import { useDispatch, useSelector } from 'react-redux';
import { successNotification } from '../../Modals/Notification';
import { getUserAdmin } from '../../redux/features/adminuser/userAdminSlice';
import AdminPage from '../Modals/AdminPage';
import fetchAdminRedux from '../../redux/fetchAdminRedux';

function Profile() {

    const accessToken = sessionStorage.getItem("token");
    const user_id1 = sessionStorage.getItem("selectedCustomer");
    const navigate = useNavigate();

    if (!accessToken) {
        navigate("/");
    }

    const [editable, setEditable] = useState("");
    const [newValue, setNewValue] = useState('');   
    const [selectedUser, setSelectedUser] = useState(null);

    const { useradmin } = useSelector((state) => state.useradmin);
    const { planadmin } = useSelector((state) => state.planadmin);
    const dispatch = useDispatch();

    //------------------------------------------------------------------------------
    useEffect(() => {
        console.log('user_id1:', user_id1);
        console.log(useradmin);
    
        if (useradmin && user_id1) {
            const user = useradmin.find((user) => user.user_id === Number(user_id1));
            console.log('Found user:', user);
            setSelectedUser(user);
        }
    }, [useradmin, user_id1]);
    

    // SET PROFILE DATA
    const handleSetUserData = async (column) => {
        try {
        const result = await setUserData(column, newValue, user_id1, accessToken);
        if (result.status === 200) {
            console.log('User data set successfully!');
            successNotification('BAŞARIYLA DEĞİŞTİRİLDİ');
            dispatch(getUserAdmin())
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

    useEffect(() => {
        if (useradmin.length===0 || planadmin.length===0) {
            dispatch(getUserAdmin())
            dispatch(fetchAdminRedux());
        }
        }, [dispatch, useradmin, planadmin]);
    

  return (
    <>
        <AdminPage pageName={"Profil"}>
            <section className='profil'>
            <form>
            <div className="col-9 mb-4">
                <div className="row ps-0 my-3 slideup ">
                    <div className="col-9 my-auto">
                        <div className="col-12">
                            <h3 className='ms-4 purple'>Hoş geldiniz<i class="fa-solid fa-hands"></i>, Sayın {selectedUser ? (
                                <>{selectedUser.name}</>
                                ) : (
                                <>Müşterimiz</>
                            )}.</h3>
                        </div>
                        <div className="col-12 ms-4 purple ">
                            <h6 className=''>Şu anda ödeme planınız; {planadmin.userPlan ?(
                                <>{planadmin.userPlan.currentPlan}</>
                            ) : (
                                <>Aktif Planınız yok</>
                            )}  
                            <button class="buton2 ms-2 mt-2 trans"><i class="fa-solid fa-repeat"></i> Değiştir</button></h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 slideleft">
                <div className="row mb-3">
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Hesap Adı</p>
                            {editable ==="accountName" ?(
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="E-Postanız" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("accountName")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                            ) : (
                                selectedUser ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.accountName}</h6>
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("accountName")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <h6 className='profile-info'>No data </h6>
                                )
                            )}

                        </div>
                    </div>
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>E-mail</p>
                            {editable ==="email" ?(
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="E-Postanız" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("email")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                            ) : (
                                selectedUser ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.email}</h6>
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("email")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <h6 className='profile-info'>No data </h6>
                                )
                            )}

                        </div>
                    </div>
                    
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Telefon</p>
                            {editable==="phone" ? (
                                    // Content to display when editable is true (empty in this case)
                                    <div className="d-flex align-items-center">
                                    <input type='text' className='profile-input' placeholder="Telefonunuz" onChange={(e) => setNewValue(e.target.value)}></input>
                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("phone")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                                ) : (
                                    selectedUser ? (
                                        <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.phone}</h6>
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("phone")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>
                                    ) : (
                                        // Display an empty h6 element if userData doesn't exist
                                        <h6 className='profile-info'>No data </h6>
                                    )
                            )}
                            
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Şirket Ünvanı</p>
                            {editable==="companyTitle" ? (
                                    // Content to display when editable is true (empty in this case)
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="Şirket Ünvanınız" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("companyTitle")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                                ) : (
                                    selectedUser ? (
                                        // Display user address if userData exists
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div className="d-flex align-items-center">
                                                <h6 className='profile-info'>{selectedUser.companyTitle}</h6>
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
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Vergi Dairesi</p>
                            {editable==="taxAdmin" ? (
                                    // Content to display when editable is true (empty in this case)
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="Vergi Daireniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("taxAdmin")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                                ) : (
                                    selectedUser ? (
                                        <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.taxAdmin}</h6>
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
                                        </form>
                                    )
                            )}
                        </div>
                    </div>
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Vergi Numarası</p>
                            {editable ==="taxNumber" ?(
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="E-Postanız" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("taxNumber")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                            ) : (
                                selectedUser ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.taxNumber}</h6>
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("taxNumber")}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <h6 className='profile-info'>No data </h6>
                                )
                            )}

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 ps-0 pe-3">
                        <div className="pbg">
                            <p className='profile-title'>Şehir</p>
                            {editable==="city" ? (
                                    // Content to display when editable is true (empty in this case)
                                    <div className="d-flex align-items-center">
                                        <input type='text' className='profile-input' placeholder="Şehriniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("city")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                    </div>
                                ) : (
                                    selectedUser ? (
                                        <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="d-flex align-items-center">
                                            <h6 className='profile-info'>{selectedUser.city}</h6>
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
                                    selectedUser ? (
                                        <form onSubmit={(e) => e.preventDefault()}>
                                        
                                            <div className="d-flex align-items-center">
                                                <h6 className='profile-info'>{selectedUser.address}</h6>
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
            </section>
        </AdminPage>
    </>
  );
}

export default Profile;
