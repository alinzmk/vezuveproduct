import '../App.css';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loading from '../Assets/animations/loading.json';
import { useNavigate } from 'react-router-dom';
import { stripePaymentReturn } from '../ApiService';


function Stripe() {

    const accessToken = sessionStorage.getItem("token");
    const newPackageProductID = sessionStorage.getItem("ckg");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }

    const [source, setSource] = useState(null)
    
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get('source');
      setSource(srcParam); // Update the state with srcParam value
    }, []); 
  
    useEffect(() => {
      // This useEffect will run every time 'source' changes
      if (source !== null) {
        processStripePaymentReturn();

      }
    }, [source]); // Depend on 'source'
  
    

    const processStripePaymentReturn = async () => {
      try {
        const response = await stripePaymentReturn(accessToken, source, newPackageProductID);
        navigate("/Panel")
        console.log('Stripe payment return processed:', response);
      } catch (error) {
        console.error('Error processing stripe payment return:', error);
      }
    };
  
  return (
    <>
      <section>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <div className='col-12 justify-content-center text-center'>
                Lütfen Bekleyiniz... <br/>
                <Lottie style={{height:"100px"}} loop={true} animationData={loading}/>
                İşleminiz Gerçekleştiriliyor.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



export default Stripe;


