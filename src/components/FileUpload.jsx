import React, { useState, useRef, useEffect } from 'react';
import './FileUpload.css';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY; // or hardcode
const WEBAPP_URL = process.env.REACT_APP_GOOGLE_UPLD_SCRIPT_URL;     // or hardcode

const FileUpload = () => {
  const [open, setOpen] = useState(false);
  const [recaptchaId, setRecaptchaId] = useState(null);
  const formRef = useRef(null);
  const msgRef = useRef(null);

  // Load the reCAPTCHA script once if not present
  useEffect(() => {
    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existing) return;
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  // Render/ensure the widget when the modal opens
  useEffect(() => {
    if (!open) return;

    const el = document.getElementById('recaptcha-upload');
    if (!el) return;

    const tryRender = () => {
      if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
        // Only render once; subsequent opens just reset
        if (recaptchaId === null) {
          const id = window.grecaptcha.render('recaptcha-upload', { sitekey: RECAPTCHA_SITE_KEY });
          setRecaptchaId(id);
        } else {
          window.grecaptcha.reset(recaptchaId);
        }
        return true;
      }
      return false;
    };

    // Try immediately, and then a couple of retries if script is still loading
    if (!tryRender()) {
      const t = setInterval(() => {
        if (tryRender()) clearInterval(t);
      }, 250);
      return () => clearInterval(t);
    }
  }, [open, recaptchaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const msg = msgRef.current;
    const fileInput = form.querySelector('input[name="file"]');
    const file = fileInput?.files?.[0];
    const submitBtn = form.querySelector('button[type="submit"]');

    // Reset status line
    msg.textContent = '';
    msg.className = 'form-status';

    if (!WEBAPP_URL) {
      msg.textContent = 'Upload endpoint not configured.';
      msg.className = 'form-status error';
      return;
    }
    if (!RECAPTCHA_SITE_KEY) {
      msg.textContent = 'reCAPTCHA site key not configured.';
      msg.className = 'form-status error';
      return;
    }
    if (!file) {
      msg.textContent = 'Please select a file.';
      msg.className = 'form-status error';
      return;
    }

    const token = (window.grecaptcha && recaptchaId !== null)
      ? window.grecaptcha.getResponse(recaptchaId)
      : '';
    if (!token) {
      msg.textContent = 'Please complete the reCAPTCHA.';
      msg.className = 'form-status error';
      return;
    }

    // Button loading UX
    const defaultBtnText = submitBtn ? submitBtn.textContent : 'Upload';
    if (submitBtn) {
      submitBtn.textContent = 'Uploading…';
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    try {
      // Read file as base64
      const arrayBuf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));

      // Payload (sent as text/plain to avoid strict preflight)
      const payload = {
        filename: file.name,
        mimetype: file.type || 'application/octet-stream',
        data: base64,
        recaptchaToken: token,
      };

      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, // simple → fewer CORS issues
        body: JSON.stringify(payload),
        credentials: 'omit',
        redirect: 'follow',
      });

      // Read/log server response
      const raw = await response.text();
      console.log('Upload status:', response.status, response.statusText);
      console.log('Raw body:', raw);
      let result;
      try { result = JSON.parse(raw); } catch { result = { ok: false, message: raw || 'Non-JSON response' }; }
      console.log('Parsed result:', result);

      if (response.ok && result.ok) {
        form.reset();
        if (window.grecaptcha && recaptchaId !== null) window.grecaptcha.reset(recaptchaId);
        msg.textContent = result.message || 'File uploaded successfully!';
        msg.className = 'form-status success';
      } else {
        msg.textContent = result.message || `Upload failed (HTTP ${response.status}).`;
        msg.className = 'form-status error';
      }
    } catch (err) {
      console.error('Network error:', err);
      msg.textContent = 'Network or server error.';
      msg.className = 'form-status error';
    } finally {
      if (submitBtn) {
        submitBtn.textContent = defaultBtnText;
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
    }
  };

  return (
    <>
      {!open && (
        <button
          className="sticky-icon-btn upload"
          onClick={() => setOpen(true)}
          aria-label="Upload File"
          title="Upload File"
        >
          <i className="fas fa-upload"></i>
        </button>
      )}
      <div className={`sticky-form-modal upload${open ? ' open' : ' closed'}`}>
        <div className="sticky-form-content">
          <span
            className="close-sticky-form"
            onClick={() => setOpen(false)}
            aria-label="Close file upload form"
            role="button"
            tabIndex={0}
          >
            &times;
          </span>
          <h3>Upload File</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="file" name="file" required />
            {/* reCAPTCHA mounts here */}
            <div id="recaptcha-upload" className="recaptcha"></div>
            <button type="submit">Upload</button>
            <div ref={msgRef} className="form-status"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileUpload;