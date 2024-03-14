import React from 'react';

class DownloadButton extends React.Component {
  handleDownload = () => {
        // Define the path to the Excel file
        const filePath = process.env.PUBLIC_URL + "../../public/files.xlsx";
    
        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = filePath;
        a.download = 'example.xlsx'; // Specify the filename here
    
        // Trigger a click event to download the file
        a.click();
      };

  render() {
    return (
      <label onClick={this.handleDownload}>
        <i class="fa-regular fa-file"></i> Ürün Şablonunu İndirmek İçin Tıklayınız.
      </label>
    );
  }
}

export default DownloadButton;