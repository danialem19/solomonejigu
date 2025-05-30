
import React from 'react';
import './ServiceModal.css';

const ServiceModal = ({ isOpen, title, description, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h3 id="modal-title">{title}</h3>
        <p id="modal-description">{description}</p>
      </div>
    </div>
  );
};

export default ServiceModal;
