import { useState } from 'react';

function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState('latest');

  const changelog = [
    {
      version: 'v2.4.0',
      date: '2024-02-07',
      type: 'major',
      features: [
        'Enhanced registration with comprehensive user data collection',
        'Auto-login functionality after successful registration',
        'Improved error handling and user feedback',
        'Professional footer with location and social media links',
        'Mobile-responsive design improvements'
      ],
      fixes: [
        'Fixed JWT token creation issues',
        'Resolved user name display problems in navigation',
        'Fixed registration flow redirecting to login page',
        'Corrected environment variable configuration'
      ],
      improvements: [
        'Better password visibility toggles',
        'Enhanced form validation messages',
        'Improved loading states and user experience'
      ]
    },
    {
      version: 'v2.3.0',
      date: '2024-02-01',
      type: 'minor',
      features: [
        'New analytics dashboard with detailed insights',
        'Time tracking with category-based organization',
        'Export functionality for goals and habits data'
      ],
      fixes: [
        'Fixed mobile navigation issues',
        'Resolved calendar sync problems',
        'Fixed notification timing bugs'
      ]
    },
    {
      version: 'v2.2.0',
      date: '2024-01-15',
      type: 'minor',
      features: [
        'Team collaboration features',
        'Goal sharing capabilities',
        'Group challenges and leaderboards'
      ],
      fixes: [
        'Fixed performance issues on large datasets',
        'Resolved memory leaks in long-running sessions'
      ]
    },
    {
      version: 'v2.1.0',
      date: '2024-01-01',
      type: 'patch',
      features: [
        'Dark mode support',
        'Customizable dashboard widgets',
        'Quick goal templates'
      ],
      fixes: [
        'Fixed login persistence issues',
        'Resolved duplicate goal creation bug'
      ]
    },
    {
      version: 'v2.0.0',
      date: '2023-12-15',
      type: 'major',
      features: [
        'Complete UI redesign with modern interface',
        'Advanced habit tracking with streaks',
        'Enhanced goal visualization',
        'Mobile app launch',
        'API v2 with improved performance'
      ],
      fixes: [
        'Migrated from legacy authentication system',
        'Improved data synchronization reliability'
      ]
    }
  ];

  const getVersionType = (type) => {
    switch(type) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Changelog</h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay updated with the latest features, improvements, and bug fixes
          </p>
        </div>

        {/* Version Selector */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedVersion('latest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedVersion === 'latest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Latest Release
            </button>
            <button
              onClick={() => setSelectedVersion('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedVersion === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Versions
            </button>
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {changelog.map((entry, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              {/* Version Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">{entry.version}</h2>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getVersionType(entry.type)}`}>
                    {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                  </span>
                </div>
                <span className="text-gray-500">{entry.date}</span>
              </div>

              {/* Features */}
              {entry.features && entry.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    New Features
                  </h3>
                  <ul className="space-y-2">
                    {entry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fixes */}
              {entry.fixes && entry.fixes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🔧</span>
                    Bug Fixes
                  </h3>
                  <ul className="space-y-2">
                    {entry.fixes.map((fix, fixIndex) => (
                      <li key={fixIndex} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {entry.improvements && entry.improvements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Improvements
                  </h3>
                  <ul className="space-y-2">
                    {entry.improvements.map((improvement, improvementIndex) => (
                      <li key={improvementIndex} className="flex items-start">
                        <span className="text-purple-500 mr-3 mt-1">↑</span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Want to Stay Updated?</h2>
            <p className="text-lg mb-6">
              Subscribe to our newsletter to get the latest updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                Sign Up for Updates
              </a>
              <a href="/features" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
                View All Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangelogPage;
