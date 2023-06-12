import React, { useState } from 'react';
import '../styles/container.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowDown,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
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
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
      console.log(formData.get('image'))
      const response = await axios.post('/api/upload', formData, config);

      if (response.ok) {
        const processedImageUrl = await response.json();
        setProcessedImage(processedImageUrl);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload failed', error);
    }

    setLoading(false);
  };

  return (
    <div className='layout'>
      <Header />
      <main>
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
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className='upload_icon'
                  />
                  Upload Your Image Here
                </label>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                id='image'
              />
            </div>
          </div>

          <div className='imageContainer'>
            <div className='img_title'>
              <span className='placeholder'>Processed Image</span>
            </div>
            <div className='img_wrapper'>
              {processedImage ? (
                <img src={processedImage} alt='Processed' />
              ) : (
                <div className='img_dne'>
                  <span className='img_dne_text'>No Processed Image Found</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='btn_container'>
          {processedImage && (
            <a className='download_btn' href={processedImage} download>
              <FontAwesomeIcon icon={faFileArrowDown} className='btn_icon' />
              Download
            </a>
          )}

          {/* this is only for the test -> will be deleted */}
          <a className='download_btn' href={processedImage} download>
            <FontAwesomeIcon icon={faFileArrowDown} className='btn_icon' />
            Download
          </a>
        </div>

        {/* WIP - loader */}
        {loading && <div>Loading...</div>}
      </main>
      <Footer />
    </div>
  );
};

export default Container;
