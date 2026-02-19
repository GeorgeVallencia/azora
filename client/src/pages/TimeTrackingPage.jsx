import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const categories = ['personal', 'professional', 'health', 'finance', 'learning', 'relationships', 'other'];

function TimeTrackingPage() {
  const { user } = useContext(UserContext);
  const [timeEntries, setTimeEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'professional',
    startTime: new Date().toISOString().slice(0, 16),
    endTime: '',
    duration: 0,
    tags: '',
    productivity: 5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTimeEntries();
    }
  }, [user]);

  useEffect(() => {
    let interval;
    if (activeTimer) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - new Date(activeTimer.startTime)) / 1000 / 60));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const fetchTimeEntries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/time-entries', { withCredentials: true });
      setTimeEntries(response.data);
    } catch (error) {
      console.error('Failed to fetch time entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your time entry');
      return;
    }

    const timerEntry = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startTime: new Date(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setActiveTimer(timerEntry);
  };

  const stopTimer = async () => {
    if (!activeTimer) return;

    const endTime = new Date();
    const duration = Math.floor((endTime - new Date(activeTimer.startTime)) / 1000 / 60);

    try {
      await axios.post('http://localhost:4000/time-entries', {
        ...activeTimer,
        endTime,
        duration,
        productivity: formData.productivity
      }, { withCredentials: true });

      setActiveTimer(null);
      setElapsedTime(0);
      setFormData({
        title: '',
        description: '',
        category: 'professional',
        startTime: new Date().toISOString().slice(0, 16),
        endTime: '',
        duration: 0,
        tags: '',
        productivity: 5
      });
      fetchTimeEntries();
    } catch (error) {
      console.error('Failed to save time entry:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startTime = new Date(formData.startTime);
      const endTime = formData.endTime ? new Date(formData.endTime) : new Date();
      const duration = Math.floor((endTime - startTime) / 1000 / 60);

      await axios.post('http://localhost:4000/time-entries', {
        ...formData,
        endTime,
        duration,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }, { withCredentials: true });

      setFormData({
        title: '',
        description: '',
        category: 'professional',
        startTime: new Date().toISOString().slice(0, 16),
        endTime: '',
        duration: 0,
        tags: '',
        productivity: 5
      });
      setShowForm(false);
      fetchTimeEntries();
    } catch (error) {
      console.error('Failed to create time entry:', error);
    }
  };

  const deleteEntry = async (entryId) => {
    if (confirm('Are you sure you want to delete this time entry?')) {
      try {
        await axios.delete(`http://localhost:4000/time-entries/${entryId}`, { withCredentials: true });
        fetchTimeEntries();
      } catch (error) {
        console.error('Failed to delete time entry:', error);
      }
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

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTodayTotal = () => {
    const today = new Date().toDateString();
    return timeEntries
      .filter(entry => new Date(entry.startTime).toDateString() === today)
      .reduce((total, entry) => total + entry.duration, 0);
  };

  const getWeekTotal = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return timeEntries
      .filter(entry => new Date(entry.startTime) >= weekAgo)
      .reduce((total, entry) => total + entry.duration, 0);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading time entries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Time Tracking</h1>
        <p className="text-gray-600 mb-6">Track how you spend your time across different activities</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Today</p>
            <p className="text-2xl font-bold text-blue-600">{formatDuration(getTodayTotal())}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-green-600">{formatDuration(getWeekTotal())}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Entries</p>
            <p className="text-2xl font-bold text-purple-600">{timeEntries.length}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Entry
          </button>
        </div>
      </div>

      {/* Active Timer */}
      {activeTimer && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{activeTimer.title}</h3>
              <p className="text-gray-600">{activeTimer.category}</p>
              {activeTimer.description && <p className="text-sm text-gray-500">{activeTimer.description}</p>}
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{formatTimer(elapsedTime)}</p>
              <button
                onClick={stopTimer}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Stop Timer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Timer */}
      {!activeTimer && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Timer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="What are you working on?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border rounded-lg px-3 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows="2"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={startTimer}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              ▶️ Start Timer
            </button>
          </div>
        </div>
      )}

      {/* Time Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Add Time Entry</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., urgent, client, project-a"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Productivity (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.productivity}
                    onChange={(e) => setFormData({ ...formData, productivity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{formData.productivity}/10</div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Time Entries List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Recent Time Entries</h2>
        </div>
        <div className="divide-y">
          {timeEntries.slice(0, 20).map(entry => (
            <div key={entry._id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                      {entry.category}
                    </span>
                    <span className="text-sm text-gray-500">{formatDuration(entry.duration)}</span>
                  </div>
                  {entry.description && (
                    <p className="text-gray-600 text-sm mb-2">{entry.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>🕐 {new Date(entry.startTime).toLocaleString()}</span>
                    {entry.endTime && (
                      <span>🏁 {new Date(entry.endTime).toLocaleString()}</span>
                    )}
                    <span>⭐ Productivity: {entry.productivity}/10</span>
                  </div>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      {entry.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteEntry(entry._id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {timeEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No time entries yet. Start tracking your time!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Your First Entry
          </button>
        </div>
      )}
    </div>
  );
}

export default TimeTrackingPage;
