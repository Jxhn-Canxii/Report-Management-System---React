import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer fixed-bottom bg-dark">
      <div className="container">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 3.1.0
        </div>
        <strong>Copyright &copy; 2020 <Link>WDIA</Link>.</strong> All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
