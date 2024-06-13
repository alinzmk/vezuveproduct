import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { getAllUserData, getUserPlan } from '../AdminApiService';
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
    const accessToken = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Define selectedCustomer state
    const [userPlans, setUserPlans] = useState({});
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
        const fetchPlans = async () => {
            const result = await getAllUserData(accessToken);
            setUserPlans(result.userData[1])

        };

        fetchPlans();
    }, []);

    useEffect(() => {
        console.log(useradmin)
        if(useradmin.length === 0){
            dispatch(getUserAdmin())
        }
    }, [dispatch, useradmin.length]);

    // Filter users based on search query
    const filteredUsers = useradmin.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <AdminPage>
                <div className="row slideleft">
                    <div className="col-12 pe-3 ps-0 ms-0">
                        <div className="pbg ps-3 pe-3">
                            <hr/>
                            <div className="row ps-3">
                                {/* Search bar */}
                                <div className="col-12 mb-3">
                                    <input
                                        type="text"
                                        placeholder="E-MAIL SEARCHBAR"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="col-4 p-0 product-list-container">
                                    <h4>
                                        Aktif Müşteriler
                                    </h4>
                                    <ul  className='product-list'>
                                        {filteredUsers.map(user => (
                                            userPlans[user.user_id] !== "" && (
                                                <li key={user.user_id} onClick={() => selectCustomer(user.user_id)} className={selectedCustomer === user.user_id ? 'product-active' : ''}>
                                                    {user.user_id}/{user.name}/{user.email}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-4 p-0 product-list-container">
                                    <h4>
                                        Pasif Müşteriler
                                    </h4>
                                    <ul className='product-list' >
                                        {filteredUsers.map(user => (
                                            userPlans[user.user_id] === "" && (
                                                <li key={user.user_id} onClick={() => selectCustomer(user.user_id)} className={selectedCustomer === user.user_id ? 'product-active' : ''}>
                                                    {user.user_id}/{user.name}/{user.email}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-4 p-0 product-list-container">
                                    <h4>
                                        Bütün Müşteriler
                                    </h4>
                                    <ul className='product-list' >
                                        {filteredUsers.map(user => (
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
