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
        <a href="https://www.instagram.com/hact_research" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/share/159jJfaxSJ" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://x.com/horn_research" target="_blank" rel="noreferrer">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/company/horn-of-africa-clinical-trials-hact/" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;