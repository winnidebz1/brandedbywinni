import React from 'react';
import SEO from '../components/seo/SEO';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for Branded By Winni - How we collect, use, and protect your personal information."
                keywords={['privacy policy', 'data protection', 'privacy']}
            />

            <div className="min-h-screen bg-brand-ivory py-32 px-6 md:px-12">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-8">Privacy Policy</h1>
                    <p className="text-brand-muted mb-12">Last updated: December 10, 2024</p>

                    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">1. Introduction</h2>
                            <p className="text-brand-text leading-relaxed">
                                Welcome to Branded By Winni ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">2. Information We Collect</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Project details and service inquiries</li>
                                <li>Communication preferences</li>
                                <li>Payment information (processed securely through third-party providers)</li>
                                <li>Any other information you choose to provide</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">3. How We Use Your Information</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process your requests and transactions</li>
                                <li>Send you updates about your projects</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">4. Information Sharing</h2>
                            <p className="text-brand-text leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">5. Data Security</h2>
                            <p className="text-brand-text leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">6. Cookies and Tracking</h2>
                            <p className="text-brand-text leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">7. Your Rights</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Correct inaccurate or incomplete data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">8. Children's Privacy</h2>
                            <p className="text-brand-text leading-relaxed">
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">9. Changes to This Policy</h2>
                            <p className="text-brand-text leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">10. Contact Us</h2>
                            <p className="text-brand-text leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4 text-brand-text">
                                <p className="font-medium">Branded By Winni</p>
                                <p>Email: brandedbywinnistudio@gmail.com</p>
                                <p>Phone: +233 20 232 6851</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
