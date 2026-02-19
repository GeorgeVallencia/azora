import { useState } from 'react';

function PrivacyPolicyPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'data-collection',
      title: 'Information We Collect',
      content: [
        'When you use Azora, we collect information to provide and improve our services. This includes:',
        '• Personal Information: Name, email address, phone number, and other details you provide during registration',
        '• Usage Data: How you interact with our platform, features used, and time spent',
        '• Device Information: Browser type, operating system, and device identifiers',
        '• Performance Data: Application performance, crash reports, and response times',
        '• Communication Data: Support tickets, feedback, and other communications'
      ]
    },
    {
      id: 'data-use',
      title: 'How We Use Your Information',
      content: [
        'We use the information we collect for various purposes to provide and improve our services:',
        '• Service Provision: To deliver the core functionality of Azora',
        '• Personalization: To customize your experience and provide relevant content',
        '• Communication: To respond to your inquiries and send service updates',
        '• Analytics: To understand usage patterns and improve our platform',
        '• Security: To protect against fraud and ensure service integrity',
        '• Legal Compliance: To meet legal and regulatory requirements'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information. We only share your data in limited circumstances:',
        '• Service Providers: With trusted third parties who help operate our service',
        '• Legal Requirements: When required by law or to protect our rights',
        '• Business Transfers: In connection with mergers, acquisitions, or asset sales',
        '• With Your Consent: When you explicitly authorize us to share specific information',
        '• Aggregated Data: Anonymized, aggregated data for research and analytics'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'We implement multiple layers of security to protect your information:',
        '• Encryption: All data is encrypted in transit and at rest using industry-standard protocols',
        '• Access Controls: Strict authentication and authorization mechanisms',
        '• Regular Audits: Frequent security assessments and penetration testing',
        '• Data Minimization: We collect only what is necessary for our services',
        '• Employee Training: Regular security training for all team members',
        '• Incident Response: Established procedures for security incident management'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      content: [
        'You have several rights regarding your personal information:',
        '• Access: Request a copy of your personal data',
        '• Correction: Update or correct inaccurate information',
        '• Deletion: Request removal of your personal data',
        '• Portability: Transfer your data to another service',
        '• Restriction: Limit how we use your information',
        '• Objection: Object to certain uses of your data',
        '• Withdraw Consent: Revoke permission for data processing'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to enhance your experience:',
        '• Essential Cookies: Required for basic site functionality',
        '• Performance Cookies: Help us understand how you use our site',
        '• Functionality Cookies: Remember your preferences and settings',
        '• Targeting Cookies: Used to deliver relevant content and advertisements',
        '• You can control cookies through your browser settings',
        '• Disabling cookies may affect certain features of our service'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content: [
        'We retain your information only as long as necessary:',
        '• Active Accounts: Data is retained while your account is active',
        '• Deleted Accounts: Data is removed within 30 days of account deletion',
        '• Legal Requirements: Some data may be retained longer for legal compliance',
        '• Anonymization: Data may be anonymized for research purposes',
        '• Automatic Deletion: Inactive accounts are deleted after 2 years of inactivity'
      ]
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      content: [
        'Azora operates globally and may transfer data internationally:',
        '• Data Processing: Information may be processed in countries other than your own',
        '• Safeguards: We implement appropriate safeguards for international transfers',
        '• Compliance: All transfers comply with applicable data protection laws',
        '• Standard Contractual Clauses: We use EU-approved standard contractual clauses',
        '• Your Rights: You maintain the same rights regardless of data location'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: [
        'Our service is not intended for children under 13 years old:',
        '• Age Restrictions: We do not knowingly collect information from children under 13',
        '• Parental Consent: We require parental consent for minor users where applicable',
        '• Immediate Removal: We promptly remove information of children under 13',
        '• Educational Use: Special considerations for educational institutions',
        '• Reporting: Report any concerns about children\'s privacy to us immediately'
      ]
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      content: [
        'We may update this privacy policy from time to time:',
        '• Notification: We will notify you of significant changes',
        '• Effective Date: Updates are effective when posted on our website',
        '• Continued Use: Using our service after updates constitutes acceptance',
        '• Material Changes: We will obtain consent for material changes',
        '• Review Period: Check this page periodically for the latest information',
        '• Archive: Previous versions are available upon request'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: February 7, 2024
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">What We Collect</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Account information and preferences</li>
                <li>• Usage and performance data</li>
                <li>• Device and browser information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How We Protect It</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Industry-standard encryption</li>
                <li>• Regular security audits</li>
                <li>• Strict access controls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 pb-6">
                  <div className="prose max-w-none">
                    {section.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-600 mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Questions About Privacy?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this privacy policy or our data practices, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> privacy@azora.com
            </p>
            <p className="text-gray-700">
              <strong>Mail:</strong> Privacy Officer, Azora Inc., 104 Riverside Drive, Nairobi, Kenya
            </p>
            <p className="text-gray-700">
              <strong>Response Time:</strong> We will respond to privacy inquiries within 30 days
            </p>
          </div>
        </div>

        {/* Download */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Download PDF Version
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
