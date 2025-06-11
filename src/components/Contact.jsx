import React from 'react';

const Contact = () => (
  <section id="contact">
    <div className="contact-bar">
      <div className="contact-item">
        <i className="fas fa-envelope"></i>
        info@solomneadvisory.com
      </div>
      <div className="contact-item">
        <i className="fas fa-phone"></i>
        +1 (800) 123-4567
      </div>
      <div className="social-icons">
        <a href="" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;