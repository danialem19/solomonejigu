import React from 'react';
import './Home.css';

const Home = () => (
    <section className="circle-section">
        <div className="circle" id="circle-small"></div>
        <div className="circle" id="circle-medium"></div>
        <div className="circle" id="circle-large"></div>

        <div className="circle-content">
            <h1>Welcome to Solomon Ejigu Advisory</h1>
            <p>Your trusted partner in accounting, tax, financial, and business advisory services.</p>
        </div>
    </section>
);

export default Home;