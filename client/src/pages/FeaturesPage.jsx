import { useState } from 'react';

function FeaturesPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Azora Features</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover everything Azora has to offer to transform your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Goal Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Goal Tracking</h3>
            <p className="text-gray-600 mb-4">
              Set ambitious goals and track your progress with visual indicators and milestone celebrations.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> SMART goal templates</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Progress visualization</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Milestone tracking</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Achievement badges</li>
            </ul>
          </div>

          {/* Habit Building */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-semibold mb-3">Habit Building</h3>
            <p className="text-gray-600 mb-4">
              Build consistent daily habits with streak tracking and motivational rewards system.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom habit frequencies</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Streak visualization</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Habit reminders</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Performance analytics</li>
            </ul>
          </div>

          {/* Time Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-3">Time Tracking</h3>
            <p className="text-gray-600 mb-4">
              Monitor how you spend your time with detailed analytics and productivity insights.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Live timer functionality</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Manual time entry</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Category-based tracking</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Productivity scoring</li>
            </ul>
          </div>

          {/* Analytics Dashboard */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive analytics with charts, graphs, and actionable insights for improvement.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Multiple chart types</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Trend analysis</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Category breakdowns</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Export capabilities</li>
            </ul>
          </div>

          {/* Collaboration */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-gray-600 mb-4">
              Share goals and progress with team members for accountability and motivation.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Team goal sharing</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Progress visibility</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Group challenges</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Leaderboards</li>
            </ul>
          </div>

          {/* Mobile App */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">Mobile Experience</h3>
            <p className="text-gray-600 mb-4">
              Access your goals and habits anywhere with our responsive mobile app design.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Progressive Web App</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Offline mode</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Push notifications</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Sync across devices</li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3">Security & Privacy</h3>
            <p className="text-gray-600 mb-4">
              Your data is encrypted and protected with enterprise-grade security measures.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> End-to-end encryption</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> GDPR compliant</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Data backup</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Privacy controls</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Join thousands of users who are already achieving their goals with Azora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                Start Free Trial
              </a>
              <a href="/login" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Get the latest features, productivity tips, and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
