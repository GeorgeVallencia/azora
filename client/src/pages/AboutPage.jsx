import { useState } from 'react';

function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: '👩‍💼',
      bio: 'Passionate about productivity and helping people achieve their goals through technology.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      image: '👨‍💻',
      bio: 'Building scalable solutions that make goal tracking intuitive and enjoyable.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Product',
      image: '👩‍🎨',
      bio: 'Designing user experiences that motivate and delight our customers every day.'
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      image: '👨‍💻',
      bio: 'Crafting robust code that powers our platform reliably and efficiently.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Goals Completed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Azora
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to help millions of people achieve their goals and build better habits through intelligent tracking and beautiful design.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="border-b border-gray-200">
              <button
                onClick={() => setActiveTab('mission')}
                className={`pb-4 px-6 font-medium text-sm ${activeTab === 'mission'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`pb-4 px-6 font-medium text-sm ${activeTab === 'team'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Our Team
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`pb-4 px-6 font-medium text-sm ${activeTab === 'values'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Our Values
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'mission' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-4">
                      At Azora, we believe that everyone has the potential to achieve extraordinary things. Our mission is to provide the tools, motivation, and support needed to turn aspirations into achievements.
                    </p>
                    <p className="mb-4">
                      We combine cutting-edge technology with behavioral psychology to create an experience that not only tracks progress but actively drives it forward.
                    </p>
                    <p>
                      Whether you're building a business, learning a new skill, or trying to live a healthier lifestyle, Azora is designed to be your companion in the journey toward excellence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{member.image}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">We pursue the highest standards in everything we do.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="text-lg font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-600">We build trust through transparency and honesty.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600">We constantly improve and evolve our platform.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-3xl mb-3">❤️</div>
                  <h3 className="text-lg font-semibold mb-2">Empathy</h3>
                  <p className="text-gray-600">We deeply understand and care for our users.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6">
              Join thousands of users who are already achieving their goals with Azora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                Get Started Free
              </a>
              <a href="/pricing" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
                View Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;