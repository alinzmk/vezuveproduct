import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import logo from "../Assets/logo-renkli.png"

const MobilSidebar2 = ({isOpen, toggleSidebar }) => {

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

     const navOpen = () => {
          if(isOpen===true){
               document.body.style.overflow = 'hidden';
               return "0px"
          }
          else{
               document.body.style.overflow = '';
               return "-800px"
          }
     }


  return (
    <>
    <div className="mobilsidebar2 m-0 p-0 d-block d-lg-none">
        <div style={{left:navOpen()}} className="sidebar-wrapper2">
            <div className="col-12 mt-0 ms-2 ps-2 text-center">
               <button onClick={toggleSidebar} className='closeButton'><i class="fa-solid fa-angles-left"></i></button>
                <ul className='sidebar-ul2'>
                    <img style={{maxWidth:"10rem"}} src={logo} />
                    <li className={splitLocation[1] === "Panel" || !splitLocation[1] ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink exact to={"/Panel"} className='sidebar-link' activeClassName="side-active" >
                             <p><i className="fa-solid fa-chart-line"></i> Panel</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Profil" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Profil"} className='sidebar-link' activeClassName="side-active">
                            <p><i class="fa-solid fa-user"></i> Profil</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Hizmetler" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Hizmetler"} className='sidebar-link' activeClassName="side-active">
                             <p><i class="fa-solid fa-pen-ruler"></i> Hizmetler</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "MarketFinder" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/MarketFinder"} className='sidebar-link' activeClassName="side-active">
                           <p> <i class="fa-solid fa-crosshairs"></i> Market Finder (BETA)</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Urunler" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Urunler"} className='sidebar-link' activeClassName="side-active">
                            <p><i class="fa-solid fa-bag-shopping"></i> Ürunler</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Proje" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Proje"} className='sidebar-link' activeClassName="side-active">
                           <p> <i class="fa-solid fa-list-check"></i> Proje</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Belgelerim" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Belgelerim"} className='sidebar-link' activeClassName="side-active">
                           <p> <i class="fa-solid fa-file"></i> Belgelerim</p>
                         </NavLink>
                    </li>
                    <li className={splitLocation[1] === "Dersler" ? "side-active sidebar-li2" : "sidebar-li2"}>
                         <NavLink to={"/Dersler"} className='sidebar-link' activeClassName="side-active">
                              <p><i class="fa-brands fa-youtube"></i> Dersler</p>
                         </NavLink>
                    </li>
                    <li className="sidebar-li2">
                         <NavLink to={"/"} className='sidebar-link' activeClassName="side-active" onClick={()=> sessionStorage.removeItem("token")}>
                         <p><i class="fa-solid fa-right-from-bracket"></i> Çıkış Yap</p>
                         </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
  );
}

export default MobilSidebar2;


