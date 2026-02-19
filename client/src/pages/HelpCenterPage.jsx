import { useState } from 'react';

function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpArticles = [
    {
      id: 1,
      title: 'Getting Started with Azora',
      category: 'getting-started',
      excerpt: 'Learn the basics of Azora and start tracking your goals and habits effectively.',
      content: 'Azora is a comprehensive productivity platform designed to help you achieve your goals and build lasting habits. This guide will walk you through setting up your account, creating your first goals, and understanding the key features.',
      readTime: '5 min read',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'Setting SMART Goals',
      category: 'goals',
      excerpt: 'Master the art of setting Specific, Measurable, Achievable, Relevant, and Time-bound goals.',
      content: 'SMART goals are the foundation of effective goal setting. Learn how to transform vague aspirations into concrete, actionable objectives that drive real results.',
      readTime: '8 min read',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: 'Building Consistent Habits',
      category: 'habits',
      excerpt: 'Discover proven strategies for building habits that stick and transform your daily routine.',
      content: 'Habit formation is both an art and a science. This comprehensive guide covers the psychology behind habit formation and practical techniques for building lasting positive changes.',
      readTime: '10 min read',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'Time Tracking Best Practices',
      category: 'time-tracking',
      excerpt: 'Learn how to effectively track your time and gain insights into your productivity patterns.',
      content: 'Time tracking is more than just logging hours - it\'s about understanding where your time goes and making informed decisions about how to spend it better.',
      readTime: '7 min read',
      difficulty: 'beginner'
    },
    {
      id: 5,
      title: 'Using Analytics and Reports',
      category: 'analytics',
      excerpt: 'Make data-driven decisions with Azora\'s powerful analytics and reporting features.',
      content: 'Your productivity data tells a story. Learn how to interpret analytics, create custom reports, and use insights to optimize your goal achievement strategy.',
      readTime: '12 min read',
      difficulty: 'advanced'
    },
    {
      id: 6,
      title: 'Team Collaboration Guide',
      category: 'collaboration',
      excerpt: 'Work effectively with team members to achieve shared goals and maintain accountability.',
      content: 'Collaboration amplifies individual effort. This guide covers how to share goals, provide feedback, and create a culture of mutual support within your team.',
      readTime: '9 min read',
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'Mobile App Features',
      category: 'mobile',
      excerpt: 'Get the most out of Azora\'s mobile app for on-the-go productivity tracking.',
      content: 'The Azora mobile app brings all the power of our desktop platform to your pocket. Learn about offline mode, push notifications, and mobile-specific features.',
      readTime: '6 min read',
      difficulty: 'beginner'
    },
    {
      id: 8,
      title: 'Troubleshooting Common Issues',
      category: 'troubleshooting',
      excerpt: 'Quick solutions to the most common problems users encounter with Azora.',
      content: 'Having trouble? We\'ve compiled solutions to the most frequently reported issues, from login problems to sync errors and everything in between.',
      readTime: '8 min read',
      difficulty: 'beginner'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'goals', name: 'Goals' },
    { id: 'habits', name: 'Habits' },
    { id: 'time-tracking', name: 'Time Tracking' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'collaboration', name: 'Collaboration' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'troubleshooting', name: 'Troubleshooting' }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers, guides, and resources to make the most of Azora
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for help articles..."
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

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Quick Start</h3>
            <p className="text-gray-600 text-sm">Get up and running in minutes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">User Guide</h3>
            <p className="text-gray-600 text-sm">Complete documentation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl mb-3">🎥</div>
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-gray-600 text-sm">Step-by-step visual guides</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-gray-600 text-sm">Get help from other users</p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(article.difficulty)}`}>
                  {article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Read Article →
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Articles Found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-6">
            Our support team is here to help you succeed with Azora
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              Contact Support
            </a>
            <a href="/docs" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;
