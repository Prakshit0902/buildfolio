import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: "3D Portfolio Showcase",
      description: "An immersive portfolio experience built with Three.js and React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      tech: ["React", "Three.js", "Framer Motion"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI-Powered Chat App",
      description: "Real-time chat application with AI integration and voice features",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      tech: ["Next.js", "OpenAI", "Socket.io"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with 3D product visualization",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          Featured <span className="text-purple-500">Projects</span>
        </h2>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <BackgroundGradient className="rounded-2xl p-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={projects[currentProject].image} 
                    alt={projects[currentProject].title}
                    className="w-full h-80 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${projects[currentProject].color} opacity-20`} />
                </div>
              </BackgroundGradient>
              
              <div>
                <h3 className="text-3xl font-bold mb-4">{projects[currentProject].title}</h3>
                <p className="text-gray-300 mb-6">{projects[currentProject].description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[currentProject].tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={projects[currentProject].github}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                  >
                    <Github size={20} />
                    Code
                  </a>
                  <a 
                    href={projects[currentProject].live}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-all"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prevProject}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextProject}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              onClick={() => setCurrentProject(index)}
              className={`cursor-pointer p-4 rounded-xl transition-all ${
                currentProject === index ? 'bg-purple-500/20 scale-105' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <h4 className="font-semibold mb-2">{project.title}</h4>
              <p className="text-sm text-gray-400">{project.tech.join(' • ')}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}