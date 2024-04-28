import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-header">
          <div className="title-img">
            <div className="title">
              <h1>Header</h1>
            </div>
            <div className="title2">
            <img src="/images/Korean/korean.png" alt="img home" style={{ minHeight: '520px',maxWidth:'100%', objectFit: 'cover' }} />
            <div className="opacity-mask"></div>
            </div>
          </div>

        </div>
      </div>
        
    </div>
  );
};

export default Home;
