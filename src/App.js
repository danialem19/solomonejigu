
import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Certifications from './components/Certifications';
import Services from './components/Services';
import EnquiryForm from './components/EnquiryForm';
import FileUpload from './components/FileUpload';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const scrollHint = document.getElementById('scrollHint');
    const lastSection = document.querySelector('section:last-of-type');

    function checkScrollPosition() {
      if (!scrollHint || !lastSection) return;
      const lastRect = lastSection.getBoundingClientRect();
      const atBottom = lastRect.top < window.innerHeight;
      scrollHint.classList.toggle('hidden', atBottom);
    }

    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();

    scrollHint?.addEventListener('click', () => {
      window.scrollBy({
        top: window.innerHeight * 0.5,
        behavior: 'smooth',
      });
    });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);
  return (
    <div className="App">
      <Header />
      <main>
         <Home />
         <About />
         <Certifications />
         <Services />
         <EnquiryForm />
         <FileUpload />
         <Contact />
      </main>
      <Footer />
      <div className="scroll-down-hint" id="scrollHint">
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
}

export default App;
