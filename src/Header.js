import React from 'react';
import logo from './public/logo.png';
function Header() {
    return (
      <div className="flex bg-primary px-6">
        <img src={logo} alt="Company Logo" className="w-40 h-40" />
      </div>
    );
  }
export default Header;
  