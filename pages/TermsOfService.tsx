import React from 'react';
import SEO from '../components/seo/SEO';

const TermsOfService: React.FC = () => {
    return (
        <>
            <SEO
                title="Terms of Service"
                description="Terms of Service for Branded By Winni - Agreement for using our creative services."
                keywords={['terms of service', 'terms and conditions', 'agreement']}
            />

            <div className="min-h-screen bg-brand-ivory py-32 px-6 md:px-12">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-8">Terms of Service</h1>
                    <p className="text-brand-muted mb-12">Last updated: December 10, 2024</p>

                    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">1. Agreement to Terms</h2>
                            <p className="text-brand-text leading-relaxed">
                                By accessing or using the services provided by Branded By Winni ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">2. Services</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                Branded By Winni provides creative services including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Website Design and Development</li>
                                <li>Website Maintenance and Optimization</li>
                                <li>SEO (Search Engine Optimization)</li>
                                <li>Branding and Graphic Design</li>
                                <li>Digital Marketing Services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">3. Project Timeline</h2>
                            <p className="text-brand-text leading-relaxed">
                                Project timelines typically range from 1 to 4 weeks depending on the complexity and scope of the project. Specific timelines will be agreed upon in writing before project commencement. Delays caused by client feedback, content provision, or scope changes may extend the timeline.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">4. Payment Terms</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                Unless otherwise agreed in writing:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>A 50% deposit is required before work commences</li>
                                <li>The remaining 50% is due upon project completion</li>
                                <li>Payment must be made within 7 days of invoice date</li>
                                <li>Late payments may incur additional fees</li>
                                <li>All prices are in the agreed currency and exclude applicable taxes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">5. Client Responsibilities</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                The client agrees to:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Provide all necessary content, materials, and information in a timely manner</li>
                                <li>Respond to requests for feedback within agreed timeframes</li>
                                <li>Ensure all provided content is legally owned or licensed</li>
                                <li>Make timely payments as per the agreed schedule</li>
                                <li>Communicate clearly and professionally</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">6. Revisions and Changes</h2>
                            <p className="text-brand-text leading-relaxed">
                                Each project includes a specified number of revision rounds as agreed in the project proposal. Additional revisions or scope changes beyond the original agreement may incur additional fees. Major scope changes will require a new proposal and agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">7. Intellectual Property</h2>
                            <p className="text-brand-text leading-relaxed mb-4">
                                Upon full payment:
                            </p>
                            <ul className="list-disc list-inside text-brand-text space-y-2 ml-4">
                                <li>Client receives full ownership of the final deliverables</li>
                                <li>We retain the right to display the work in our portfolio</li>
                                <li>We retain ownership of any pre-existing materials, templates, or tools used</li>
                                <li>Client warrants they have rights to all provided content</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">8. Confidentiality</h2>
                            <p className="text-brand-text leading-relaxed">
                                We respect the confidentiality of your business information. Any confidential information shared during the project will not be disclosed to third parties without your consent, except as required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">9. Warranties and Disclaimers</h2>
                            <p className="text-brand-text leading-relaxed">
                                We warrant that our services will be performed professionally and competently. However, we do not guarantee specific results, rankings, or business outcomes. Our services are provided "as is" without any other warranties, express or implied.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">10. Limitation of Liability</h2>
                            <p className="text-brand-text leading-relaxed">
                                Our total liability for any claims arising from our services shall not exceed the total amount paid by the client for the specific project. We are not liable for any indirect, incidental, or consequential damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">11. Termination</h2>
                            <p className="text-brand-text leading-relaxed">
                                Either party may terminate the agreement with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. Deposits are non-refundable.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">12. Governing Law</h2>
                            <p className="text-brand-text leading-relaxed">
                                These Terms of Service shall be governed by and construed in accordance with the laws of Ghana. Any disputes shall be resolved through good faith negotiation or, if necessary, through the courts of Ghana.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">13. Changes to Terms</h2>
                            <p className="text-brand-text leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">14. Contact Information</h2>
                            <p className="text-brand-text leading-relaxed">
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="mt-4 text-brand-text">
                                <p className="font-medium">Branded By Winni</p>
                                <p>Email: brandedbywinnistudio@gmail.com</p>
                                <p>Phone: +233 20 232 6851</p>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-gray-200">
                            <p className="text-brand-text leading-relaxed italic">
                                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
