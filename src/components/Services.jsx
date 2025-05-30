
import React, { useState } from 'react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', description: '' });

  const serviceDetails = {
    "Outsourced CFO": "We handle daily financial transactions, prepare reconciliations, and deliver reports that give insight into your operations and cash flow.",
    "Tax Preparation": "Prepare and file federal and state tax returns, manage deductions, and ensure regulatory compliance with peace of mind.",
    "System Setup": "Set up QuickBooks and Financial Edge, integrate payment systems with your bank, and customize for your business.",
    "Internal Audits": "Perform internal audits, assess control effectiveness, and provide reports to improve compliance and efficiency.",
    "Policy Documentation": "Draft clear and compliant accounting policies, internal control procedures, and operation manuals.",
    "Business Advisory": "Offer strategic guidance on growth, structure, and compliance for startups, nonprofits, and SMBs."
  };

  const handleMoreClick = (title) => {
    setModalData({ title, description: serviceDetails[title] || 'More details coming soon.' });
    setModalOpen(true);
  };

  return (
    <section id="services" className="services-section">
      <h2>Our Services</h2>
      <p className="services-intro">
        We offer comprehensive financial and business advisory services, including:
      </p>
      <div className="services-grid">
        {Object.entries(serviceDetails).map(([title, description]) => (
          <div className="service-card" key={title}>
            <div className="service-icon"><i className="fas fa-cogs"></i></div>
            <h3>{title}</h3>
            <p>{description.slice(0, 70)}...</p>
            <a href="#services" className="more-link" onClick={(e) => {
              e.preventDefault();
              handleMoreClick(title);
            }}>MORE</a>
          </div>
        ))}
      </div>
      <ServiceModal
        isOpen={modalOpen}
        title={modalData.title}
        description={modalData.description}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Services;
