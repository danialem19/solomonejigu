
import React from 'react';

const Certifications = () => (
        <section id="certifications">
            <h3>
                Certified to Serve You Better
            </h3>
            <p>SolomonE Advisory is dedicated to providing expert financial consulting, tax services, and personalized
                business advisory solutions. Our mission is to empower individuals and businesses with financial
                knowledge and strategies they need to succeed.</p>
            <div className="certifications-grid">
                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="FinancialEdgeNXT.png" alt="Blackbaud Certified" />
                        </div>
                        <div className="cert-flip-back">
                            <p>This certification validates product knowledge, professional expertise, and commitment to
                                excellence in using the applications.</p>
                        </div>
                    </div>
                </div>

                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="CPA-seal.png" alt="CPA Certified" />
                        </div>
                        <div className="cert-flip-back">
                            <p>Reviews & compiles financial statements, as well as advises on cost accounting standards
                                (CAS).</p>
                        </div>
                    </div>
                </div>

                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="image.png" alt="CIA Certified" />
                        </div>
                        <div className="cert-flip-back">
                            <p>Advises on internal control systems and conducts (outsourced) internal auditing services.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="1_Badge_Online_large.png" alt="QuickBooks ProAdvisor" />
                        </div>
                        <div className="cert-flip-back">
                            <p>Independent QuickBooks consulting service, clean books, set up accounting system, and
                                payment processing system, integrating your books with your banking & card payment
                                processing system.</p>
                        </div>
                    </div>
                </div>

                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="certified_block_chain.png" alt="Blockchain Expert" />
                        </div>
                        <div className="cert-flip-back">
                            <p>Specialized knowledge and skills to apply Blockchain for inventory management, logistics,
                                product traceability, payments, and supply chain finance improving efficiency and
                                transparency.</p>
                        </div>
                    </div>
                </div>

                <div className="cert-flip-card">
                    <div className="cert-flip-inner">
                        <div className="cert-flip-front">
                            <img src="emory_university_school_of_law.jpeg" alt="Legal Studies" />
                        </div>
                        <div className="cert-flip-back">
                            <p>Master of Legal Studies (Business) Law, contract/business law, and legal risks, business
                                transactions, administration, payments, data governance/cybersecurity law, regulatory
                                oversight, and dispute resolution were rewarding.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
);

export default Certifications;
