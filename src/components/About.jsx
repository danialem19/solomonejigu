import React from 'react';

const About = () => (
        <section id="about" className="about-section">
            <h2>About Us</h2>
            <div className="ceo-flex-container">
                <div className="ceo-image-box">
                    <img src="ceo.png" alt="Solomon Ejigu" />
                    <div className="ceo-name-card">
                        <h3>Solomon Ejigu (CPA,CIA)</h3>
                        <p>Principal Partner</p>
                    </div>
                </div>

                <div className="ceo-bio-box">
                    <p>
                        Solomon Ejigu, CPA, CIA, is a seasoned finance leader with over 15 years of experience in
                        accounting, auditing, and business advisory. He has led finance teams in delivering financial
                        clarity, strategic insights, and operational efficiency. Solomon specializes in nonprofit cost
                        accounting, federal grant compliance, and business process evaluation. His expertise spans
                        financial system optimization, internal controls, and sustainable growth strategies. With a
                        strong foundation in financial reporting and a commitment to transparency, he empowers teams to
                        achieve measurable impact.
                    </p>
                    <div className="ceo-social-icons">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>
            </div>
        </section>
);

export default About;