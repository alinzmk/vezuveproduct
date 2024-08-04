import axios from 'axios';
import { warningNotification } from './Modals/Notification';
import { SHA256 } from 'crypto-js';
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

export const registerUser = async (mail, password, phone, name, companyname) => {
  let hash = SHA256(password).toString();
  try {
    const response = await axios.post(
      `${BASE_URL}/register_new_user`,
      {
        mail: mail,
        password: hash,
        phone: phone,
        name: name,
        companyName: companyname
      },
      {
        headers: {
          'Content-Type': 'application/json', // Specify the content type if needed
        },
      }
    );
    console.log(response)
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
  try {
    const response = await axios.get(`https://userapi.vezuport.com/download_document?file_name=${fileName}`, {
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

    return response.data;

  } catch (error) {
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

export const getAllPartnerData = async (accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_all_partner_data`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all partner data:', error);
    throw error;
  }
};

export const sendPartnerMail = async (accessToken, toId) => {
  toId = parseInt(toId)
  try {
    const response = await axios.post(
      `${BASE_URL}/send_partner_mail`,
      { to_id: toId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending partner mail:', error);
    throw error;
  }
};

export const getAllPackages = async (accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_all_packages`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting all packages:', error);
    throw error;
  }
};

export const stripePaymentReturn = async (accessToken, cameFrom, newPackageProductID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/stripe_payment_return?cameFrom=${cameFrom}&newPackageProductID=${newPackageProductID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error processing stripe payment return:', error);
    throw error;
  }
};

export const getDefaultProductList = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get_default_product_list`,
      { responseType: 'blob' } // Set responseType to 'blob' to handle binary data
    );
    
    // Create a blob URL for the downloaded file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'default_product_list.xlsx'); // Set the filename
    document.body.appendChild(link);
    link.click();
    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading default product list:', error);
    // Handle error
  }
};

export const getMarketRequirements = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_market_requirements`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
      return response.data
    
  } catch (error) {
    console.error('Error fetching market requirements:', error);
    // Handle error
  }
};

export const setMarketRequirements = async (accessToken, requirement, isAdded) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_market_requirements`,
      {
        requirement: requirement,
        isAdded: isAdded
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Market requirement successfully set');
    } else {
      console.error('Failed to set market requirement:', response.statusText);
    }
  } catch (error) {
    console.error('Error setting market requirement:', error);
  }
};


export const getAnnouncements = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_announcements`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Replace accessToken with your actual access token
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error('Failed to fetch announcements:', response.statusText);
      return null; // Or handle error accordingly
    }
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return null; // Or handle error accordingly
  }
};


export const forgotPassword = async (userMail) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot_password`, {
      user_mail: userMail,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to send password reset email:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return null;
  }
};


export const resetPassword = async (token, newPassword) => {
  let hash = SHA256(newPassword).toString();
  try {
    const response = await axios.post(`${BASE_URL}/reset_password`, {
      token: token,
      new_password: hash,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to reset password:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    return null;
  }
};


export const getProductDetailLink = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_product_detail_link`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
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