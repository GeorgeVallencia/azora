import { useState } from 'react';

function DocumentationPage() {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/auth/register',
      description: 'Register a new user account',
      parameters: {
        name: 'string',
        email: 'string',
        password: 'string',
        phone: 'string (optional)',
        dateOfBirth: 'string (optional)',
        occupation: 'string (optional)',
        company: 'string (optional)'
      },
      response: {
        message: 'string',
        user: 'object',
        token: 'string'
      }
    },
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'Authenticate user and receive access token',
      parameters: {
        email: 'string',
        password: 'string'
      },
      response: {
        id: 'string',
        name: 'string',
        email: 'string',
        token: 'string'
      }
    },
    {
      method: 'GET',
      endpoint: '/api/goals',
      description: 'Retrieve all goals for authenticated user',
      parameters: {
        Authorization: 'Bearer token (header)'
      },
      response: {
        goals: 'array'
      }
    },
    {
      method: 'POST',
      endpoint: '/api/goals',
      description: 'Create a new goal',
      parameters: {
        title: 'string',
        description: 'string',
        targetDate: 'string',
        category: 'string'
      },
      response: {
        id: 'string',
        title: 'string',
        description: 'string',
        createdAt: 'string'
      }
    }
  ];

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'authentication', name: 'Authentication', icon: '🔐' },
    { id: 'goals', name: 'Goals API', icon: '🎯' },
    { id: 'habits', name: 'Habits API', icon: '🔥' },
    { id: 'time-tracking', name: 'Time Tracking', icon: '⏰' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'webhooks', name: 'Webhooks', icon: '🪝' },
    { id: 'examples', name: 'Code Examples', icon: '💻' }
  ];

  const renderContent = () => {
    switch(selectedSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
              <p className="text-gray-600 mb-4">
                Welcome to the Azora API documentation. This API allows you to integrate Azora's goal tracking, 
                habit building, and productivity features into your own applications.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Base URL</h4>
                <code className="bg-gray-800 text-white px-3 py-1 rounded">
                  https://api.azora.com/v1
                </code>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Authentication</h3>
              <p className="text-gray-600 mb-4">
                All API requests require authentication using JWT tokens. Include the token in the Authorization header:
              </p>
              <code className="bg-gray-800 text-white px-3 py-1 rounded block">
                Authorization: Bearer YOUR_TOKEN_HERE
              </code>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Rate Limits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 1000 requests per hour for authenticated users</li>
                <li>• 100 requests per hour for unauthenticated users</li>
                <li>• Rate limit headers included in all responses</li>
              </ul>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Authentication Endpoints</h3>
              <div className="space-y-6">
                {apiEndpoints.filter(endpoint => endpoint.endpoint.includes('/auth')).map((endpoint, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">
                        {endpoint.method}
                      </span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-gray-600 mb-3">{endpoint.description}</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-semibold mb-2">Parameters:</h5>
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(endpoint.parameters, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Goals API</h3>
              <p className="text-gray-600 mb-4">
                Manage user goals including creation, retrieval, updates, and deletion.
              </p>
              <div className="space-y-6">
                {apiEndpoints.filter(endpoint => endpoint.endpoint.includes('/goals')).map((endpoint, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm mr-2">
                        {endpoint.method}
                      </span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-gray-600 mb-3">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-gray-600">
              Documentation for this section is being developed and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete API reference for integrating Azora into your applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>

        {/* SDK Section */}
        <div className="mt-12 bg-blue-600 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">SDKs & Libraries</h2>
            <p className="text-lg mb-6">
              Get started quickly with our official SDKs for popular platforms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-3">⚛️</div>
                <h3 className="text-lg font-semibold mb-2">JavaScript/React</h3>
                <p>npm install azora-js</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🐍</div>
                <h3 className="text-lg font-semibold mb-2">Python</h3>
                <p>pip install azora-python</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-semibold mb-2">iOS/Android</h3>
                <p>Native mobile SDKs</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/integrations" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                View All Integrations
              </a>
              <a href="/contact" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
                Get API Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentationPage;
