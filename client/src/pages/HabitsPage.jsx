import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const categories = ['personal', 'professional', 'health', 'finance', 'learning', 'relationships', 'other'];

function HabitsPage() {
  const { user } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    frequency: 'daily',
    targetDays: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://localhost:4000/habits', { withCredentials: true });
      setHabits(response.data);
    } catch (error) {
      console.error('Failed to fetch habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/habits', formData, { withCredentials: true });
      setFormData({
        title: '',
        description: '',
        category: 'personal',
        frequency: 'daily',
        targetDays: 1
      });
      setShowForm(false);
      fetchHabits();
    } catch (error) {
      console.error('Failed to create habit:', error);
    }
  };

  const toggleHabitCompletion = async (habitId) => {
    try {
      const habit = habits.find(h => h._id === habitId);
      const today = new Date().toDateString();
      const todayEntry = habit.completedDates.find(entry => 
        new Date(entry.date).toDateString() === today
      );
      
      await axios.post(`http://localhost:4000/habits/${habitId}/complete`, {
        completed: !todayEntry?.completed,
        notes: ''
      }, { withCredentials: true });
      
      fetchHabits();
    } catch (error) {
      console.error('Failed to toggle habit completion:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      professional: 'bg-green-100 text-green-800',
      health: 'bg-red-100 text-red-800',
      finance: 'bg-yellow-100 text-yellow-800',
      learning: 'bg-purple-100 text-purple-800',
      relationships: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getTodayCompletion = (habit) => {
    const today = new Date().toDateString();
    const todayEntry = habit.completedDates.find(entry => 
      new Date(entry.date).toDateString() === today
    );
    return todayEntry?.completed || false;
  };

  const getWeeklyCompletion = (habit) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return habit.completedDates.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo && entry.completed;
    }).length;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Habit Tracking</h1>
        <p className="text-gray-600 mb-6">Build and maintain positive habits with daily tracking</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add New Habit
        </button>
      </div>

      {/* Habit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Create New Habit</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habit Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Morning meditation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                    placeholder="Optional description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Days per Period
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="30"
                    value={formData.targetDays}
                    onChange={(e) => setFormData({...formData, targetDays: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Habit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      title: '',
                      description: '',
                      category: 'personal',
                      frequency: 'daily',
                      targetDays: 1
                    });
                  }}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map(habit => {
          const isCompletedToday = getTodayCompletion(habit);
          const weeklyCompletion = getWeeklyCompletion(habit);
          
          return (
            <div key={habit._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(habit.category)}`}>
                  {habit.category}
                </span>
              </div>

              {habit.description && (
                <p className="text-gray-600 text-sm mb-4">{habit.description}</p>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <p className="text-gray-600">Frequency: {habit.frequency}</p>
                  <p className="text-gray-600">Target: {habit.targetDays} days</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getStreakColor(habit.currentStreak)}`}>
                    🔥 {habit.currentStreak}
                  </p>
                  <p className="text-xs text-gray-600">day streak</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>This Week</span>
                  <span>{weeklyCompletion} / 7 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(weeklyCompletion / 7) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => toggleHabitCompletion(habit._id)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isCompletedToday
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isCompletedToday ? '✅ Completed Today' : '⭕ Mark as Complete'}
              </button>

              <div className="mt-4 text-xs text-gray-500">
                <p>Best streak: {habit.longestStreak} days</p>
                <p>Total completions: {habit.completedDates.filter(d => d.completed).length}</p>
              </div>
            </div>
          );
        })}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No habits yet. Start building positive habits!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Your First Habit
          </button>
        </div>
      )}

      {/* Weekly Overview */}
      {habits.length > 0 && (
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Weekly Overview</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + index + 1);
              const dateString = date.toDateString();
              
              const completedHabits = habits.filter(habit => {
                const dayEntry = habit.completedDates.find(entry => 
                  new Date(entry.date).toDateString() === dateString
                );
                return dayEntry?.completed;
              }).length;

              const totalHabits = habits.length;
              const percentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

              return (
                <div key={day} className="text-center">
                  <p className="text-xs text-gray-600 mb-2">{day}</p>
                  <div className={`w-full h-20 rounded-lg flex items-center justify-center text-xs font-medium ${
                    percentage === 100 ? 'bg-green-100 text-green-800' :
                    percentage >= 75 ? 'bg-blue-100 text-blue-800' :
                    percentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                    percentage > 0 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {completedHabits}/{totalHabits}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default HabitsPage;
