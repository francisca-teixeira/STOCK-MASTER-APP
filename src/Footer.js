import React from 'react';
import critical from './public/critical_software.png'
import summer from './public/summer_camp.png'


function Footer() {
    return (
    <div className="flex bg-black p-8 justify-end items-center">
        <img src={critical} alt="Company Logo" className="w-20 h-20" />
        <img src={summer} alt="Company Logo" className="w-20 h-20" />
      </div>
    );
  }
export default Footer;
  