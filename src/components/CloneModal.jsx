import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Github, Loader2 } from 'lucide-react';
import { generatePortfolio } from '../utils/generatePortfolio';

export default function CloneModal({ isOpen, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    github: '',
    linkedin: '',
    twitter: '',
    projects: [{ title: '', description: '', tech: '', link: '', github: '' }],
    skills: '',
    resume: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      await generatePortfolio(formData);
      setTimeout(() => {
        setIsGenerating(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      setIsGenerating(false);
    }
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', tech: '', link: '', github: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
                        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Make This Portfolio Yours</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name*</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Professional Title*</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email*</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">About You*</label>
                <textarea
                  required
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none resize-none"
                  placeholder="Tell us about yourself, your experience, and what makes you unique..."
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter</label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Projects</label>
                  <button
                    type="button"
                    onClick={addProject}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    + Add Project
                  </button>
                </div>
                {formData.projects.map((project, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                    <div className="grid gap-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:border-purple-500 outline-none"
                      />
                      <textarea
                        placeholder="Project Description"
                        rows={2}
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:border-purple-500 outline-none resize-none"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={project.tech}
                        onChange={(e) => updateProject(index, 'tech', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:border-purple-500 outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="url"
                          placeholder="Live Link"
                          value={project.link}
                          onChange={(e) => updateProject(index, 'link', e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:border-purple-500 outline-none"
                        />
                        <input
                          type="url"
                          placeholder="GitHub Link"
                          value={project.github}
                          onChange={(e) => updateProject(index, 'github', e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:border-purple-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Skills (comma separated)*</label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="React, Node.js, MongoDB, Three.js..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Resume (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isGenerating}
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                                        <Loader2 className="animate-spin" size={20} />
                    Generating Your Portfolio...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Generate My Portfolio
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}