import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { getAllUserData } from '../AdminApiService';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAdmin } from '../../redux/features/adminuser/userAdminSlice';
import { getPlanAdmin } from '../../redux/features/adminplan/planAdminSlice';
import { getDashAdmin } from '../../redux/features/admindash/dashAdminSlice';
import { getProductAdmin } from '../../redux/features/adminproduct/productAdminSlice';
import { getTaskAdmin } from '../../redux/features/admintask/taskAdminSlice';
import fetchAdminRedux from '../../redux/fetchAdminRedux';
import AdminPage from '../Modals/AdminPage';

function SelectCustomer() {
    const { useradmin } = useSelector((state) => state.useradmin);
    const dispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Define selectedCustomer state

    const selectCustomer = (id) =>{

        const selectedUser = useradmin.find(user => user.user_id === id);

        if (selectedUser) {
            sessionStorage.setItem("selectedCustomer", id);
            sessionStorage.setItem("customerMail", selectedUser.email); // Assuming you want to store the user_id in customerMail
            setSelectedCustomer(id); // Update selectedCustomer state
            dispatch(fetchAdminRedux());
        } else {
            // Handle the case where no matching user is found (optional)
            console.error('User not found');
        }
    };
    
    useEffect(() => {
        if(useradmin.length === 0){
            dispatch(getUserAdmin())
        }
    }, [dispatch, useradmin.length]);

    return (
        <>
            <AdminPage>
                <div className="row slideleft">
                    <div className="col-3 pe-3 ps-0 ms-0">
                        <div className="pbg ps-3 pe-3">
                            <hr/>
                            <div className="row">
                                <div className="col-12 p-0 product-list-container">
                                    <ul className='product-list' >
                                        {useradmin && useradmin.map(user => (
                                            <li key={user.user_id} onClick={() => selectCustomer(user.user_id)} className={selectedCustomer === user.user_id ? 'product-active' : ''}>
                                                {user.user_id}/{user.name}/{user.email}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminPage>
        </>
    );
}

export default SelectCustomer;
