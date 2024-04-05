import '../App.css';
import { useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import LineChart from '../Modals/Linechart';
import Sidebar2 from '../Modals/Sidebar2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import UserPage from '../Modals/UserPage';


function Dashboard() {
    
    const accessToken = (sessionStorage.getItem("token"));
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");  
    }
   //------------------------------------------------------------------------------   
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const {plan} = useSelector((state) => state.plan);
    const {dash} = useSelector((state) => state.dash);
    const dispatch = useDispatch()
    //------------------------------------------------------------------------------   
    if(dash.length === 0){
        dispatch(fetchAllRedux())
    }   
    //------------------------------------------------------------------------------   


    /*  const [graphData, setGraphData] = useState(null);
        const reportGraph = [];
        setGraphData({
            labels: (reportGraph.map((data) => data.month)),
            datasets: [
            {
                data: reportGraph.map((data) => data.value),
                backgroundColor: "rgba(28, 29, 34, 1)",
                borderColor: "rgba(28, 29, 34, 1)",
                borderWidth: 1,
                },
            ],
        }); */

        

      const totalGrowth = () => {
        if(month !== 0){
            var prevMonth = month- 1
        }
        else if(month === 0){
            var prevMonth = 11 
        }
        var currentSale = dash.sales[0][month].value
        var previousSale = dash.sales[0][prevMonth].value
        var total = currentSale - previousSale;
        return total
      } 

      const calculateRemainingDays = () => {
        const start = new Date(plan.startDate);
        const end = new Date(plan.finishDate);
        const timeDifference = end.getTime() - start.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return(daysDifference);
      };

  return (
      <UserPage pageName={"Panel"}>
        <section className='dashboard'>
            <div className="row slideleft">
                <div className="col-12 col-lg-6">
                    <div className="row d-flex justify-content-between pe-0 pe-lg-3">
                        <div className='col-lg-4 col-12 trans mainhov' id='total-sales'>
                            <div className='col-12 slideup position-relative'>
                                <h6>Toplam Satış</h6>
                                {dash.sales ? (
                                    <>
                                        <h2>{dash.sales[0][month].value}$<span className='aylık'>/aylık</span></h2>
                                        <p className='plus'>+%3</p>
                                    </>
                                ) : (
                                    <>
                                        <h2>0000$<span className='aylık'>/aylık</span></h2>
                                        <p className='plus'>+%0</p>
                                    </>
                            )}
                            </div>
                        </div>
                        <div className='col-lg-3 col-12  trans mainhov' id='total-purchases'>
                            <div className='col-12 slideup'>
                                <h6>Toplam Reklam Harcaması</h6>
                                {dash.ads ? (
                                    <>
                                        <h2>{dash.ads[0][month].value}$<span className='aylık'>/günlük</span></h2>
                                        <p className='plus'>+%3</p>
                                    </>
                                ) : (
                                    <>
                                        <h2>0000$<span className='aylık'>/günlük</span></h2>
                                        <p className='plus'>+%0</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='col-lg-3 col-12 trans mainhov' id='total-orders'>
                            <div className='col-12 slideup'>
                                <h6>Toplam Sipariş</h6>
                                {dash.sales_unit ? (
                                        <>
                                            <h2>{dash.sales_unit[0][month].value}<span className='aylık'>/adet</span></h2>
                                            <p className='minus'>+%0</p>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <h2>0000<span className='aylık'>/adet</span></h2>
                                            <p className='plus'>+%0</p>
                                        </>
                                )}
                            </div>
                        </div>
                        <div className='col-12 trans mainhov' id='total-growth'>
                            <div className='col-12 slideup position-relative'>
                                <h6>Toplam Büyüme</h6>
                                {dash.sales ? (
                                    <>
                                        <h2>{totalGrowth()}$<span className='aylık'>/aylık</span></h2>
                                        <p className='plus2'>+%0</p>
                                    </>
                                ) : (
                                    <>
                                        <h2>0000$<span className='aylık'>/aylık</span></h2>
                                        <p className='plus2'>+%0</p>
                                    </>
                            )}
                                    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 mb-3 d-flex justify-content-between" id='customer-info'>                           
                    <div className="col-12 ps-1 ps-lg-5 my-auto">
                        <h5 className='main-info' >Aktif hizmetiniz <i class="fa-solid fa-box-open"></i> : <span className='main-info2' >
                            {plan ? (
                                    <>
                                        <span className='main-info2'>{plan.currentPlan}</span>
                                    </>
                                ) : (
                                    <>
                                        No Data
                                    </>
                            )}
                            {}</span></h5>
                        <hr className='info-hr' />
                        <h5 className='main-info' >E-Ticaret Uzmanınız <i class="fa-regular fa-user"></i> : <span className='main-info2' >
                            {plan ? (
                                    <>
                                        <span className='main-info2'>{plan.expert}</span>
                                        
                                    </>
                                ) : (
                                    <>
                                        No Data
                                    </>
                            )}
                            </span></h5>  
                        <hr  className='info-hr'/>                                  
                        <h5 className='main-info' >Uzman İletişim Bilgileri <i class="fa-regular fa-user"></i> : <span className='main-info2' >
                            {plan ? (
                                    <>
                                        <span className='main-info2'>{plan.expertmail}</span>
                                        
                                    </>
                                ) : (
                                    <>
                                        No Data
                                    </>
                            )}
                            </span></h5>  
                        <hr className='info-hr' />
                        <h5 className='main-info' >Kalan Abonelik Süreniz <i class="fa-regular fa-clock"></i> : <span className='main-info2' >
                            {plan ? (
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
                <div  className="col-12 col-lg-6 mb-lg-0 mb-3 pe-0 pe-lg-3">
                    <div className="row me-1" id="graph">
                        <div className="col-12 text-center">
                                <h3 className='p-3'>Satış Raporu</h3>
                        </div>
                        <div className="col-12 m-0  chart-wrapper">
                            
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
                                <h2><i class="fa-solid fa-magnifying-glass"></i></h2>
                            </div>
                                <div className="col-3 my-auto text-center">
                                    Pazar Araştırması
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    31.12.2023
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
                                Mağaza Açılışı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    Belge Onayı
                                </div>
                                <div className="col-2 my-auto text-center">
                                    21.01.2024
                                </div>
                            <div className="col-3 my-auto text-center">
                                Bekleniyor <i class="fa-regular fa-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </UserPage>
  );
}

export default Dashboard;
