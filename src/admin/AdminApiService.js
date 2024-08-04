import axios from "axios";
import { warningNotification } from "../Modals/Notification";
const BASE_URL = "https://adminapi.vezuport.com";

export const getAdminToken = async (username, password, totpCode) => {
  try {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('scope', totpCode);
    
    const response = await axios.post(`${BASE_URL}/admin_token`,params,
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    );
    console.log(response)
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to login:', response.statusText);
      return null;
    }
  } catch (error) {
    warningNotification("GİRİŞ BAŞARISIZ");
    console.error('Error during login:', error);
    return null;
  }
};


export const getAllUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_user_data`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all user data:", error);
    throw error;
  }
};

export const setUserData = async (
  column,
  newValue,
  customer_id,
  accessToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_data`,
      { column, newValue, customer_id }, // Data to send in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error setting user data:", error);
    throw error;
  }
};

export const getUserPortfolio = async (accessToken, customerId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_user_portfolio?customer_id=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
    throw error;
  }
};

export const getUserPlan = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_plan`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        customer_id: customerId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user plan:", error);
    throw error;
  }
};

export const setUserPlan = async (
  accessToken,
  customerId,
  column,
  newValue
) => {
  try {
    const url = `${BASE_URL}/set_user_plan?column=${column}&newValue=${newValue}&customer_id=${customerId}`;

    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error setting user plan:", error);
    throw error;
  }
};
export const getUserDocuments = async (accessToken, customerId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_user_documents?customer_id=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user documents:", error);
    throw error;
  }
};

export const uploadDocument = async (
  accessToken,
  fileName,
  file,
  customer_id
) => {
  try {
    // Check file type
    if (file.type !== "application/pdf") {
      warningNotification("LÜTFEN PDF YÜKLEYİNİZ");
      throw new Error("Invalid file type. Only PDF files are allowed.");
    }

    // Check file size (max size: 20 MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error("File size exceeds the maximum limit of 20 MB.");
    }
    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/upload_user_document?customer_id=${customer_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
export const downloadDocument = async (fileName, customerId, token) => {
  try {
    const fullUrl = `https://adminapi.vezuport.com/download_document?file_name=${fileName}&customer_id=${customerId}`;
    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Specify response type as blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response;
  } catch (error) {
    console.error("Hata:", error);
    return `Hata: ${error.message}`;
  }
};

// SET USER PLAN EKLENECEK

export const getUserTasks = async (accessToken, customerId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_user_tasks?customer_id=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    throw error;
  }
};

export const setUserTasks = async (
  taskName,
  column,
  newValue,
  customer_id,
  accessToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_tasks`,
      { taskName, column, newValue, customer_id }, // Data to send in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error setting user tasks:", error);
    throw error;
  }
};

export const createUserTask = async (customer_id, task_name, accessToken) => {
  customer_id = parseInt(customer_id);
  try {
    const response = await axios.post(
      `${BASE_URL}/create_user_task`,
      {
        customer_id,
        task_name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user task:", error);
    throw error;
  }
};

export const deleteUserTask = async (taskName, accessToken, customer_id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/delete_user_task?customer_id=${customer_id}&taskName=${taskName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user task:", error);
    throw error;
  }
};

export const getUserProducts = async (accessToken, customerId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_user_products?customer_id=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
};

export const addProductToUser = async (file, customer_id, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("customer_id", customer_id);

    const response = await axios.post(
      `${BASE_URL}/add_product_to_user`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding product to user:", error);
    throw error;
  }
};

export const deleteProduct = async (product_id, customer_id, accessToken) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete_product`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id: product_id,
        customer_id: customer_id,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateToUserSales = async (
  customer_id,
  month,
  sale_amount,
  accessToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update_to_user_sales`,
      { customer_id, month, sale_amount }, // Data to send in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user sales:", error);
    throw error;
  }
};

export const updateToUserAds = async (
  customer_id,
  month,
  ads_amount,
  accessToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update_to_user_ads`,
      { customer_id, month, ads_amount }, // Data to send in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user sales:", error);
    throw error;
  }
};

export const updateToUserSalesUnit = async (
  customer_id,
  month,
  sale_unit_amount,
  accessToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update_to_user_sales_unit`,
      { customer_id, month, sale_unit_amount }, // Data to send in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user sales:", error);
    throw error;
  }
};

export const getUserProductsAsExcel = async (customerId, accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_user_products_as_excel?customer_id=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob", // Specify the response type as blob to handle binary data
      }
    );
    // Create a blob URL for the Excel file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_products.xlsx");
    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
    // Cleanup
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error("Error fetching user products as Excel:", error);
    // Handle error
  }
};

export const getMarketRequirements = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_market_requirements`, {
      params: {
        customer_id: customerId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`, // Replace accessToken with your actual access token
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        "Failed to fetch market requirements:",
        response.statusText
      );
      return null; // Or handle error accordingly
    }
  } catch (error) {
    console.error("Error fetching market requirements:", error);
    return null; // Or handle error accordingly
  }
};

export const setMarketRequirements = async (
  accessToken,
  requirement,
  isAdded,
  customerId
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_market_requirements`,
      {
        requirement: requirement,
        isAdded: isAdded,
        customer_id: customerId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Check if the request was successful
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to set market requirements:", response.statusText);
      return false; // Or handle error accordingly
    }
  } catch (error) {
    console.error("Error setting market requirements:", error);
    return false; // Or handle error accordingly
  }
};

export const getAnnouncements = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_announcements`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch announcements:', response.statusText);
      return null; // Or handle error accordingly
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return null; // Handle error accordingly
  }
};

export const addAnnouncement = async (accessToken, announcement) => {
  try {
    const response = await axios.post(`${BASE_URL}/add_announcement`, 
      { announcement }, // Sending announcement in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 200) {
      return true;
    } else {
      console.error('Failed to add announcement:', response.data.message || response.statusText);
      return false; // Handle error accordingly
    }
  } catch (error) {
    console.error('Error adding announcement:', error);
    return false; // Handle error accordingly
  }
};

export const deleteAnnouncement = async (accessToken, announcementId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete_announcement?announcement_id=${announcementId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.status === 200 && response.data.status === 200) {
      return true;
    } else {
      console.error('Failed to delete announcement:', response.data.message || response.statusText);
      return false; // Handle error accordingly
    }
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return false; // Handle error accordingly
  }
};

export const addProductDetailLink = async (token, customerId, link) => {
  try {
    const response = await axios.post(`${BASE_URL}/add_product_detail_link`, 
      {
        customer_id: customerId,
        link: link,
      }
      ,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add product detail link:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error adding product detail link:', error);
    return null;
  }
};

export const getProductDetailLink = async (token, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_product_detail_link?customer_id=${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get product detail link:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting product detail link:', error);
    return null;
  }
};


export const deleteProductDetailLink = async (accessToken, customerId) => {
  console.log()
  try {
    const response = await axios.delete(`${BASE_URL}/delete_product_detail_link?customer_id=${customerId}`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      },);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to delete product detail link:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error deleting product detail link:', error);
    return null;
  }
};
