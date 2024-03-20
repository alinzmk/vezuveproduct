import React, { useState } from 'react';
import '../App.css';
import logo from "../Assets/logo-renkli.png";
import { registerEarlyUser } from '../ApiService';
import { warningNotification } from '../Modals/Notification';
import Lottie from 'lottie-react';
import check from '../Assets/animations/check.json';

function Register() {

  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegister, setIsRegister] = useState(false); 

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleMail = (event) => {
    let temp = event.target.value.trim()
    setMail(temp);
  }
  const handlePhone = (event) => {
    const value = event.target.value.trim();
    // Validate if the input is a number
    if (!isNaN(value) || value === '') {
      setPhone(value);
    }
  }

const handleRegisterEarlyUser = async () => {
  try {
    // Call the registerEarlyUser function with the user's data
    const response = await registerEarlyUser(mail, username, phone);
    if(response.status===200){
      setIsRegister(true)
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
      warningNotification("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }
    
    handleRegisterEarlyUser();
  };

  
  return (
    
    
    <div className="App row m-0">
      <div className="col-12 col-lg-5 ">
        {isRegister ?(
          <>
            <div className='info-container d-flex d-lg-block justify-content-center'>
              <div className="info-modal text-center">
                <Lottie style={{height:"100px"}} loop={false} animationData={check}/>
                <p className='m-0'>Vezuporta kayıt oluşturduğunuz için teşekkür ederiz. Uygulamamız yayınlandığında sizi bilgilendireceğiz.</p>
              </div>
            </div>
          </>
        ):(
          <>
          <div className="login-container d-flex d-lg-block justify-content-center">
            <div className="wrapper ">
             
              <div className="title"><img src={logo} className="login-logo" alt="VevüzeLogo" /></div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <i className="fas fa-user"></i>
                  <input value={username} 
                        onChange={handleUsername} 
                        type="text" 
                        placeholder="Adınız ve Soyadınız"
                        maxLength={30}
                        title="Adınız ve Soyadınız"
                        required />
                </div>
                <div className="row">
                  <i class="fa-solid fa-at"></i>
                  <input 
                      value={mail} 
                      onChange={handleMail} 
                      type="text" 
                      placeholder="E-postanız" 
                      title="E-postanız"
                      maxLength={30}
                      required />
                </div>
                <div className="row">
                  <i class="fa-solid fa-phone"></i>
                  <input value={phone} 
                          onChange={handlePhone} 
                          type="text" 
                          placeholder="Telefonunuz"
                          title="Telefonunuz"
                          maxLength={15}
                          required />
                </div>
                <div className="row button">
                  <input type="submit" value="Kayıt Ol" />
                </div>
              </form>
            </div>
            </div>
          </>
        )}
        
      </div>
      <div className="col-6">
      </div>
    </div>
  );
}

export default Register;
