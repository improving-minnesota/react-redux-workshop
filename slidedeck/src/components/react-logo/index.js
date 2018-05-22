import React from 'react';
import logo from './react.svg';

import './react-logo.css';

export default function ReactLogo() {
  return (
    <div className="react-logo-container">
      <img className="react-logo" src={logo} />;
    </div>
  );
}
