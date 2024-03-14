import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../Assets/logo-renkli.png";
import { toast } from 'react-toastify';
import { loginUser, registerEarlyUser } from '../ApiService';
import { useDispatch } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import { successNotification, warningNotification } from '../Modals/Notification';

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleMail = (event) => {
    setMail(event.target.value);
  }
  const handlePhone = (event) => {
    setPhone(event.target.value);
  }
 


const handleRegisterEarlyUser = async () => {
  try {
    // Call the registerEarlyUser function with the user's data
    const response = await registerEarlyUser(mail, username, phone);
    if(response.status===200){
      successNotification("Kayıt başarılı")
    }
    else if(response.status===403){
      warningNotification("Bu mail adresi sistemimize kayıtlıdır")
    }
    console.log('Early user registered successfully:', response);
    // Handle success
  } catch (error) {
    console.error('Error registering early user:', error);
    // Handle error
  }
};
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    //GEREKLİ USERNAME PASSWORD CONSTRAINTS
    if (!emailRegex.test(mail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    handleRegisterEarlyUser();
  };

  
  return (
    
    
    <div className="App row m-0">
      <div className="col-12 col-lg-5 ">
        <div className="login-container d-flex d-lg-flex justify-content-center">
          <div className="wrapper ">
            <div className="title"><img src={logo} className="login-logo" alt="VevüzeLogo" /></div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={username} 
                      onChange={handleUsername} 
                      type="text" 
                      placeholder="Adınız ve Soyadınız"
                      maxLength={30} // Set maximum number of digits to 10
                      title="Please enter only digits"
                      required />
              </div>
              <div className="row">
                <i class="fa-solid fa-at"></i>
                <input 
                    value={mail} 
                    onChange={handleMail} 
                    type="email" 
                    placeholder="E-postanız" 
                    maxLength={30}
                    required />
              </div>
              <div className="row">
                <i class="fa-solid fa-phone"></i>
                <input value={phone} 
                        onChange={handlePhone} 
                        type="text" 
                        placeholder="Telefonunuz"
                        required />
              </div>
              <div className="row button">
                <input type="submit" value="Kayıt Ol" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-6">
      </div>
    </div>
  );
}

export default Register;
