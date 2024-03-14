import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const Requirements = ({ isOpen, closeModal, fullData}) => {

  function upperCase(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  

  const navigate = useNavigate();

  function toServices(){
    const tab = fullData.selectedMarket.name.toLowerCase();
    sessionStorage.setItem("tab", JSON.stringify(tab))
    navigate("/Hizmetler");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Video Modal"
      style={
        {content: {
          width: "1100px",
          height: "auto",
          
          overflow: "none",
          margin: "auto",
          backgroundColor: "transparent",
          border: "none",
        },
        overlay:{
          backgroundColor: "rgba(0,0,0,0.6)"
        }
      }
      }
      >
        <div className='reqModal' style={{zIndex: "99"}}>
          <div className='reqWrapper pbg'>
              {fullData.selectedMarket ? (
                <div className="row">
                  <h3 className='reqTitle text-center'>{upperCase(fullData.selectedMarket.name)} için Pazar Gereklilikleri</h3>
                  <table className='reqTable m-auto'>
                  {fullData.selectedMarket.items2.map((item, index) => (
                    Object.entries(item).map(([key, value], innerIndex) => (
                        <tr key={index + innerIndex}>
                          <td className='column1'>{key}</td>
                          <td className='column2'>{value}</td>
                        </tr>
                    ))
                  ))}
                      </table>
                  <div className='mt-5' style={{textAlign: "center", fontSize: "1.1rem"}} >
                      <p className=' mb-2'>
                          {fullData.selectedMarket.buttonText}
                      </p>
                       <button className='satin-al' onClick={toServices}>Satışa Başla</button>
                  </div>
                </div>
              ) : (
                <p>ERROR</p>
              )}
              
            </div>
          
        </div>
    </Modal>
  );
};

export default Requirements;