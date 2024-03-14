import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import Modal from "../Modals/Product-Modal";
import info from "../Assets/ürün.jpg";
import { addProductToUser, deleteProduct } from '../ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../redux/features/productdata/productSlice';
import fetchAllRedux from '../redux/fetchAllRedux';
import { useNavigate } from 'react-router-dom';
import { successNotification, warningNotification } from '../Modals/Notification';
import UserPage from '../Modals/UserPage';
import ConfirmDeleteModal from '../Modals/Delete';

function Products() {

    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
   //------------------------------------------------------------------------------
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();


    const {product} = useSelector((state) => state.product);
   //------------------------------------------------------------------------------

   //------------------------------------------------------------------------------   

    const handleAddProductToUser = async (productsToAdd) => {
        console.log("handleAddProductToUser",productsToAdd)
        try {
          const result = await addProductToUser(accessToken, productsToAdd);
          if (result.status === 200) {
            console.log('Product added to user successfully!');
            successNotification("ÜRÜNLERİNİZ BAŞARIYLA EKLENDİ")
            dispatch(getProductData());
            setModalIsOpen(false)
          } else {
            warningNotification("LÜTFEN EXCEL DOSYASI YÜKLEYİNİZ")
            console.error('Failed to add product to user.');
          }
        }
        catch (error) {
          console.error('Error adding product to user:', error);
        }
      };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.size <= 30 * 1024 * 1024
      ) {
        handleAddProductToUser(file)
      } else {
        console.error('Invalid file. Please select a valid Excel file (xls, xlsx) and make sure it is 30MB or less.');
      }
    }
  };

 
  const handleProductDelete = async (productId) => {
    try {
      const result = await deleteProduct(accessToken, productId);
      if (result.status === 200) {
        console.log('Product deleted successfully!');
        successNotification("ÜRÜN BAŞARIYLA SİLİNDİ")
        dispatch(getProductData());
      } else {
        console.error('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

    const filteredProducts = product.filter(product =>
        product[5]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (x) => {
      setModalIsOpen(true);
  };
  
  const closeModal = () => {
      setModalIsOpen(false);
  };

  const handleClick = () => {
    openModal();
};
  



  return (
    <UserPage>
      
        <div className="row slideleft">
            <div className="col-12 col-lg-3 pe-3 ps-0 ms-0">
                <div className="pbg ps-3 pe-3">

                <div className="row p-search mx-auto mt-4 mb-0">
                    <div className="col-1 my-auto ms-2 p-0">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="col-8 p-0">
                        <input type="text" className='product-input' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Ürün Arayın'></input>
                    </div>
                    <div className="col-1 ps-auto m-auto">
                    
                        <div class="dropdown d-inline">
                            <button class="product-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-plus "></i>
                            </button>
                            <div class="dropdown-menu upload" aria-labelledby="dropdownMenuButton">
                                <div className="row product-dropdown">
                                    <div className="col-12 dropdown-item m-0">
                                        <form>
                                            <label htmlFor="file-upload" className="add-product">
                                                <i className="fa-solid fa-plus"></i> Dosya Yüklemek İçin Tıklayınız
                                            </label>
                                            <input id="file-upload" className="d-none" type="file" onChange={handleFileUpload} />
                                        </form>
                                    </div>

                                    <hr className='dropdown-divider' />
                                    
                                    <div className="col-12 dropdown-item m-0">
                                        <Modal/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 p-0 product-list-container">
                        <ul className='product-list'>
                            {filteredProducts.map((product, index) => (
                                <li
                                    key={product[1]} // Assuming index 1 contains the product ID
                                    className={`product-item ${selectedProduct === index ? 'product-active' : ''}`}
                                    onClick={() => setSelectedProduct(index)}
                                >
                                    {product[5]} {/* Assuming index 5 contains the product name */}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div className="col-12 col-lg-8 pbg ps-2">
            {product.length === 0 && <img src={info} alt="" className='fadeIn' id='add-product-info'/>}
            {(selectedProduct !== null && selectedProduct >= 0 && selectedProduct < filteredProducts.length) && (
                <div className='slideleft'>
                    <p className='profile-title'>Firma Stok Kodu: {filteredProducts[selectedProduct][4]}</p>
                    <div className="row ps-3 mt-4">
                        <div className="col-3 image-wrap">
                            <img id="product-image" src={filteredProducts[selectedProduct][13]} alt="" />
                        </div>
                        <div className="col-9 ps-5">
                            <div>
                                <h4 className='mb-1' > {filteredProducts[selectedProduct][5]}</h4>
                                <h5 className='my-3'>{filteredProducts[selectedProduct][12]}₺</h5>
                                <hr style={{margin:"0 15rem 1rem 0"}}/>
                                <h6 className='my-4'>{filteredProducts[selectedProduct][6]}</h6>
                            </div>
                            <div className='d-flex justify-content-end pe-4'>
                                <button className='buton2' onClick={handleClick} >Bu Ürünü Sil</button>
                            </div>
                            <ConfirmDeleteModal
                              isOpen={modalIsOpen}
                              closeModal={closeModal}
                              onDelete={() => handleProductDelete(filteredProducts[selectedProduct][1])} // Ensure it's a function
                            />

                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
    </UserPage>
  );
}

export default Products;


