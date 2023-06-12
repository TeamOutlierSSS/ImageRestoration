import React, { useState } from 'react';
import '../styles/container.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from './Loading';

const Container = () => {
  const [userImage, setUserImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage(reader.result);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    try {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      };

      const response = await axios.post('/api/upload', formData, config);

      if (response.status === 200) {
        const processedImageUrl = await response.data.fileName;
        setProcessedImage(processedImageUrl);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload failed', error);
    }
    setLoading(false);
  };

  const handleDownloadBtn = (filePath) => {
    axios.get(`/api/download/${filePath}`);
    window.location.assign(`/api/download/${filePath}`);
  };

  return (
    <div className='layout'>
      <Header />
      <main>
        {/* WIP - loader */}
        {loading && <Loading />}
        <div className='container'>
          <div className='imageContainer'>
            <div className='img_title'>
              <span className='placeholder'>Uploaded Image</span>
            </div>
            <div className='img_wrapper'>
              {userImage ? (
                <img src={userImage} alt='User Uploaded' />
              ) : (
                <label htmlFor='image' className='img_dne'>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} className='upload_icon' />
                  Upload Your Image Here
                </label>
              )}
              <input type='file' accept='image/*' onChange={handleImageUpload} id='image' />
            </div>
          </div>

          <div className='imageContainer'>
            <div className='img_title'>
              <span className='placeholder'>Processed Image</span>
            </div>
            <div className='img_wrapper'>
              {processedImage ? (
                <img src={`img/${processedImage}`} alt='Processed' />
              ) : (
                <div className='img_dne'>
                  <span className='img_dne_text'>No Processed Image Found</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='btn_container'>
          {/* {processedImage && (
            <a
              download
              className='download_btn'
              href={process.env.PUBLIC_URL + `public/img/${processedImage}`}
              target='_blank'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faFileArrowDown} className='btn_icon' />
              Download
            </a>
          )} */}
          {processedImage && (
            <button className='download_btn' onClick={() => handleDownloadBtn(processedImage)}>
              <FontAwesomeIcon icon={faFileArrowDown} className='btn_icon' />
              Download
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Container;
