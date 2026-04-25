import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us when you create an account, update your profile, or use our services. This includes your name, email address, and any meeting data you choose to process through Cognitic.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of Cognitic, as well as to communicate directly with you, such as to send you email messages regarding meeting summaries and app updates.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Sharing of Your Information</h2>
                        <p>We do not sell, rent, or otherwise share your personal information with third parties except as described in this privacy policy or as required by law.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Security</h2>
                        <p>Cognitic cares about the integrity and security of your personal information. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures or use your personal information for improper purposes.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">5. Changes to This Privacy Policy</h2>
                        <p>We may modify or update this Privacy Policy from time to time, so you should review this page periodically. When we change the policy in a material manner, we will update the 'last updated' date at the top of this page.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">6. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at [ <a className='text-gray-500 hover:text-gray-300 transition-colors' href="mailto:[EMAIL_ADDRESS]">bey.ashutosh@gmail.com</a> ]</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
