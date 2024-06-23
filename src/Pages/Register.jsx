import React, { useState } from "react";
import "../App.css";
import logo from "../Assets/logo-renkli.png";
import { registerEarlyUser, registerUser } from "../ApiService";
import { successNotification, warningNotification } from "../Modals/Notification";
import Lottie from "lottie-react";
import check from "../Assets/animations/check.json";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";

function Register() {

  /* mail (str)
  şifre (str hashli sha256)
  telefon (str)
  İsim-soyisim (str)
  Şirket adı (str)
 */

  const [username, setUsername] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerpassword, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleCompanyname = (event) => {
    setCompanyname(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleMail = (event) => {
    let temp = event.target.value.trim();
    setMail(temp);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhone = (event) => {
    const value = event.target.value.trim();
    setPhone(value);
  };
  
  const handleRegisterUser = async () => {
    try {
      const response = await registerUser(
        mail,
        registerpassword,
        phone,
        username,
        companyname
      );
      if (response.status === 200) {
        navigate("/");
        successNotification("Kaydınız başarıyla oluşturuldu!");
      } else if (response.status === 403) {
        warningNotification("Bu mail adresi sistemimize kayıtlıdır");
      }
      console.log("QQQQerror user registered successfully:");
    } catch (error) {
      console.error("QQQQerror registering early user:", error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[1-9][0-9]{9}$/;
  
    // Validate email
    if (!emailRegex.test(mail)) {
      warningNotification("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }
  
    // Validate phone number
    if (!phoneRegex.test(phone)) {
      warningNotification("Lütfen geçerli bir telefon numarası giriniz. Telefon numarası 0 ile başlamamalı ve 10 haneli olmalıdır.");
      return;
    }
  
    handleRegisterUser();
  };
  
  return (
    <div className="App row m-0">
      <div className="col-12 col-lg-5 ">
        {isRegister ? (
          <>
            <div className="info-container d-flex d-lg-block justify-content-center">
              <div className="info-modal text-center">
                <Lottie
                  style={{ height: "100px" }}
                  loop={false}
                  animationData={check}
                />
                <p className="m-0">
                  Vezuporta kayıt olduğunuz için teşekkür ederiz. Bilgileriniz
                  kontrol edildiğinde sizi bilgilendireceğiz.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login-container d-flex d-lg-block justify-content-center">
              <div className="wrapper ">
                <div className="title">
                  <img src={logo} className="login-logo" alt="VevüzeLogo" />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <i className="fas fa-user"></i>
                    <input
                      value={username}
                      onChange={handleUsername}
                      type="text"
                      placeholder="Adınız ve Soyadınız"
                      maxLength={30}
                      title="Adınız ve Soyadınız"
                      required
                    />
                  </div>
                  <div className="row">
                    <i class="fa-solid fa-at"></i>
                    <input
                      value={mail}
                      onChange={handleMail}
                      type="text"
                      placeholder="E-postanız"
                      title="E-postanız"
                      maxLength={60}
                      required
                    />
                  </div>
                  <div className="row">
                    <i class="fa-solid fa-building"></i>
                    <input
                      value={companyname}
                      onChange={handleCompanyname}
                      type="text"
                      placeholder="Şirket İsmi"
                      title="Şirket İsmi"
                      maxLength={30}
                      required
                    />
                  </div>
                  <div className="row">
                    <i class="fa-solid fa-phone"></i>
                    <input
                      value={phone}
                      onChange={handlePhone}
                      type="text"
                      placeholder="Telefonunuz"
                      title="Telefonunuz"
                      maxLength={15}
                      required
                    />
                  </div>
                  <div className="row">
                  <i className="fas fa-lock"></i>
                  <input
                    value={registerpassword}
                    onChange={handlePassword}
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
                <div className="">
                  <p onClick={()=>navigate("/")} style={{cursor:"pointer"}}>Kaydınız varsa, buradan giriş yapabilirsiniz</p>
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
      <div className="col-6"></div>
    </div>
  );
}

export default Register;

