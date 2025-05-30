
import React from 'react';

const FileUpload = () => (
        <section id="upload">
            <h2>
                Upload Your Documents
            </h2>
            <h3>
                Securely Upload Your Documents
            </h3>
            <p>
                Please use the form below to upload any relevant files. All submissions are encrypted and stored safely
                for our review and prompt follow-up.
            </p>
            <form encType="multipart/form-data" id="uploadForm">
                <input name="email" required="" type="email" placeholder='Email Address' />
                <input name="phone" required="" type="text" placeholder='Phone Number' />
                <input multiple="" name="files" required="" type="file" />
                <div className="g-recaptcha" data-sitekey="6Le4LD4rAAAAAGkow6vAIr_Pam0f6-LYKAoXIh9Z">
                </div>
                <button type="submit">
                    Upload
                </button>
                <div className="message" id="progress">
                </div>
                <div className="message" id="response">
                </div>
            </form>
        </section>
);

export default FileUpload;
