import React, { useEffect, useRef } from 'react';

const EnquiryForm = () => {
  const formRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const formMsg = msgRef.current;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const recaptchaResponse = window.grecaptcha?.getResponse();

      const formData = {
        fullName: form.querySelector('[name="entry.1312302940"]').value,
        phone: form.querySelector('[name="entry.1228563114"]').value,
        email: form.querySelector('[name="emailAddress"]').value,
        serviceType: form.querySelector('[name="entry.874710742"]').value,
        queryFor: form.querySelector('[name="entry.1846527533"]:checked')?.value || '',
        description: form.querySelector('[name="entry.870442539"]').value,
        bestTime: form.querySelector('#datetime').value,
        recaptchaToken: recaptchaResponse,
      };

      try {
        const response = await fetch('http://uploader-env2.eba-dfethggd.us-east-1.elasticbeanstalk.com/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          form.reset();
          window.grecaptcha?.reset();
          formMsg.textContent = 'Form submitted successfully!';
          formMsg.className = 'message success';
        } else {
          const errorText = await response.text();
          formMsg.textContent = `Error: ${errorText || 'Submission failed.'}`;
          formMsg.className = 'message error';
        }
      } catch {
        formMsg.textContent = 'There was a network or server error.';
        formMsg.className = 'message error';
      }
    };

    form?.addEventListener('submit', handleSubmit);
    return () => form?.removeEventListener('submit', handleSubmit);
  }, []);

return (
        <section id="submit-enquiry">
            <h2>
                Request Consultation
            </h2>
            <div className="form-box">
                <h3>
                    Reserve Consultation, We’re Here to Help
                </h3>
                <p>
                    Interested in learning more about how SolomonE Advisory can support your business? Fill out the form
                    below, and our team will get in touch to discuss your needs and tailor a solution that fits.
                </p>
                <form id="serviceForm" ref={formRef}>
                    <input name="entry.1312302940" required="" type="text" placeholder="Full Name" />
                    <input name="entry.1228563114" required="" type="text" placeholder="Phone Number"/>
                    <input name="emailAddress" required="" type="email" placeholder="Email Address"/>
                    <select name="entry.874710742" required="">
                        <option value="">
                            --Please choose an option service--
                        </option>
                        <option value="Outsourced CFO / Bookkeeping">
                            Outsourced CFO / Bookkeeping
                        </option>
                        <option value="Tax Filing">
                            Tax Filing
                        </option>
                        <option value="Internal Audit">
                            Internal Audit
                        </option>
                        <option value="QuickBooks/Financial Edge Setup">
                            QuickBooks/Financial Edge Setup
                        </option>
                        <option value="Advisory Services">
                            Advisory Services
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>
                    <div className="radio-group">
                        <label>
                            <input name="entry.1846527533" type="radio" value="Personal" />
                            Personal Enquiry
                        </label>
                        <label>
                            <input name="entry.1846527533" type="radio" value="Company" />
                            Business Enquiry
                        </label>
                    </div>
                    <textarea name="entry.870442539" required="" rows="4" placeholder="Give us short description"></textarea>
                    <label htmlFor="hr">
                        <i className="fa-solid fa-phone">
                        </i>
                        Best time to call
                    </label>
                    <input id="datetime" required="" type="datetime-local"/>
                    <input name="entry.1763424804_year" type="hidden"/>
                    <input name="entry.1763424804_month" type="hidden" />
                    <input name="entry.1763424804_day" type="hidden" />
                    <input name="entry.1763424804_hour" type="hidden" />
                    <input name="entry.1763424804_minute" type="hidden" />
                    <div id="formMsg" ref={msgRef}></div>
                    <div className="g-recaptcha" data-sitekey="6Le4LD4rAAAAAGkow6vAIr_Pam0f6-LYKAoXIh9Z"></div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </section>
);
};

export default EnquiryForm;
