import { useEffect, useState } from "react";
import Modal from "../Modals/Product-Modal";
import info from "../Assets/ürün.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProductDetailLink,
  addProductToUser,
  deleteProduct,
  deleteProductDetailLink,
  getProductDetailLink,
  getUserProductsAsExcel,
} from "../AdminApiService";
import {
  successNotification,
  warningNotification,
} from "../../Modals/Notification";
import { getProductAdmin } from "../../redux/features/adminproduct/productAdminSlice";
import fetchAdminRedux from "../../redux/fetchAdminRedux";
import AdminPage from "../Modals/AdminPage";
import ConfirmDeleteModal from "../Modals/Delete";

function Products() {
  const accessToken = sessionStorage.getItem("token");
  const customerID = sessionStorage.getItem("selectedCustomer");
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/");
  }
  //------------------------------------------------------------------------------
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { productadmin } = useSelector((state) => state.productadmin);
  const { productdetailadmin } = useSelector(
    (state) => state.productdetailadmin
  );
  //------------------------------------------------------------------------------

  //------------------------------------------------------------------------------

  const handleAddProductToUser = async (productsToAdd) => {
    try {
      const result = await addProductToUser(
        productsToAdd,
        customerID,
        accessToken
      );
      if (result.status === 200) {
        console.log("Product added to user successfully!");
        successNotification("ÜRÜNLERİNİZ BAŞARIYLA EKLENDİ");
        dispatch(getProductAdmin());
      } else {
        warningNotification("LÜTFEN EXCEL DOSYASI YÜKLEYİNİZ");
        console.error("Failed to add product to user.");
      }
    } catch (error) {
      console.error("Error adding product to user:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 30 * 1024 * 1024) {
        handleAddProductToUser(file);
      } else {
        console.error(
          "Invalid file. Please select a valid Excel file (xls, xlsx) and make sure it is 30MB or less."
        );
      }
    }
  };

  const [productName, setProductName] = useState('');

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDelete = async (productId) => {
    try {
      const result = await deleteProduct(productId, customerID, accessToken);
      if (result.status === 200) {
        console.log("Product deleted successfully!");
        successNotification("ÜRÜN BAŞARIYLA SİLİNDİ");
        dispatch(getProductAdmin());
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDownloadUserProductsAsExcel = async () => {
    try {
      await getUserProductsAsExcel(customerID, accessToken);
    } catch (error) {
      console.error("Error downloading user products as Excel:", error);
      // Handle error
    }
  };

  const filteredProducts =
    productadmin?.userProducts?.filter((product) =>
      product[5]?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  useEffect(() => {
    if (!productadmin || productadmin.length === 0) {
      dispatch(fetchAdminRedux());
    }
  }, [dispatch, productadmin]);

  const openModal = (x) => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = () => {
    openModal();
  };

  const handleAddProductDetailLink = async () => {
    try {
      const data = await addProductDetailLink(
        accessToken,
        customerID,
        productName
      );
      if (data) {
        dispatch(fetchAdminRedux());
        console.log("Product detail link added successfully");
      } else {
        console.log("Failed to add product detail link");
      }
    } catch (error) {
      console.error("Error adding product detail link:", error);
    }
  };

  const handleDeleteProductDetailLink = async () => {
    try {
      const data = await deleteProductDetailLink(accessToken, customerID);
      if (data) {
        dispatch(fetchAdminRedux());
        console.log("Product detail link deleted successfully");
      } else {
        console.log("Failed to delete product detail link");
      }
    } catch (error) {
      console.error("Error deleting product detail link:", error);
    }
  };

  return (
    <>
      <AdminPage pageName={"Ürünler"}>
        <section className="urunler">
          <div className="row slideleft">
            <div className="col-12 mb-3">
                {productdetailadmin.data ? (
                    <>
                        <div onClick={()=>handleDeleteProductDetailLink()} style={{cursor:"pointer"}}>
                            {productdetailadmin.data} <br />
                            Silmek için tıklayın
                        </div>
                    </>
                ):(
                    <>
                        <div>
                            <label htmlFor="productName">Product Detail Link giriniz:</label>
                            <input
                                style={{width:"500px"}}
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={handleProductNameChange}
                            />
                            <button onClick={()=>handleAddProductDetailLink()}>SET</button>
                        </div>
                    </>
                )}
            </div>
            <div className="col-3 pe-3 ps-0 ms-0">
              <div className="pbg ps-3 pe-3">
                <div class="row p-search mx-auto mt-4 mb-0 align-items-center">
                  <div class="col-1 my-auto p-0">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div class="col-6 p-0">
                    <input
                      type="text"
                      class="product-input form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ürün Arayın"
                    />
                  </div>
                  <div class="col-5 d-flex justify-content-end">
                    <button
                      onClick={handleDownloadUserProductsAsExcel}
                      class="product-btn mx-1"
                    >
                      <i class="fa-solid fa-cloud-arrow-down"></i>
                    </button>
                    <div class="dropdown d-inline">
                      <button
                        class="product-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-plus "></i>
                      </button>
                      <div
                        class="dropdown-menu upload"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div className="row product-dropdown">
                          <div className="col-12 dropdown-item m-0">
                            <form>
                              <label
                                htmlFor="file-upload"
                                className="add-product"
                              >
                                <i className="fa-solid fa-plus"></i> Dosya
                                Yüklemek İçin Tıklayınız
                              </label>
                              <input
                                id="file-upload"
                                className="d-none"
                                type="file"
                                onChange={handleFileUpload}
                              />
                            </form>
                          </div>

                          <hr className="dropdown-divider" />

                          <div className="col-12 dropdown-item m-0">
                            <Modal />
                          </div>
                          <hr className="dropdown-divider" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-12 p-0 product-list-container">
                    <ul className="product-list">
                      {filteredProducts.map((product, index) => (
                        <li
                          key={product[1]} // Assuming index 1 contains the product ID
                          className={`product-item ${
                            selectedProduct === index ? "product-active" : ""
                          }`}
                          onClick={() => setSelectedProduct(index)}
                        >
                          {product[5]}{" "}
                          {/* Assuming index 5 contains the product name */}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 pbg ps-2">
              {productadmin.userProducts?.length === 0 && (
                <img
                  src={info}
                  alt=""
                  className="fadeIn"
                  id="add-product-info"
                />
              )}
              {selectedProduct !== null &&
                selectedProduct >= 0 &&
                selectedProduct < filteredProducts.length && (
                  <div className="slideleft">
                    <p className="profile-title">
                      Firma Stok Kodu: {filteredProducts[selectedProduct][4]}
                    </p>
                    <div className="row ps-3 mt-4">
                      <div className="col-3 image-wrap">
                        <img
                          id="product-image"
                          src={filteredProducts[selectedProduct][13]}
                          alt=""
                        />
                      </div>
                      <div className="col-9 ps-5">
                        <div>
                          <h4 className="mb-1">
                            {" "}
                            {filteredProducts[selectedProduct][5]}
                          </h4>
                          <h5 className="my-3">
                            {filteredProducts[selectedProduct][12]}₺
                          </h5>
                          <hr style={{ margin: "0 15rem 1rem 0" }} />
                          <h6 className="my-4">
                            {filteredProducts[selectedProduct][6]}
                          </h6>
                        </div>
                        <div className="d-flex justify-content-end pe-4">
                          <button className="buton2" onClick={handleClick}>
                            Bu Ürünü Sil
                          </button>
                        </div>
                        <ConfirmDeleteModal
                          isOpen={modalIsOpen}
                          closeModal={closeModal}
                          onDelete={() =>
                            handleProductDelete(
                              filteredProducts[selectedProduct][1]
                            )
                          } // Ensure it's a function
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </section>
      </AdminPage>
    </>
  );
}

export default Products;
