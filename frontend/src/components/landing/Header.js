import React from 'react';
import '../Assests/css/style.css';

const Header = () => (
  <header className='header-land'>
    <div className="wrap">
      <div id="app-name">BUDSPARK</div>
      <nav>
        <ul>
          <li><a href="#" className="btn btn-r">Home</a></li>
          <li><a href="#about" className="btn btn-r">Features</a></li>
          <li><a href="#approach" className="btn btn-r">Inquiry Submission</a></li>
          <li><a href="#work" className="btn btn-r">Contact</a></li>
        </ul>
        <a href="/login" className="btn btn-r"><b>Login / Register</b></a>
      </nav>
    </div>
  </header>
);

export default Header;
