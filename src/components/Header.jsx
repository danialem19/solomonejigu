import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
        <nav>
            <div className="logo">
                <img alt="SolomonE Advisory Logo" className="logo-img" src="logo.png" />
                <span>
                    SolomonE Advisory
                </span>
            </div>
            <button aria-label="Toggle Navigation" className="hamburger">
                ☰
            </button>
            <ul className="nav-links">
                <li>
                    <a href="#home">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#about">
                        About Us
                    </a>
                </li>
                <li>
                    <a href="#services">
                        Services
                    </a>
                </li>
                <li>
                    <a href="#submit-enquiry">
                        Consultation
                    </a>
                </li>
                <li>
                    <a href="#upload">
                        File Upload
                    </a>
                </li>
                <li>
                    <a href="#contact">
                        Contact Us
                    </a>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;