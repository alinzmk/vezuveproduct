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
    const dispatch = useDispatch()
    //------------------------------------------------------------------------------   
    if(task.length === 0){
        dispatch(fetchAllRedux())
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
    <UserPage>
      <div className="row slideleft task-wrapper">
                                <div className="col-12 col-lg-4 pe-3 ps-0 ms-0 mb-3 mb-lg-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                                        <ul id="plan" className="task-ul">
                                            {plannedTasks.map((task, index) => (
                                                <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon'>
                                                            <i class="fa-solid fa-list-check ms-2 my-auto"></i>
                                                        </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 pe-3 ps-0 ms-0 mb-3 mb-lg-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-regular fa-clock ms-2 my-auto"></i> Süreç İşliyor</h5>
                                        <ul id="process" className="task-ul">
                                            {inProgressTasks.map((task, index) => (
                                                <li className="task-li" key={index} style={{ boxShadow: `0 0 5px 1px yellow`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon'>
                                                            <i class="fa-regular fa-clock ms-2 my-auto"></i>
                                                        </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 pe-3 ps-0 ms-0 mb-3 mb-lg-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-solid fa-check-double ms-2 my-auto"></i> Tamamlandı</h5>
                                        <ul id="finished" className="task-ul">
                                            {finishedTasks.map((task, index) => (
                                                <li className="task-li" key={index } style={{ boxShadow: `0 0 5px 1px #270082`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon'>
                                                            <i class="fa-solid fa-check-double ms-2 my-auto"></i>
                                                        </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
    </UserPage>
  );
}

export default Tasks;


