import React from 'react';
import Sidebar2 from '../Modals/Sidebar2';
import logo from "../Assets/logo-renkli.png"
import { useSelector } from 'react-redux';

const UserPage = ({ pageName, children }) => {

  return (
    <>
        <div className="dashboard m-0">
        <div className='slideup'>
        </div> 
            <div className="row">
                 <div className="p-0">
                 <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12 mb-0">                           
                            <div className="row mb-4 me-5 d-flex justify-content-between">
                                <h2 className='purple w-auto mt-3'>{pageName} </h2>
                                <img src={logo} className='sidebar-logo ' alt="" />
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </>


  );
};

export default UserPage;