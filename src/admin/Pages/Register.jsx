import React, { useState } from 'react';
import { UserData } from '../Assets/Mockdata';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../Assets/logo-renkli.png";
import { toast } from 'react-toastify';

function Login() {
  localStorage.setItem('id', null);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [registerMail, setRegisterMail] = useState('');
  const [registerPassword, setregisterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterEmailChange = (event) => {
    setRegisterMail(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setregisterPassword(event.target.value);
  }
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  

  const notify = () => toast.success("Başarıyla Kayıt Olundu",{
    position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    notify();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  };
  

  return (
    <div className="App row m-0">
      <div className="col-5">
        <div className="login-container">
          <div className="wrapper">
            <div className="title"><img src={logo} className="login-logo" alt="VevüzeLogo" /></div>
            <form action="#">
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={name} onChange={handleRegisterEmailChange} type="text" placeholder="Adınız" required />
              </div>
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={surname}  type="text" placeholder="Soyadınız" required />
              </div>
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={registerMail}  type="email" placeholder="E-posta" required />
              </div>
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={registerMail}  type="email" placeholder="Telefon" required />
              </div>
              <div className="row">
                <i className="fas fa-user"></i>
                <input value={registerMail}  type="email" placeholder="Şirket Ünvanı" required />
              </div>
              <div className="row">
                <i className="fas fa-lock"></i>
                <input
                  value={registerPassword}
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
                <input onClick={handleSubmit} type="submit" value="Giriş Yap"/>
              </div>
              <div className="signup-link">Hala VezüPort ile tanışmadın mı? <a href="#">Hemen bizimle iletişime geçebilirsin.</a></div>
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
