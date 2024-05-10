import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchAllRedux from '../redux/fetchAllRedux';
import UserPage from '../Modals/UserPage';

function Tasks() {

    const accessToken = sessionStorage.getItem("token");
        const navigate = useNavigate();
        if(!accessToken) {
            navigate("/");
        }
    
    //------------------------------------------------------------------------------   
    const {task} = useSelector((state) => state.task)
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch()
    //------------------------------------------------------------------------------   

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

    if(task.length === 0){
        dispatch(fetchAllRedux())
    }

    function formatDate(inputDate) {
        const [datePart, timePart] = inputDate.split(' '); // Splitting date and time parts
        const [year, month, day] = datePart.split('-'); // Splitting year, month, and day
        const [hours, minutes, seconds] = timePart.split(':'); // Splitting hours, minutes, and seconds
    
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }
    
      const getTasksByStatus = (status) => {
        if (!task || !task.tasks) {
          return [];
        }

        return task.tasks.filter((task) => task.taskStatus === status);
      };
    
      const plannedTasks = getTasksByStatus('Planned');
      const inProgressTasks = getTasksByStatus('In Progress');
      const finishedTasks = getTasksByStatus('Finished');

    if(!task){
        return null
        }
  return (
    <UserPage pageName={"Proje Alanı"}>
        {isMobile ? (<>

        <section className='tasklar'>
            <div className="row slideleft task-wrapper">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div className="task-seperator pbg ps-3 pe-3">

                                <ul id="plan" className="task-ul">
                                    {plannedTasks.map((task, index) => (
                                        <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                        <strong className='m-0 ps-1 slideup d-flex align-items-center'>
                                                {task.taskName} <br/>
                                        </strong>
                                        <div style={{fontSize:"0.9rem"}}>
                                            İşlem Tarihi: {formatDate(task.taskStarted)}
                                        </div>
                                        <div className='task-icon'>
                                            <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>      
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <h5 className='task-status'><i class="fa-regular fa-clock ms-2 my-auto"></i> Süreç İşliyor</h5>
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className="task-seperator pbg ps-3 pe-3">
                                    <ul id="plan" className="task-ul">
                                        {inProgressTasks.map((task, index) => (
                                            <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                                <p className='m-0 slideup d-flex align-items-center'>
                                                            <div class="dropdown2 me-3">
                                                                <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fa-solid fa-circle-info"></i>
                                                                </button>
                                                                <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                                    Son Düzenlenme Tarihi: {formatDate(task.taskStarted)}
                                                                </div>
                                                            </div>
                                                            {task.taskName}
                                                        </p>
                                                    <div className='task-icon'>
                                                        <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                                    </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>      
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <h5 className='task-status'><i class="fa-solid fa-check-double ms-2 my-auto"></i> Tamamlandı</h5>
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className="task-seperator pbg ps-3 pe-3">
                                    <ul id="plan" className="task-ul">
                                        {finishedTasks.map((task, index) => (
                                            <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                                <p className='m-0 slideup d-flex align-items-center'>
                                                            <div class="dropdown2 me-3">
                                                                <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fa-solid fa-circle-info"></i>
                                                                </button>
                                                                <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                                    Son Düzenlenme Tarihi: {formatDate(task.taskStarted)}
                                                                </div>
                                                            </div>
                                                            {task.taskName}
                                                        </p>
                                                    <div className='task-icon'>
                                                        <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                                    </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>      
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </section>
        </>):(
            <>
                <section className='tasklar'>
                    <div className="row slideleft task-wrapper">
                        <div className="col-12 col-lg-4 pe-1 pe-lg-3 ps-0 ms-0 mb-3 mb-lg-0">
                            <div className="task-seperator pbg ps-3 pe-3">
                                <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                                <ul id="plan" className="task-ul">
                                    {plannedTasks.map((task, index) => (
                                        <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                            <strong className='m-0 ps-1 slideup d-flex align-items-center'>
                                                    {task.taskName} <br/>
                                            </strong>
                                            <div style={{fontSize:"0.9rem"}}>
                                                İşlem Tarihi: {formatDate(task.taskStarted)}
                                            </div>
                                            <div className='task-icon'>
                                                <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 pe-1 pe-lg-3 ps-0 ms-0 mb-3 mb-lg-0">
                            <div className="task-seperator pbg ps-3 pe-3">
                                <h5 className='task-status'><i class="fa-regular fa-clock ms-2 my-auto"></i> Süreç İşliyor</h5>
                                <ul id="process" className="task-ul">
                                    {inProgressTasks.map((task, index) => (
                                        <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px yellow`}}>
                                        <strong className='m-0 ps-1 slideup d-flex align-items-center'>
                                                {task.taskName} <br/>
                                        </strong>
                                        <div style={{fontSize:"0.9rem"}}>
                                            İşlem Tarihi: {formatDate(task.taskStarted)}
                                        </div>
                                        <div className='task-icon'>
                                            <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 pe-1 pe-lg-3 ps-0 ms-0 mb-3 mb-lg-0">
                            <div className="task-seperator pbg ps-3 pe-3">
                                <h5 className='task-status'><i class="fa-solid fa-check-double ms-2 my-auto"></i> Tamamlandı</h5>
                                <ul id="finished" className="task-ul">
                                    {finishedTasks.map((task, index) => (
                                        <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #270082`}}>
                                            <strong className='m-0 ps-1 slideup d-flex align-items-center'>
                                                    {task.taskName} <br/>
                                            </strong>
                                            <div style={{fontSize:"0.9rem"}}>
                                                İşlem Tarihi: {formatDate(task.taskStarted)}
                                            </div>
                                            <div className='task-icon'>
                                                <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )}
    </UserPage>
  );
}



export default Tasks;


