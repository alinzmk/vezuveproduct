import { useEffect, useState } from 'react';
import LineChart from '../Modals/Linechart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPage from '../Modals/AdminPage';
import fetchAdminRedux from '../../redux/fetchAdminRedux';
import { successNotification } from '../../Modals/Notification';
import { setUserPlan, updateToUserAds, updateToUserSales, updateToUserSalesUnit } from '../AdminApiService';


function Dashboard() {
    
    const accessToken = (sessionStorage.getItem("token"));
    const user_id = parseInt(sessionStorage.getItem("selectedCustomer"))
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");  
    }
   
   //------------------------------------------------------------------------------   
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const monthNames = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"
      ];
    
    const {planadmin} = useSelector((state) => state.planadmin)
    const {dashadmin} = useSelector((state) => state.dashadmin)
    const dispatch = useDispatch()
    if(dashadmin.length === 0){
        dispatch(fetchAdminRedux())
    }
   
    //------------------------------------------------------------------------------

    const [editable, setEditable] = useState("");
    const [newValue, setNewValue] = useState('');
    //------------------------------------------------------------------------------  
    const [graphData, setGraphData] = useState(null);

    const totalGrowth = () => {
        if(month !== 0){
            var prevMonth = month- 1
        }
        else if(month === 0){
            var prevMonth = 11
        }
        var currentSale = dashadmin.sales[0][month].value
        var previousSale = dashadmin.sales[0][prevMonth].value
        var total = currentSale - previousSale;
        return total
    } 

    const calculateRemainingDays = () => {
    const start = new Date(planadmin.userPlan.startDate);
    const end = new Date(planadmin.userPlan.finishDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return(daysDifference);
    }

    const handleSetSalesData = async () => {
        try {
            const sale_amount = parseInt(newValue)
            const response = await updateToUserSales(user_id , monthNames[month], sale_amount, accessToken);
            dispatch(fetchAdminRedux()) 
            // Handle success
        } catch (error) {
            console.error('Error updating user sales:', error);
            // Handle error
        }
    }

    const updateSalesData = () =>{
        handleSetSalesData()
        setEditable(null);
    }
     
    const handleSetAdsData = async () => {
        try {
            const ads_amount = parseInt(newValue)
            const response = await updateToUserAds(user_id , monthNames[month], ads_amount, accessToken);
            dispatch(fetchAdminRedux()) 
            // Handle success
        } catch (error) {
            console.error('Error updating user sales:', error);
            // Handle error
        }
    }
        
    const updateAdsData = () =>{
        handleSetAdsData()
        setEditable(null);
    }

       /*  user_id, currentPlan, expert, expertmail, startDate, finishDate */
        
    const handleSetSaleUnitData = async () => {
        try {
            const unit_amount = parseInt(newValue)
            const response = await updateToUserSalesUnit(user_id , monthNames[month], unit_amount, accessToken);
            dispatch(fetchAdminRedux()) 
            // Handle success
        } catch (error) {
            console.error('Error updating user sales:', error);
        // Handle error
    }
    };
    
    const updateSaleUnitData = () =>{
        handleSetSaleUnitData()
        setEditable(null);
    }

    const handleSetUserPlan = async (column) => {
        try {
          // Call the setUserPlan function with input values
          const response = await setUserPlan(accessToken, user_id, column, newValue);
          dispatch(fetchAdminRedux()) 
          setEditable(null);
        } catch (error) {
          console.error('Error setting user plan:', error);
          // Handle error
        }
      };
    
      
  return (
      <>
      <AdminPage pageName={"Ana Panel"}>
        <section className='dashboard'>
            <div className="row slideleft">
                <div className="col-12 col-lg-6">
                    <div className="row d-flex justify-content-between pe-0 pe-lg-3">
                        <div className='col-12 trans mainhov' id='total-sales'>
                            <div className='col-12 slideup position-relative'>
                                <h6>Toplam Satış</h6>
                                {editable === "sales" ? (
                                    <>
                                        <input type='text' className='profile-input' placeholder={dashadmin.sales[0][month].value} onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateSalesData()} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                    {dashadmin.sales ? (
                                    <>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                                    {dashadmin.sales && dashadmin.sales[0] && (
                                                        <h2>{dashadmin.sales[0][month].value}$<span className='aylık'>/aylık</span></h2>
                                                    )}
                                                <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("sales")}>
                                                    Satış Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                    </>
                            )}
                                    </>
                                )}
                                
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-12  trans mainhov' id='total-purchases'>
                            <div className='col-12 slideup'>
                                <h6>Toplam Reklam Harcaması</h6>
                                {editable === "ads" ? (
                                    <>
                                        <input type='text' className='profile-input' placeholder={dashadmin.ads[0][month].value} onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateAdsData()} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                    {dashadmin.ads ? (
                                    <>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                        {dashadmin.ads && dashadmin.ads[0] && (
                                            <h2>{dashadmin.ads[0][month].value}$<span className='aylık'>/günlük</span></h2>
                                                    )}
                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("ads")}>
                                                Reklam Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='col-lg-3 col-12 trans mainhov' id='total-orders'>
                            <div className='col-12 slideup'>
                                <h6>Toplam Sipariş</h6>
                                {editable === "sales_unit" ? (
                                    <>
                                        <input type='text' className='profile-input' placeholder={dashadmin.sales_unit[0][month].value} onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateSaleUnitData()} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                    {dashadmin.sales_unit ? (
                                        <>
                                            <form onSubmit={(e) => e.preventDefault()}>
                                            {dashadmin.sales_unit && dashadmin.sales_unit[0] && (
                                                <h2>{dashadmin.sales_unit[0][month].value}<span className='aylık'>/adet</span></h2>
                                                    )}
                                                <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("sales_unit")}>
                                                    Unit Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                )}
                                    </>
                                )}
                                
                            </div>
                        </div>
                        <div className='col-12 trans mainhov' id='total-growth'>
                            <div className='col-12 slideup position-relative'>
                                <h6>Toplam Büyüme</h6>
                                {dashadmin.sales ? (
                                    <>
                                    {dashadmin.sales && dashadmin.sales[0] && (
                                        <>
                                            <h2>{totalGrowth()}$<span className='aylık'>/aylık</span></h2>
                                            <p className='minus2'>+%0</p>
                                        </>
                                                    )}
                                    </>
                                ) : (
                                    <>
                                        <h2>0000$<span className='aylık'>/aylık</span></h2>
                                    </>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 mb-3 d-flex justify-content-between" id='customer-info'>                           
                    <div className="col-12 ps-5 my-auto">
                            {editable === "currentPlan" ? (
                            <>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleSetUserPlan("currentPlan")} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <input type='text' className='profile-input' placeholder={planadmin.userPlan.currentPlan} onChange={(e) => setNewValue(e.target.value)}></input>
                            </>
                            ):(
                            <>
                                {planadmin.userPlan ? (
                                        <>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                                <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("currentPlan")}>
                                                    Plan Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            <span className='main-info2'>{planadmin.userPlan.currentPlan}</span>
                                        </form>
                                        </>
                                    ) : (
                                        <>
                                            No Data
                                        </>
                                )}
                            </>)}
                        <hr className='info-hr' />
                        {editable === "expert" ? (
                            <>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleSetUserPlan("expert")} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <input type='text' className='profile-input' placeholder={planadmin.userPlan.expert} onChange={(e) => setNewValue(e.target.value)}></input>
                            </>
                            ):(
                            <>
                                {planadmin.userPlan ? (
                                        <>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                                <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("expert")}>
                                                    Uzman Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            <span className='main-info2'>{planadmin.userPlan.expert}</span>
                                        </form>
                                        </>
                                    ) : (
                                        <>
                                            No Data
                                        </>
                                )}
                            </>)} 
                        <hr  className='info-hr'/>
                        {editable === "expertmail" ? (
                            <>
                                        <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleSetUserPlan("expertmail")} >
                                            Kaydet <i class="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <input type='text' className='profile-input' placeholder={planadmin.userPlan.expertmail} onChange={(e) => setNewValue(e.target.value)}></input>
                            </>
                            ):(
                            <>
                                {planadmin.userPlan ? (
                                        <>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                                <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("expertmail")}>
                                                    Uzman Mail Düzenle <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            <span className='main-info2'>{planadmin.userPlan.expertmail}</span>
                                        </form>
                                        </>
                                    ) : (
                                        <>
                                            No Data
                                        </>
                                )}
                            </>)}                                 
                        <hr className='info-hr' />
                        <h5 className='main-info' >Kalan Abonelik Süreniz <i class="fa-regular fa-clock"></i> : <span className='main-info2' >
                            {planadmin.userPlan ? (
                                    <>
                                        <span className='main-info2'>{calculateRemainingDays()} gün</span> 
                                        
                                        
                                    </>
                                ) : (
                                    <>
                                        No Data
                                    </>
                            )}
                            </span></h5>
                    </div>
                </div>
            </div>
            <div className="row slideleft">
                <div  className="col-12 col-lg-6">
                    <div className="row me-1" id="graph">
                        <div className="col-12 text-center">
                                <h3 className='p-3'>Satış Raporu</h3>
                        </div>
                        <div className="col-12 m-0 chart-wrapper">
                            
                                    <LineChart/>
                        

                        </div>
                    </div>
                </div>
                <div id="status" className="col-12 col-lg-6">
                    <div className="col-12 text-center mt-4">
                        <h3>Son Durumlar</h3>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="row mb-4 d-flex justify-content-between">
                            <div className="col-1 my-auto ms-4">
                                <h2><i class="fa-regular fa-folder-open"></i></h2>
                            </div>
                                <div className="col-3 my-auto text-center">
                                    Şirket Kurulumu
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    21.12.2023
                                </div>
                            <div className="col-3 my-auto text-center">
                                Tamamlandı <i class="fa-solid fa-check-double"></i>
                            </div>
                        </div>
                        <div className="row mb-4 d-flex justify-content-between">
                            <div className="col-1 my-auto ms-4">
                                <h2><i class="fa-regular fa-folder-open"></i></h2>
                            </div>
                                <div className="col-3 my-auto text-center">
                                    Şirket Kurulumu
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    21.12.2023
                                </div>
                            <div className="col-3 my-auto text-center">
                            Hazırlanıyor <i class="fa-solid fa-file-signature"></i>
                            </div>
                        </div>
                        <div className="row mb-4 d-flex justify-content-between">
                            <div className="col-1 my-auto ms-4">
                                <h2><i class="fa-regular fa-folder-open"></i></h2>
                            </div>
                                <div className="col-3 my-auto text-center">
                                    Şirket Kurulumu
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    21.12.2023
                                </div>
                            <div className="col-3 my-auto text-center">
                                Bekleniyor <i class="fa-regular fa-clock"></i>
                            </div>
                        </div>
                        <div className="row mb-4 d-flex justify-content-between">
                            <div className="col-1 my-auto ms-4">
                                <h2><i class="fa-regular fa-folder-open"></i></h2>
                            </div>
                                <div className="col-3 my-auto text-center">
                                    Şirket Kurulumu
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    21.12.2023
                                </div>
                            <div className="col-3 my-auto text-center">
                                Bekleniyor <i class="fa-regular fa-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </AdminPage>
        
    </> 
  );
}

export default Dashboard;
