import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../Assets/logo-renkli.png";
import { toast } from 'react-toastify';
import { loginUser } from '../ApiService';
import { useDispatch } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import { successNotification } from '../Modals/Notification';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };




  const handleLogin = async () => {
    try {
      const result = await loginUser(username, password);
      
      if (result && result.access_token) {
        console.log('Login successful!', result);
        sessionStorage.setItem("token", result.access_token);
        dispatch(fetchAllRedux())
        successNotification("BAŞARIYLA GİRİŞ YAPILDI!")
        setTimeout(() => {
          navigate("/Panel");
        }, 400);
      } else {
        console.error('Login failed:', result);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
    
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    //GEREKLİ USERNAME PASSWORD CONSTRAINTS
    if (!emailRegex.test(username)) {
      alert('Please enter a valid email address');
      return;
    }
    if (password.length < 1) {
      alert('Password should be at least 8 characters long');
      return;
    }
    
    handleLogin();
  };

  
  return (
    
    
    <div className="App row m-0">
      <div className="col-12 col-lg-5">
        <div className="login-container d-flex d-lg-block justify-content-center">
          <div className="wrapper">
            <div className="title"><img src={logo} className="login-logo" alt="VevüzeLogo" /></div>
            <form action="#">
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={username} onChange={handleUsername} type="email" placeholder="E-posta veya Telefon*" required />
              </div>
              <div className="row">
                <i className="fas fa-lock"></i>
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifre*"
                  required
                />
                <i
                  className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  id="togglePassword"
                  onClick={handleTogglePassword}
                ></i>
              </div>
              <div className="pass"><a href="#">Şifremi Unuttum</a></div>
              <div className="row button">
                <input onClick={handleSubmit} type="submit" value="Giriş Yap" />
              </div>
              <div className="pass" onClick={()=>navigate("/kayit")}><a href="">Hala VezüPort ile tanışmadın mı? Buraya tıklayarak erken kayıt olabilirsin.</a></div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-6">
      </div>
    </div>
  );
}

export default Login;
