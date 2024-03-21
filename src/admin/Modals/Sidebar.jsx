import React, { useState } from 'react';
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import logo from "../Assets/kare-logo.jpg";
import { useLocation } from "react-router-dom";

const Sidebar2 = () => {

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

  return (
    <>
    <div className="sidebar2 m-0 p-0">
        <div className="sidebar-wrapper2">
            <div className="col-12 mt-0 ms-2 text-center">
                             <img className='small-logo' src={logo} alt="" />
                <ul className='sidebar-ul2'>
                    <li className={splitLocation[1] === "Panel" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink exact to={"/admin/Panel"} className='sidebar-link' activeClassName="side-active" >
                             <i className="fa-solid fa-chart-line"></i>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Profil" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/admin/Profil"} className='sidebar-link' activeClassName="side-active">
                            <i class="fa-solid fa-user"></i>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Hizmetler" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/admin/Hizmetler"} className='sidebar-link' activeClassName="side-active">
                             <i class="fa-solid fa-pen-ruler"></i>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Urunler" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/admin/Urunler"} className='sidebar-link' activeClassName="side-active">
                            <i class="fa-solid fa-bag-shopping"></i>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Belgelerim" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/admin/Belgelerim"} className='sidebar-link' activeClassName="side-active">
                            <i class="fa-solid fa-file"></i>
                         </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
  );
}

export default Sidebar2;


