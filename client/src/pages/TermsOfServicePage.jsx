import { useState } from 'react';

function TermsOfServicePage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Azora, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you may not access or use our service.',
        'These terms constitute a legally binding agreement between you and Azora Inc.',
        'We reserve the right to update these terms at any time without prior notice.',
        'Your continued use of the service constitutes acceptance of any changes.'
      ]
    },
    {
      id: 'service-description',
      title: 'Service Description',
      content: [
        'Azora is a productivity platform that helps users track goals, build habits, and improve time management.',
        'Our services include goal tracking, habit formation, time tracking, analytics, and team collaboration features.',
        'We provide both free and paid subscription tiers with different feature sets.',
        'Service availability may vary by region and is subject to change without notice.',
        'Third-party integrations are provided as-is and may have separate terms.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: [
        'As a user of Azora, you agree to:',
        '• Provide accurate and complete information during registration',
        '• Maintain the security of your account credentials',
        '• Use the service for lawful purposes only',
        '• Respect the rights of other users',
        '• Comply with all applicable laws and regulations',
        '• Not interfere with or disrupt the service',
        '• Not attempt to gain unauthorized access to our systems'
      ]
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      content: [
        'You may not use Azora for any of the following purposes:',
        '• Illegal activities or facilitating illegal conduct',
        '• Harassment, abuse, or threats toward others',
        '• Spam, unsolicited communications, or pyramid schemes',
        '• Distribution of malware, viruses, or harmful code',
        '• Infringement of intellectual property rights',
        '• False or misleading information',
        '• Interference with service operation or security',
        '• Reverse engineering or attempting to extract source code'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      content: [
        'Azora and its content are owned by Azora Inc. and protected by intellectual property laws.',
        'You do not acquire any ownership rights by using our service.',
        'All trademarks, service marks, and logos are the property of Azora Inc.',
        'User-generated content remains your property, but you grant us a license to use it.',
        'You may not use our intellectual property without express permission.',
        'Any improvements or suggestions you provide become our property.'
      ]
    },
    {
      id: 'user-content',
      title: 'User-Generated Content',
      content: [
        'You retain ownership of content you create using Azora.',
        'You grant us a worldwide, non-exclusive, royalty-free license to use your content.',
        'This license allows us to operate, improve, and promote our service.',
        'You represent that you have the right to grant this license.',
        'We may remove content that violates these terms or applicable laws.',
        'You are responsible for the content you create and share.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      content: [
        'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information.',
        'By using Azora, you consent to the collection and use of information as described in our Privacy Policy.',
        'We implement reasonable security measures to protect your data.',
        'We may share information as required by law or to protect our rights.',
        'You can review and update your personal information through your account settings.',
        'We retain data only as long as necessary to provide our services.'
      ]
    },
    {
      id: 'paid-services',
      title: 'Paid Services and Subscriptions',
      content: [
        'Azora offers both free and paid subscription tiers.',
        'Paid subscriptions are billed in advance on a monthly or annual basis.',
        'Subscription fees are non-refundable except as required by law.',
        'We may change pricing with 30 days notice to existing subscribers.',
        'You can cancel your subscription at any time through your account settings.',
        'Cancellation takes effect at the end of the current billing period.',
        'No refunds for partial months of service.'
      ]
    },
    {
      id: 'termination',
      title: 'Account Termination',
      content: [
        'You may terminate your account at any time by following the account deletion process.',
        'We may terminate or suspend your account for violation of these terms.',
        'Upon termination, your right to use the service ceases immediately.',
        'We are not liable to you for account termination.',
        'Sections that by their nature should survive termination will continue to apply.',
        'We may delete inactive accounts after 12 months of inactivity.'
      ]
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Warranties',
      content: [
        'Azora is provided "as is" without any warranties, express or implied.',
        'We do not guarantee uninterrupted or error-free service.',
        'We are not responsible for data loss or corruption.',
        'We do not guarantee the accuracy or reliability of user-generated content.',
        'Third-party integrations are provided without warranty.',
        'Service availability may be affected by factors beyond our control.',
        'We make no representations about the suitability of our service for your purposes.'
      ]
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      content: [
        'To the fullest extent permitted by law, Azora Inc. shall not be liable for:',
        '• Any indirect, incidental, special, or consequential damages',
        '• Loss of profits, data, or business opportunities',
        '• Damages arising from use or inability to use our service',
        '• Damages from unauthorized access to your account',
        '• Damages from third-party content or integrations',
        'Our total liability shall not exceed the amount you paid for the service in the preceding 12 months.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.'
      ]
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      content: [
        'These terms are governed by the laws of Kenya, without regard to conflict of law principles.',
        'Any disputes arising from these terms shall be resolved through binding arbitration.',
        'Arbitration shall be conducted in English under the rules of the International Chamber of Commerce.',
        'You waive your right to a jury trial and to participate in class action lawsuits.',
        'You may opt out of arbitration within 30 days of accepting these terms.',
        'The prevailing party in any dispute shall be entitled to reasonable attorney fees.'
      ]
    },
    {
      id: 'updates',
      title: 'Changes to Terms',
      content: [
        'We reserve the right to modify these terms at any time.',
        'Material changes will be communicated to users via email or service notifications.',
        'Non-material changes may be made without prior notice.',
        'Your continued use of the service constitutes acceptance of modified terms.',
        'If you do not agree to the changes, you must terminate your account.',
        'We will post the effective date of any changes at the top of this document.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of Azora's services and products. Please read them carefully.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: February 7, 2024
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Important Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Key Obligations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use service legally and responsibly</li>
                <li>• Protect your account credentials</li>
                <li>• Respect other users</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Important Limitations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Service provided "as is"</li>
                <li>• Limited liability for damages</li>
                <li>• No warranty for uninterrupted service</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
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
          <h2 className="text-xl font-semibold mb-4">Questions About These Terms?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> legal@azora.com
            </p>
            <p className="text-gray-700">
              <strong>Mail:</strong> Legal Department, Azora Inc., 104 Riverside Drive, Nairobi, Kenya
            </p>
            <p className="text-gray-700">
              <strong>Response Time:</strong> We will respond to legal inquiries within 30 days
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

export default TermsOfServicePage;
