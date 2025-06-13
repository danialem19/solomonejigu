
import React, { useRef, useEffect } from 'react';

const FileUpload = () => {
  const formRef = useRef(null);
  const progressRef = useRef(null);
  const responseRef = useRef(null);

  useEffect(() => {
    // Handle form submission
    const form = formRef.current;

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'api.solomonejigu.com/upload');

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total * 100).toFixed(2);
          progressRef.current.innerText = `Uploading: ${percent}%`;
        }
      };

      xhr.onload = function () {
        responseRef.current.innerText = xhr.responseText;
        progressRef.current.innerText = '';
        form.reset();
        if (window.grecaptcha) window.grecaptcha.reset();
      };

      xhr.onerror = function () {
        responseRef.current.innerText = "❌ Upload failed.";
      };

      xhr.send(formData);
    };

    form?.addEventListener('submit', handleSubmit);
    return () => form?.removeEventListener('submit', handleSubmit);
  }, []);

  useEffect(() => {
    // Render reCAPTCHA when available
    const interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        clearInterval(interval);
        window.grecaptcha.ready(() => {
          window.grecaptcha.render('recaptcha-upload', {
            sitekey: '6Le4LD4rAAAAAGkow6vAIr_Pam0f6-LYKAoXIh9Z'
          });
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="upload">
      <h2>File Upload</h2>
      <form id="uploadForm" ref={formRef}>
        <input type="text" name="email" placeholder="Your Email" required />
        <input type="text" name="phone" placeholder="Phone Number" required />
        <input type="file" name="files" required />

        <div id="recaptcha-upload" style={{ marginTop: '1rem' }}></div>

        <button type="submit">Upload</button>
      </form>
      <p id="progress" ref={progressRef}></p>
      <p id="response" ref={responseRef}></p>
    </section>
  );
};

export default FileUpload;
