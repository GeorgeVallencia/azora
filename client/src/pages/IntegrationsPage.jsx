import { useState } from 'react';

function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const integrations = [
    {
      name: 'Google Calendar',
      category: 'calendar',
      description: 'Sync your goals and deadlines with Google Calendar for seamless scheduling.',
      icon: '📅',
      status: 'available',
      setupTime: '2 minutes'
    },
    {
      name: 'Slack',
      category: 'communication',
      description: 'Share your progress and achievements with your team in Slack channels.',
      icon: '💬',
      status: 'available',
      setupTime: '3 minutes'
    },
    {
      name: 'Trello',
      category: 'project-management',
      description: 'Connect your project boards with goal tracking for better visibility.',
      icon: '📋',
      status: 'available',
      setupTime: '5 minutes'
    },
    {
      name: 'Microsoft Teams',
      category: 'communication',
      description: 'Integrate goal updates and notifications into Microsoft Teams.',
      icon: '👥',
      status: 'coming-soon',
      setupTime: '3 minutes'
    },
    {
      name: 'Notion',
      category: 'productivity',
      description: 'Sync your goals and habits with Notion databases.',
      icon: '📝',
      status: 'available',
      setupTime: '4 minutes'
    },
    {
      name: 'GitHub',
      category: 'development',
      description: 'Track coding goals and project milestones from GitHub repositories.',
      icon: '🐙',
      status: 'coming-soon',
      setupTime: '5 minutes'
    },
    {
      name: 'Zapier',
      category: 'automation',
      description: 'Connect Azora with 3000+ apps through Zapier automation.',
      icon: '⚡',
      status: 'available',
      setupTime: '10 minutes'
    },
    {
      name: 'Asana',
      category: 'project-management',
      description: 'Link project tasks with your personal goals for alignment.',
      icon: '🎯',
      status: 'coming-soon',
      setupTime: '6 minutes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations' },
    { id: 'calendar', name: 'Calendar' },
    { id: 'communication', name: 'Communication' },
    { id: 'project-management', name: 'Project Management' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'development', name: 'Development' },
    { id: 'automation', name: 'Automation' }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Integrations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect Azora with your favorite tools to streamline your productivity workflow
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredIntegrations.map((integration, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{integration.icon}</div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  integration.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {integration.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{integration.name}</h3>
              <p className="text-gray-600 mb-4">{integration.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  ⏱️ {integration.setupTime}
                </span>
                {integration.status === 'available' ? (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                    Connect
                  </button>
                ) : (
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed">
                    Notify Me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Developer Section */}
        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Build Your Own Integration</h2>
            <p className="text-lg mb-6">
              Use our powerful API to connect Azora with any tool you need
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-lg font-semibold mb-2">RESTful API</h3>
                <p>Complete API documentation with all endpoints</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔑</div>
                <h3 className="text-lg font-semibold mb-2">OAuth 2.0</h3>
                <p>Secure authentication for third-party apps</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2">Webhooks</h3>
                <p>Real-time notifications for events</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/docs" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                View API Docs
              </a>
              <a href="/contact" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationsPage;
