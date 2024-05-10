import React from 'react';
import { getDefaultProductList } from '../ApiService';

class DownloadButton extends React.Component {
   downloadDefaultProductList = async () => {
    try {
      await getDefaultProductList();
      console.log('Default product list downloaded successfully');
    } catch (error) {
      console.error('Error downloading default product list:', error);
      // Handle error
    }
  };
  render() {
    return (
      <label onClick={this.downloadDefaultProductList}>
        <i class="fa-regular fa-file"></i> Ürün Şablonunu İndirmek <br/> İçin Tıklayınız.
      </label>
    );
  }
}

export default DownloadButton;