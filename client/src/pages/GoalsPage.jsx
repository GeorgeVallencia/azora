import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const categories = ['personal', 'professional', 'health', 'finance', 'learning', 'relationships', 'other'];

function GoalsPage() {
  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    targetValue: 1,
    unit: 'units',
    deadline: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:4000/goals', { withCredentials: true });
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    console.log('Editing goal:', editingGoal);

    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter a goal title');
      return;
    }

    if (!formData.category) {
      alert('Please select a category');
      return;
    }

    if (formData.targetValue < 1) {
      alert('Target value must be at least 1');
      return;
    }

    try {
      if (editingGoal) {
        console.log('Updating goal...');
        const response = await axios.put(`http://localhost:4000/goals/${editingGoal._id}`, formData, { withCredentials: true });
        console.log('Update response:', response);
      } else {
        console.log('Creating new goal...');
        const response = await axios.post('http://localhost:4000/goals', formData, { withCredentials: true });
        console.log('Create response:', response);
      }

      setFormData({
        title: '',
        description: '',
        category: 'personal',
        targetValue: 1,
        unit: 'units',
        deadline: ''
      });
      setShowForm(false);
      setEditingGoal(null);
      fetchGoals();
    } catch (error) {
      console.error('Failed to save goal:', error);
      console.error('Error response:', error.response);
      alert('Failed to save goal: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || '',
      category: goal.category,
      targetValue: goal.targetValue,
      unit: goal.unit,
      deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`http://localhost:4000/goals/${goalId}`, { withCredentials: true });
        fetchGoals();
      } catch (error) {
        console.error('Failed to delete goal:', error);
      }
    }
  };

  const updateProgress = async (goalId, newValue) => {
    try {
      await axios.put(`http://localhost:4000/goals/${goalId}`, {
        currentValue: newValue,
        isCompleted: newValue >= goals.find(g => g._id === goalId).targetValue
      }, { withCredentials: true });
      fetchGoals();
    } catch (error) {
      console.error('Failed to update progress:', error);
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

  const getProgressPercentage = (goal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Goals Management</h1>
        <p className="text-gray-600 mb-6">Set and track your personal and professional goals</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add New Goal
        </button>
      </div>

      {/* Goal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">
              {editingGoal ? 'Edit Goal' : 'Create New Goal'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Read 12 books this year"
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
                    placeholder="Optional description..."
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
                      Target Value
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.targetValue}
                      onChange={(e) => setFormData({ ...formData, targetValue: parseInt(e.target.value) })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., books, hours, kg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingGoal(null);
                    setFormData({
                      title: '',
                      description: '',
                      category: 'personal',
                      targetValue: 1,
                      unit: 'units',
                      deadline: ''
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

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <div key={goal._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                {goal.category}
              </span>
            </div>

            {goal.description && (
              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
            )}

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(goal)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getProgressPercentage(goal).toFixed(1)}% complete
              </p>
            </div>

            {goal.deadline && (
              <p className="text-sm text-gray-600 mb-4">
                📅 {new Date(goal.deadline).toLocaleDateString()}
              </p>
            )}

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="number"
                min="0"
                max={goal.targetValue}
                value={goal.currentValue}
                onChange={(e) => updateProgress(goal._id, parseInt(e.target.value) || 0)}
                className="w-20 border rounded px-2 py-1 text-sm"
              />
              <span className="text-sm text-gray-600">{goal.unit}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(goal)}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(goal._id)}
                className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 text-sm"
              >
                Delete
              </button>
            </div>

            {goal.isCompleted && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✅ Completed
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No goals yet. Start by creating your first goal!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Your First Goal
          </button>
        </div>
      )}
    </div>
  );
}

export default GoalsPage;
