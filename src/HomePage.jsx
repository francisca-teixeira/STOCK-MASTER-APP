import React from 'react';
import './css/HomePage.css'; 
import logo from './public/logo.png';
import logoFooter1 from './public/summer_camp.png'; 
import logoFooter2 from './public/critical_software.png'; 

function HomePage() {
  return (
    <div className="home-page"> 
      <div className="top-section">
        <div className="slogan-container">
          <div className="slogan">
            <span className="slogan-part learn">Learn.</span>
            <span className="slogan-part trade">Trade.</span>
            <span className="slogan-part succeed">Succeed.</span>
          </div>
          <button className="get-started-button">Get Started!</button>
        </div>
        
        <div className="logo-description-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo"/>
          </div>
          <div className="description-container">
            <p className="description">
              Discover the exciting world of investments with StockMaster. Our app allows you to simulate buying and selling stocks in a safe and interactive environment. Perfect for beginners and enthusiasts, StockMaster helps you develop your trading skills and gain a better understanding of the stock market.
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={logoFooter1} alt="Logo Footer 1" className="footer-logo"/>
        <img src={logoFooter2} alt="Logo Footer 2" className="footer-logo"/>
      </div>
    </div>
  );
}

export default HomePage;
