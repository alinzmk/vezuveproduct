import {React, useRef, useState} from 'react';
import '../App.css';
import { Link, NavLink, useHistory, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { createPaymentLink } from '../ApiService';

const Plan1 = ({isOpen,onClose,selectedItem, serviceItems }) => {

    const [accessToken, setAccessToken] = useState('your-access-token'); // Replace with actual access token
    const [productId, setProductId] = useState('your-product-id'); // Replace with actual product ID
  
    const handleCreatePaymentLink = async () => {
      try {
        const result = await createPaymentLink(accessToken, productId);
  
        if (result.status === 200) {
          console.log('Payment link created successfully:', result.link);
          // Handle success if needed
        } else {
          console.error('Failed to create payment link:', result.message);
          // Handle failure if needed
        }
      } catch (error) {
        console.error('Error creating payment link:', error);
        // Handle error
      }
    };

    if (!selectedItem) return null;
    console.log(selectedItem.img);
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    }; if (!isOpen) return null;

    const purchaseService = () =>{
        handleCreatePaymentLink();
    }

    return (
        <div onClick={handleOverlayClick} className="overlay ">

            <div onClick={(e)=>{e.stopPropagation()}} class="modalContainer fadeIn">
                    <button onClick={onClose} class="closeBtn"><i class="fa-solid fa-x"></i></button>
                <div class="row px-5 py-3 w-100">
                <div className="col-6 mt-5 ps-1">
                            <img className='modal-logo ' src={require(`../Assets/${selectedItem.logo}`)} alt="" />
                            <h3 className='modal-info-1 mt-4'>{selectedItem.name}</h3>


                        
                        <div className="">
                            <div className='d-flex'>
                                {selectedItem.firstPrice && (
                                    <h5 className='modal-info-2'>{selectedItem.firstPrice}₺</h5>
                                )}
                                <div className='discount'> 
                                    <h6 style={{fontSize:"0.7rem"}} className='m-0'>%20 İNDİRİM</h6>
                                </div>
                            </div>
                            <h4 className='modal-info-4'>{selectedItem.price}${selectedItem.month && (<span className='month'>/aylık</span>)}</h4>
                            <h6>Kredi kartına Ayda 12 Taksit!</h6>
                        </div>
                        <ul className='mt-4 ps-3'>
                            {selectedItem.info1 && (
                                <li>
                                    <h5 className='modal-info-3'>{selectedItem.info1}</h5>
                                </li>
                            )}
                            {selectedItem.info2 && (
                                <li>
                                    <h5 className='modal-info-3'>{selectedItem.info2}</h5>
                                </li>
                            )}
                            {selectedItem.info3 && (
                                <li>
                                    <h5 className='modal-info-3'>{selectedItem.info3}</h5>
                                </li>
                            )}
                            {selectedItem.info4 && (
                                <li>
                                    <h5 className='modal-info-3'>{selectedItem.info4}</h5>
                                </li>
                            )}
                        </ul>

                        <button onClick={purchaseService} className='satin-al mt-4 d-flex' type="">Satın Al</button>

                        
                        
                   </div>
                   <div className="col-6 m-auto d-flex justify-content-center">
                        <img className='service-img fadeIn' src={require(`../Assets/services/${selectedItem.image}`)} alt="" />
                   </div>
                   
                </div>
            </div>
        </div>
    
    );
    };

export default Plan1;