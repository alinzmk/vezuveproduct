import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserTask, deleteUserTask, setUserTasks } from '../AdminApiService';
import { getTaskAdmin } from '../../redux/features/admintask/taskAdminSlice';
import AdminPage from '../Modals/AdminPage';
import fetchAdminRedux from '../../redux/fetchAdminRedux';

function Tasks() {

    const accessToken = sessionStorage.getItem("token")
    const user_id = (sessionStorage.getItem("selectedCustomer"))
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    //------------------------------------------------------------------------------  
    const {taskadmin} = useSelector((state) => state.taskadmin)
    const [taskName, setTaskName] = useState("")
    const dispatch = useDispatch()
    //------------------------------------------------------------------------------   

    /*  
    user_id
    taskName
    taskStatus
    expert
    taskStarted
    taskEnded
    */

    const handleCreateUserTask = async () => {
        try {
            const response = await createUserTask( user_id, taskName, accessToken);
            console.log('User task created successfully:', response);
            dispatch(getTaskAdmin())
        } catch (error) {
          console.error('Error creating user task:', error);
        }
      };

    const handleSetUserTasks = async (taskEditName, columnValue, newValue) => {
        console.log(taskEditName, columnValue, newValue)
        try {
          const response = await setUserTasks(taskEditName, columnValue, newValue, user_id, accessToken);
          console.log('User tasks updated successfully:', response);
          dispatch(getTaskAdmin())
        } catch (error) {
          console.error('Error setting user tasks:', error);
        }
      };

      const handleDeleteUserTask = async (taskName) => {
        try {
          // Call the deleteUserTask function with the taskName
          const response = await deleteUserTask(taskName, accessToken, user_id);
          console.log('User task deleted successfully:', response);
          dispatch(getTaskAdmin())
          // Handle success
        } catch (error) {
          console.error('Error deleting user task:', error);
          // Handle error
        }
      };


      const getTasksByStatus = (status) => {
        if (!taskadmin.tasks || !taskadmin.tasks.tasks) {
          return [];
        }

        return taskadmin.tasks.tasks.filter((task) => task.taskStatus === status);
      };
    
    const plannedTasks = getTasksByStatus('Planned');
    const inProgressTasks = getTasksByStatus('In Progress');
    const finishedTasks = getTasksByStatus('Finished');

    useEffect(() => {
        if (!taskadmin || taskadmin.length === 0) {
            dispatch(fetchAdminRedux());
        }
    }, [dispatch, taskadmin]);
    

    
      if(!taskadmin.tasks){
        return null
    }
  return (
    <>
        <AdminPage>

            <div className="row slideleft task-wrapper">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="">
                            <input 
                                type="text" 
                                className='product-input me-3' 
                                value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)} 
                                placeholder='Eklemek İstediğiniz Taskı Giriniz'>
                            </input>
                        <button className="profile-button ms-auto trans me-3 my-2" onClick={handleCreateUserTask}>
                            Ekle
                        </button>
                    </div>
                </form>
                    
                <div className="col-12 col-lg-4 pb-4 pb-lg-0 pe-3 ps-0 ms-0">
                    <div className="task-seperator pbg ps-3 pe-3">
                        <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                        <ul id="plan" className="task-ul">
                            {plannedTasks.map((task, index) => (
                                <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                    <p className='task-title' >{task.taskName}</p>
                                    <div className='task-icon-admin dropdown'>                
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list-check my-auto"></i>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Planned" )} ><a class="dropdown-item" href="#">Plan</a></li>
                                            <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "In Progress" )} ><a class="dropdown-item" href="#">Process</a></li>
                                            <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Finished" )} ><a class="dropdown-item" href="#">Finished</a></li>
                                            <li onClick={()=>handleDeleteUserTask(task.taskName)} ><a class="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-lg-4 pb-4 pb-lg-0 pe-3 ps-0 ms-0">
                    <div className="task-seperator pbg ps-3 pe-3">
                        <h5 className='task-status'><i class="fa-regular fa-clock ms-2 my-auto"></i> Süreç İşliyor</h5>
                        <ul id="process" className="task-ul">
                            {inProgressTasks.map((task, index) => (
                                <li className="task-li" key={index} style={{ boxShadow: `0 0 5px 1px yellow`}}>
                                    <p className='task-title' >{task.taskName}</p>
                                    <div className='task-icon-admin dropdown'>                
                                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-regular fa-clock my-auto"></i>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Planned" )} ><a class="dropdown-item" href="#">Plan</a></li>
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "In Progress" )} ><a class="dropdown-item" href="#">Process</a></li>
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Finished" )} ><a class="dropdown-item" href="#">Finished</a></li>
                                                <li onClick={()=>handleDeleteUserTask(task.taskName)} ><a class="dropdown-item" href="#">Delete</a></li>
                                            </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-lg-4 pb-4 pb-lg-0 pe-3 ps-0 ms-0">
                    <div className="task-seperator pbg ps-3 pe-3">
                        <h5 className='task-status'><i class="fa-solid fa-check-double ms-2 my-auto"></i> Tamamlandı</h5>
                        <ul id="finished" className="task-ul">
                            {finishedTasks.map((task, index) => (
                                <li className="task-li" key={index } style={{ boxShadow: `0 0 5px 1px #270082`}}>
                                    <p className='task-title' >{task.taskName}</p>
                                    <div className='task-icon-admin dropdown'>                
                                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-check-double  my-auto"></i>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Planned" )} ><a class="dropdown-item" href="#">Plan</a></li>
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "In Progress" )} ><a class="dropdown-item" href="#">Process</a></li>
                                                <li onClick={()=>handleSetUserTasks(task.taskName, "taskStatus", "Finished" )} ><a class="dropdown-item" href="#">Finished</a></li>
                                                <li onClick={()=>handleDeleteUserTask(task.taskName)} ><a class="dropdown-item" href="#">Delete</a></li>
                                            </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AdminPage>
        
    </>
  );
}

export default Tasks;


