import { useState } from 'react';

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: '10 Productivity Hacks That Actually Work',
      excerpt: 'Discover proven strategies to boost your productivity and achieve more in less time.',
      author: 'Sarah Chen',
      date: '2024-02-05',
      category: 'productivity',
      readTime: '5 min read',
      image: '📈',
      featured: true
    },
    {
      id: 2,
      title: 'Building Habits That Stick: The Science Behind It',
      excerpt: 'Learn the psychological principles that make habit formation successful and sustainable.',
      author: 'Marcus Rodriguez',
      date: '2024-02-01',
      category: 'habits',
      readTime: '8 min read',
      image: '🧠',
      featured: false
    },
    {
      id: 3,
      title: 'Goal Setting for Beginners: A Complete Guide',
      excerpt: 'Step-by-step approach to setting meaningful goals and creating action plans.',
      author: 'Emily Johnson',
      date: '2024-01-28',
      category: 'goals',
      readTime: '6 min read',
      image: '🎯',
      featured: false
    },
    {
      id: 4,
      title: 'Time Management Tips for Remote Workers',
      excerpt: 'Essential strategies to maintain productivity while working from home.',
      author: 'David Kim',
      date: '2024-01-25',
      category: 'productivity',
      readTime: '7 min read',
      image: '⏰',
      featured: false
    },
    {
      id: 5,
      title: 'The Power of Accountability Partners',
      excerpt: 'How having an accountability partner can transform your goal achievement.',
      author: 'Sarah Chen',
      date: '2024-01-20',
      category: 'motivation',
      readTime: '5 min read',
      image: '🤝',
      featured: false
    },
    {
      id: 6,
      title: 'Digital Detox: Reclaiming Your Focus',
      excerpt: 'Practical steps to reduce digital distractions and improve concentration.',
      author: 'Marcus Rodriguez',
      date: '2024-01-15',
      category: 'wellness',
      readTime: '9 min read',
      image: '🧘',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'habits', name: 'Habits' },
    { id: 'goals', name: 'Goals' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Azora Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and strategies to help you achieve your goals and build better habits
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === 'all' && featuredPost && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4">{featuredPost.image}</div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {featuredPost.author} • {featuredPost.date} • {featuredPost.readTime}
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                    Read More
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">{featuredPost.image}</div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts
            .filter(post => selectedCategory !== 'all' || !post.featured)
            .map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="text-4xl mb-4 text-center">{post.image}</div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {post.author} • {post.date}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Inspired</h2>
            <p className="text-lg mb-6">
              Get our best content delivered to your inbox every week
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
