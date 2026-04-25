import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Terms and Conditions</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Agreement to Terms</h2>
                        <p>By accessing or using Cognitic, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. Intellectual Property</h2>
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Cognitic and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. User Responsibilities</h2>
                        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
                        <p>In no event shall Cognitic, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">5. Changes</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">6. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at [ <a className='text-gray-500 hover:text-gray-300 transition-colors' href="mailto:bey.ashutosh@gmail.com">bey.ashutosh@gmail.com</a> ]</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
