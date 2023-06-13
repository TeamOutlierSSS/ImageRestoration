import React from 'react';
import '../styles/loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className='loader_container'>
        <span className='loader'></span>
      </div>
    </div>
  );
};

export default Loading;
