import { useState, useEffect, useContext } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280'];

function DashboardPage() {
  const { user } = useContext(UserContext);
  const [analytics, setAnalytics] = useState(null);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [period, setPeriod] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, period]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, goalsRes, habitsRes, timeRes] = await Promise.all([
        axios.get(`http://localhost:4000/analytics?period=${period}`, { withCredentials: true }),
        axios.get('http://localhost:4000/goals', { withCredentials: true }),
        axios.get('http://localhost:4000/habits', { withCredentials: true }),
        axios.get('http://localhost:4000/time-entries', { withCredentials: true })
      ]);

      setAnalytics(analyticsRes.data);
      setGoals(goalsRes.data);
      setHabits(habitsRes.data);
      setTimeEntries(timeRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = () => {
    if (!analytics) return [];
    return Object.entries(analytics.categoryBreakdown).map(([category, value]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value
    }));
  };

  const getWeeklyProgressData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      goals: Math.floor(Math.random() * 5) + 1,
      habits: Math.floor(Math.random() * 8) + 2,
      time: Math.floor(Math.random() * 120) + 30
    }));
  };

  const getMonthlyTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      productivity: Math.floor(Math.random() * 30) + 60,
      goals: Math.floor(Math.random() * 10) + 5,
      habits: Math.floor(Math.random() * 15) + 8
    }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Life Tracking Dashboard</h1>
        <p className="text-gray-600 mb-6">Comprehensive view of your personal and professional life</p>
        
        {/* Period Selector */}
        <div className="flex space-x-2">
          {['day', 'week', 'month', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg capitalize ${
                period === p 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Goals</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.totalGoals}</p>
            <p className="text-sm text-green-600 mt-1">
              {analytics.completedGoals} completed
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Habits</h3>
            <p className="text-3xl font-bold text-green-600">{analytics.activeHabits}</p>
            <p className="text-sm text-gray-600 mt-1">Daily tracking</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Time Tracked</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.floor(analytics.totalTrackedTime / 60)}h {analytics.totalTrackedTime % 60}m
            </p>
            <p className="text-sm text-gray-600 mt-1">Productive time</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-orange-600">
              {analytics.totalGoals > 0 
                ? Math.round((analytics.completedGoals / analytics.totalGoals) * 100) 
                : 0}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Goals achieved</p>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Life Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getCategoryData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getWeeklyProgressData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="goals" fill="#3B82F6" name="Goals" />
              <Bar dataKey="habits" fill="#10B981" name="Habits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Tracking Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Daily Time Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getWeeklyProgressData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="time" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Minutes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getMonthlyTrendData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="productivity" stroke="#F59E0B" name="Productivity %" />
              <Line type="monotone" dataKey="goals" stroke="#3B82F6" name="Goals" />
              <Line type="monotone" dataKey="habits" stroke="#10B981" name="Habits" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {goals.slice(0, 3).map(goal => (
            <div key={goal._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{goal.title}</p>
                <p className="text-sm text-gray-600">{goal.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                goal.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {goal.isCompleted ? 'Completed' : 'In Progress'}
              </span>
            </div>
          ))}
          {habits.slice(0, 2).map(habit => (
            <div key={habit._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{habit.title}</p>
                <p className="text-sm text-gray-600">{habit.category} • 🔥 {habit.currentStreak} day streak</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Daily Habit
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
