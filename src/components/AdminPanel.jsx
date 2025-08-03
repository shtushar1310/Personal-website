import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabaseHelpers } from '../utils/supabase';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    github_url: '',
    live_url: '',
    tech_stack: []
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: ''
  });

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: ''
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await supabaseHelpers.createProject({
        ...newProject,
        tech_stack: newProject.tech_stack.filter(tech => tech.trim() !== '')
      });
      
      setMessage('Project added successfully!');
      setNewProject({
        title: '',
        description: '',
        image_url: '',
        github_url: '',
        live_url: '',
        tech_stack: []
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await supabaseHelpers.createSkill(newSkill);
      setMessage('Skill added successfully!');
      setNewSkill({ name: '', category: '' });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await supabaseHelpers.createExperience(newExperience);
      setMessage('Experience added successfully!');
      setNewExperience({
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        description: ''
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addTechStack = () => {
    setNewProject(prev => ({
      ...prev,
      tech_stack: [...prev.tech_stack, '']
    }));
  };

  const updateTechStack = (index, value) => {
    setNewProject(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.map((tech, i) => i === index ? value : tech)
    }));
  };

  const removeTechStack = (index) => {
    setNewProject(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
          {['projects', 'skills', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">Add New Project</h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newProject.image_url}
                    onChange={(e) => setNewProject(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={newProject.github_url}
                    onChange={(e) => setNewProject(prev => ({ ...prev, github_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Live URL</label>
                <input
                  type="url"
                  value={newProject.live_url}
                  onChange={(e) => setNewProject(prev => ({ ...prev, live_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Technologies</label>
                <div className="space-y-2">
                  {newProject.tech_stack.map((tech, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechStack(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Technology name"
                      />
                      <button
                        type="button"
                        onClick={() => removeTechStack(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={20} />
                    Add Technology
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">Add New Skill</h2>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools & Others">Tools & Others</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Skill'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">Add New Experience</h2>
            <form onSubmit={handleAddExperience} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newExperience.start_date}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, start_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">End Date (leave empty if current)</label>
                  <input
                    type="date"
                    value={newExperience.end_date}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, end_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Experience'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 