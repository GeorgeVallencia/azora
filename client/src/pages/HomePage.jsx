import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

function HomePage() {
  const { user } = useContext(UserContext);
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTodayGoals();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTodayGoals = async () => {
    try {
      const response = await axios.get('http://localhost:4000/goals', { withCredentials: true });
      const allGoals = response.data;

      // Filter for today's goals (created today or with deadline today)
      const today = new Date().toDateString();
      const todayGoals = allGoals.filter(goal => {
        const goalDate = new Date(goal.createdAt).toDateString();
        const deadlineDate = goal.deadline ? new Date(goal.deadline).toDateString() : null;
        return goalDate === today || deadlineDate === today;
      });

      setGoals(todayGoals);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.trim()) return;

    try {
      const response = await axios.post('http://localhost:4000/goals', {
        title: newGoal,
        category: 'personal',
        targetValue: 1,
        unit: 'units'
      }, { withCredentials: true });

      setGoals([...goals, response.data]);
      setNewGoal('');
    } catch (error) {
      console.error('Failed to add goal:', error);
      alert('Failed to add goal');
    }
  };

  const toggleGoalComplete = async (goalId, currentStatus) => {
    console.log('Toggling goal:', goalId, 'from', currentStatus);

    const goal = goals.find(g => g._id === goalId);
    const newCompletedStatus = !currentStatus;
    const newCurrentValue = newCompletedStatus ? goal.targetValue : 0;

    // Optimistic update - update UI immediately
    setGoals(goals.map(g =>
      g._id === goalId
        ? { ...g, isCompleted: newCompletedStatus, currentValue: newCurrentValue }
        : g
    ));

    try {
      const response = await axios.put(`http://localhost:4000/goals/${goalId}`, {
        isCompleted: newCompletedStatus,
        currentValue: newCurrentValue
      }, { withCredentials: true });

      console.log('Update response:', response.data);

      // Update with server response to ensure consistency
      setGoals(goals.map(g =>
        g._id === goalId
          ? { ...g, isCompleted: response.data.isCompleted, currentValue: response.data.currentValue }
          : g
      ));
    } catch (error) {
      console.error('Failed to update goal:', error);
      // Revert on error
      setGoals(goals.map(g =>
        g._id === goalId
          ? { ...g, isCompleted: currentStatus, currentValue: goal.currentValue }
          : g
      ));
      alert('Failed to update goal status');
    }
  };

  const data = [
    { name: 'Mon', progress: 65 },
    { name: 'Tue', progress: 78 },
    { name: 'Wed', progress: 82 },
    { name: 'Thu', progress: 71 },
    { name: 'Fri', progress: 90 },
    { name: 'Sat', progress: 85 },
    { name: 'Sun', progress: 88 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto my-10 px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to Azora
            </h1>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your goals, build habits, and stay accountable with your personal achievement companion
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Started For Free
                </Link>
                <Link to="/login" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Login
                </Link>
              </div>
            )}
          </div>

          {user && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Progress Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Weekly Progress</h2>
                <LineChart width={400} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} />
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </div>

              {/* Daily Goals */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Today's Goals</h2>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading today's goals...
                  </div>
                ) : goals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No goals for today!</p>
                    <Link to="/goals" className="text-blue-600 hover:text-blue-700 font-medium">
                      Create your first goal →
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {goals.map(goal => (
                        <div key={goal._id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={goal.isCompleted}
                              onChange={() => toggleGoalComplete(goal._id, goal.isCompleted)}
                              className="w-5 h-5 text-blue-600 rounded"
                            />
                            <span className={goal.isCompleted ? 'line-through text-gray-500' : ''}>
                              {goal.title}
                            </span>
                          </div>
                          <span className="text-sm text-orange-600 font-medium">
                            🔥 {goal.streak || 0} days
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a new goal..."
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                        className="flex-1 border rounded-lg px-3 py-2"
                      />
                      <button
                        onClick={handleAddGoal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <Link to="/dashboard" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                <p className="text-gray-600 text-sm">View comprehensive analytics and insights</p>
              </Link>
              <Link to="/goals" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Goals</h3>
                <p className="text-gray-600 text-sm">Set and track your personal goals</p>
              </Link>
              <Link to="/habits" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-lg font-semibold mb-2">Habits</h3>
                <p className="text-gray-600 text-sm">Build and maintain daily habits</p>
              </Link>
              <Link to="/time-tracking" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-lg font-semibold mb-2">Time Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor how you spend your time</p>
              </Link>
            </div>
          )}

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Powerful Features to Transform Your Productivity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Goal Tracking</h3>
                <p className="text-gray-600">Set and track daily goals with visual progress indicators and milestone celebrations</p>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-2">Streak Building</h3>
                <p className="text-gray-600">Build consistent habits with streak tracking and motivational rewards</p>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
                <p className="text-gray-600">Visualize your progress with detailed charts and actionable insights</p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Everything You Need to Succeed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold mb-2">Mobile Friendly</h4>
                <p className="text-gray-600 text-sm">Access your goals anywhere, anytime</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h4 className="font-semibold mb-2">Secure & Private</h4>
                <p className="text-gray-600 text-sm">Your data is encrypted and protected</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-semibold mb-2">Beautiful Design</h4>
                <p className="text-gray-600 text-sm">Clean, intuitive interface that motivates</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="font-semibold mb-2">Fast & Reliable</h4>
                <p className="text-gray-600 text-sm">Lightning-fast performance you can count on</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Azora</h3>
              <p className="text-gray-400 mb-4">
                Your personal achievement companion for tracking goals, building habits, and staying accountable.
              </p>
              {/* Location */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-300">Location</h4>
                <address className="text-gray-400 not-italic">
                  <p className="flex items-center mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l4.95-4.95a7 7 0 10-9.9-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    104 Riverside Drive, Riverside Square, Nairobi
                  </p>
                  <p className="text-sm ml-6">Kenya</p>
                </address>
              </div>
              {/* Contact */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-300">Contact</h4>
                <p className="text-gray-400 text-sm">
                  <a href="mailto:hello@azora.com" className="hover:text-white transition-colors">
                    hello@azora.com
                  </a>
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="/changelog" className="text-gray-400 hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2026 Azora. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;