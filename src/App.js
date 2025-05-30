
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
