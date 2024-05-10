import React, { useEffect, useState } from 'react';
import Sidebar2 from '../Modals/Sidebar2';
import logo from "../Assets/logo-renkli.png"
import mobilelogo from "../Assets/kare-logo.png"
import Whatsapp from './Whatsapp';
import MobilSidebar2 from './MobilSidebar2';

const UserPage = ({ pageName, children }) => {

    const [navOpen, setNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    const toggleSidebar = () => {
        setNavOpen(!navOpen);
    };


  return (
    <>
    <Whatsapp/>
        <div className="main m-0">
        <div className='slideup'>
        </div>
            <div className="row">
                 <div className="p-0">
                 {isMobile ? ( 
                    <MobilSidebar2 isOpen={navOpen} toggleSidebar={toggleSidebar}/>
                     ) : (
                    <Sidebar2 />
                 )}
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="col-12 mb-0">                           
                          <div className="row mb-3 me-0 me-lg-5 align-items-center">
                              <div className="col-auto p-0 d-flex">
                                  <button id='sideOpen' className='d-block d-lg-none me-2' onClick={()=>setNavOpen(true)} ><i class="fa-solid fa-bars"></i></button>
                                  <h4 className='purple w-auto m-auto'>{pageName}</h4>
                              </div>
                              <div className="col text-end p-0">
                                  {isMobile ? (
                                    <>
                                      <img src={mobilelogo} style={{maxWidth:"4rem"}} className='sidebar-logo' alt="" />
                                    </>
                                  ):(
                                    <>
                                      <img src={logo}  className='sidebar-logo' alt="" />
                                    </>
                                  )}
                              </div>
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