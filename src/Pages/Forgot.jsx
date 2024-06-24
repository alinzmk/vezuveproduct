import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../Assets/logo-renkli.png";
import { forgotPassword, loginUser, resetPassword } from '../ApiService';
import { useDispatch } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import { successNotification, warningNotification } from '../Modals/Notification';

function Forgot() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isForgot, setIsForgot] = useState(false);


  const location = useLocation();
  
  // Function to extract token from URL
  const getTokenFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  }

  const token = getTokenFromURL();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  
    const handleResetPassword = async () => {
      try {
        const data = await resetPassword(token, password);
        if (data) {
          successNotification("Şifreniz başarıyla değiştirildi")
          console.log('Password reset successfully');
          navigate("/")
        } else {
          console.log('Failed to reset password');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();


    if (password.length < 1) {
      warningNotification('Password should be at least 8 characters long');
      return;
    }
    
    handleResetPassword();
  };


  
  return (
    
    
    <div className="App row m-0">
      <div className="col-12 col-lg-5">
        <div className="login-container d-flex d-lg-block justify-content-center">
          <div className="wrapper">
            <div className="title"><img src={logo} className="login-logo" alt="VevüzeLogo" /></div>

              <>
                <form action="#">
                  <div className="pass mb-2"><h5>Yeni şifrenizi giriniz</h5></div>
                  <div className="row">
                    <i className="fas fa-lock"></i>
                    <input
                      value={password}
                      onChange={handlePasswordChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Şifre*"
                      required
                    />
                  </div>
                  <div className="row button">
                    <input onClick={handleSubmit} type="submit" value="Şifremi Yenile" />
                  </div>
                </form>
              </>
            
          </div>
        </div>
      </div>
      <div className="col-6">
      </div>
    </div>
  );
}

export default Forgot;
