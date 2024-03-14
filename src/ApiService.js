import axios from 'axios';
import { warningNotification } from './Modals/Notification';
const BASE_URL = 'https://userapi.vezuport.com';


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user_token`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );
    return response.data;
  } catch (error) {
    warningNotification("GİRİŞ BAŞARISIZ")
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const registerEarlyUser = async (mail, name, phone) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/register_early_user?mail=${mail}&name=${name}&phone=${phone}`,
      // No need to send data in the request body
      {
        headers: {
          'Content-Type': 'application/json', // Specify the content type if needed
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering early user:', error);
    throw error;
  }
};

export const getUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_data`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const setUserData = async (accessToken, column, newValue) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_data`,
      {
        column,
        newValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting user data:', error);
    throw error;
  }
};

export const getUserPlan = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_plan`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user plan:', error);
    throw error;
  }
};

export const getUserPortfolio = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_portfolio`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user portfolio:', error);
    throw error;
  }
};

export const getUserDocuments = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_documents`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user documents:', error);
    throw error;
  }
};

export const uploadDocument = async (accessToken, fileName, file) => {
  console.log("APİ İÇİNDEKİ DATA",fileName, accessToken, file)
  try {
    // Check file type
    if (file.type !== 'application/pdf') {
      warningNotification("LÜTFEN PDF YÜKLEYİNİZ")
      throw new Error('Invalid file type. Only PDF files are allowed.');
    }

    // Check file size (max size: 20 MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 20 MB.');
    }
    const formData = new FormData();
    formData.append('file_name', fileName);
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/upload_document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// DOKUNMA ZOR AYAKTA DURUYOR
export const downloadDocument = async (accessToken, fileName) => {
  console.log(fileName, accessToken)
  try {
    const response = await axios.get(`http://userapi.vezuport.com/download_document?file_name=${fileName}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading document:', error);
  }
};

export const getUserProducts = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_products`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user products:', error);
    throw error;
  }
};


export const addProductToUser = async (accessToken, file) => {
  
  console.log("token", accessToken)
  console.log("api file",file)
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/add_product_to_user`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (accessToken, productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete_product/${productId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
export const getUserTasks = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_tasks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user tasks:', error);
    throw error;
  }
};

export const getMarketFinder = async (accessToken, requestData) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_market_finder`, 
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: requestData,
    });

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log("wow");
    console.error('Error fetching market finder data in API:', error);
    throw error;
  }
};

export const createPaymentLink = async (accessToken, productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/create_payment_link`, {
      product_id: productId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};