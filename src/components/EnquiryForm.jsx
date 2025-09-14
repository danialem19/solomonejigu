import React, { useEffect, useRef, useState } from 'react';
import './EnquiryForm.css';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_INQ_SCRIPT_URL;

const EnquiryForm = () => {
    const [open, setOpen] = useState(false);
    const formRef = useRef(null);
    const msgRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (
            window.grecaptcha &&
            typeof window.grecaptcha.render === 'function' &&
            recaptchaContainer
        ) {
            if (recaptchaContainer.children.length === 0) {
                window.grecaptcha.render('recaptcha-container', {
                    sitekey: RECAPTCHA_SITE_KEY,
                });
            } else {
                window.grecaptcha.reset();
            }
        }

        const form = formRef.current;
        const formMsg = msgRef.current;

        const handleSubmit = async (e) => {
            e.preventDefault();
            const recaptchaResponse = window.grecaptcha?.getResponse();
            const formData = {
                contactInfo: form.querySelector('[name="contactInfo"]').value,
                ctaType: form.querySelector('[name="ctaType"]').value,
                serviceType: form.querySelector('[name="serviceType"]').value,
                shortDescription: form.querySelector('[name="shortDescription"]').value,
                recaptchaToken: recaptchaResponse,
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            const defaultBtnText = submitBtn ? submitBtn.textContent : 'Send';
            if (submitBtn) {
                submitBtn.textContent = 'Submitting…';
                submitBtn.classList.add('is-loading');
                submitBtn.disabled = true;
            }

            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    body: JSON.stringify(formData),
                });

                form.reset();
                window.grecaptcha?.reset();
                formMsg.textContent = 'Form submitted successfully!';
                formMsg.className = 'form-status success';
            } catch {
                formMsg.textContent = 'There was a network or server error.';
                formMsg.className = 'form-status error';
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = defaultBtnText;
                    submitBtn.classList.remove('is-loading');
                    submitBtn.disabled = false;
                }
            }
            
        };

        form?.addEventListener('submit', handleSubmit);
        return () => form?.removeEventListener('submit', handleSubmit);
    }, [open]);

    return (
        <>
            {!open && (
                <button
                    className="sticky-icon-btn enquiry"
                    onClick={() => setOpen(true)}
                    aria-label="Contact Us"
                    title="Contact Us"
                >
                    <i className="fas fa-envelope"></i>
                </button>
            )}

            <div className={`sticky-form-modal${open ? ' open' : ' closed'}`}>
                <div className="sticky-form-content">
                    <span
                        className="close-sticky-form"
                        onClick={() => setOpen(false)}
                        aria-label="Close enquiry form"
                        role="button"
                        tabIndex={0}
                    >
                        &times;
                    </span>
                    <h3>Contact Us</h3>
                    <form id="stickyContactForm" ref={formRef}>
                        <input
                            type="text"
                            name="contactInfo"
                            placeholder="Your Email or Phone"
                            required
                        />
                        <select name="ctaType" required>
                            <option value="">I am a...</option>
                            <option value="Individual">Individual</option>
                            <option value="Partner">Small Business</option>
                        </select>
                        <select name="serviceType" required>
                            <option value="">--Please choose service--</option>
                            <option value="Outsourced CFO / Bookkeeping">Outsourced CFO / Bookkeeping</option>
                            <option value="Tax Filing">Tax Filing</option>
                            <option value="Internal Audit">Internal Audit</option>
                            <option value="QuickBooks/Financial Edge Setup">QuickBooks/Financial Edge Setup</option>
                            <option value="Advisory Services">Advisory Services</option>
                            <option value="Other">Other</option>
                        </select>
                        <textarea
                            name="shortDescription"
                            placeholder="Short description"
                            rows="3"
                        ></textarea>
                        <div id="recaptcha-container" className="recaptcha"></div>
                        <button type="submit">Send</button>
                        <div id="formStatus" ref={msgRef} className="form-status"></div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EnquiryForm;