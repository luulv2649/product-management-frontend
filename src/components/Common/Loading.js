import React from 'react';

const Loading = ({ size = 'medium', text = 'Đang tải...' }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="loading-spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default Loading;