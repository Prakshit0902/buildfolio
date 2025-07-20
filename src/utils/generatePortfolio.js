import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generatePortfolio(formData) {
  const zip = new JSZip();
  
  // Create folder structure
  const src = zip.folder('src');
  const components = src.folder('components');
  const utils = src.folder('utils');
  
  // Generate personalized App.jsx
  const appContent = generateAppContent(formData);
  src.file('App.jsx', appContent);
  
  // Generate personalized components
  components.file('Hero.jsx', generateHeroContent(formData));
  components.file('About.jsx', generateAboutContent(formData));
  components.file('Projects.jsx', generateProjectsContent(formData));
  components.file('Skills.jsx', generateSkillsContent(formData));
  components.file('Contact.jsx', generateContactContent(formData));
  
  // Copy static components
  components.file('Navbar.jsx', getNavbarComponent());
  components.file('CustomCursor.jsx', getCustomCursorComponent());
  components.file('ScrollProgress.jsx', getScrollProgressComponent());
  components.file('ThreeBackground.jsx', getThreeBackgroundComponent());
  
  // Add package.json
  zip.file('package.json', generatePackageJson(formData.name));
  
  // Add README
  zip.file('README.md', generateReadme(formData));
  
  // Add CSS
  src.file('index.css', getCSSContent());
  
  // Add main.jsx
  src.file('main.jsx', getMainContent());
  
  // Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${formData.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`);
}

function generateAppContent(formData) {
  return `import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ThreeBackground from './components/ThreeBackground';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <ThreeBackground />
      
      <AnimatePresence>
        {isLoading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="text-4xl font-bold animate-pulse">Welcome to ${formData.name}'s Portfolio</div>
          </div>
        ) : (
          <>
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;`;
}

function generateHeroContent(formData) {
  const names = formData.name.split(' ');
  return `import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffect } from '@aceternity/ui';
import Spline from '@splinetool/react-spline';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const words = [
    { text: "Hi,", className: "text-white" },
    { text: "I'm", className: "text-white" },
    ${names.map(name => `{ text: "${name}", className: "text-purple-500" }`).join(',\n    ')},
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9P/scene.splinecode" />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TypewriterEffect words={words} className="text-6xl md:text-8xl font-bold mb-4" />
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            ${formData.title}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <a href="#projects" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all transform hover:scale-105">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600 rounded-full font-semibold transition-all transform hover:scale-105">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} className="text-purple-500" />
      </motion.div>
    </section>
  );
}`;
}

function generatePackageJson(name) {
  return `{
  "name": "${name.replace(/\s+/g, '-').toLowerCase()}-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "framer-motion": "^10.16.0",
    "@splinetool/react-spline": "^2.2.6",
    "@aceternity/ui": "^0.1.0",
    "lucide-react": "^0.303.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "react-intersection-observer": "^9.5.3",
    "react-parallax-tilt": "^1.7.175"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}`;
}
// Add these functions to the generatePortfolio.js file

function generateAboutContent(formData) {
  return `import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { Code2, Palette, Rocket } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const cards = [
    {
      icon: <Code2 size={40} />,
      title: "Clean Code",
      description: "Writing maintainable and scalable code with best practices"
    },
    {
      icon: <Palette size={40} />,
      title: "Creative Design", 
      description: "Bringing ideas to life with stunning visual experiences"
    },
    {
      icon: <Rocket size={40} />,
      title: "Performance",
      description: "Optimizing for speed and exceptional user experience"
    }
  ];

  return (
    <section id="about" ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          About <span className="text-purple-500">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              ${formData.about}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden">
              <Spline scene="https://prod.spline.design/VzSTJ1LN5DTJh5Cv/scene.splinecode" />
            </div>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="text-purple-500 mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
    </section>
  );
}`;
}

function generateProjectsContent(formData) {
  const projects = formData.projects.filter(p => p.title);
  
  return `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundGradient } from '@aceternity/ui';

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentProject, setCurrentProject] = useState(0);

  const projects = ${JSON.stringify(projects.map((p, i) => ({
    ...p,
    tech: p.tech.split(',').map(t => t.trim()),
    image: `https://source.unsplash.com/800x600/?coding,technology&sig=${i}`,
    color: ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500'][i % 3]
  })), null, 2)};

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          Featured <span className="text-purple-500">Projects</span>
        </h2>
        
        ${projects.length > 0 ? `
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
                  <div className={\`absolute inset-0 bg-gradient-to-br \${projects[currentProject].color} opacity-20\`} />
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
                  {projects[currentProject].github && (
                    <a 
                      href={projects[currentProject].github}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <Github size={20} />
                      Code
                    </a>
                  )}
                  {projects[currentProject].link && (
                    <a 
                      href={projects[currentProject].link}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-all"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {projects.length > 1 && (
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
          )}
        </div>
        ` : '<p className="text-center text-gray-400">No projects added yet.</p>'}
      </motion.div>
    </section>
  );
}`;
}

function generateSkillsContent(formData) {
  const skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return `import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skills = ${JSON.stringify(skills.slice(0, 6).map((skill, i) => ({
    name: skill,
    level: 75 + Math.random() * 20,
    category: ['Frontend', 'Backend', 'Database', 'Tools', 'Language', 'Framework'][i % 6]
  })), null, 2)};

  return (
    <section id="skills" ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          Skills & <span className="text-purple-500">Expertise</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{skill.name}</h3>
                <span className="text-sm text-purple-400">{skill.category}</span>
              </div>
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: \`\${skill.level}%\` } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              <span className="text-sm text-gray-400 mt-2">{Math.round(skill.level)}%</span>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          ${skills.map(skill => 
            `<span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              ${skill}
            </span>`
          ).join('\n          ')}
        </div>
      </motion.div>
    </section>
  );
}`;
}

function generateContactContent(formData) {
  return `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { BackgroundBeams } from '@aceternity/ui';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = \`mailto:${formData.email}?subject=Portfolio Contact from \${formData.name}&body=\${encodeURIComponent(formData.message)}\`;
    window.open(mailtoLink);
  };

  const socialLinks = [
    ${formData.github ? `{ icon: <Github size={24} />, href: "${formData.github}", label: "GitHub" },` : ''}
    ${formData.linkedin ? `{ icon: <Linkedin size={24} />, href: "${formData.linkedin}", label: "LinkedIn" },` : ''}
    ${formData.twitter ? `{ icon: <Twitter size={24} />, href: "${formData.twitter}", label: "Twitter" },` : ''}
  ].filter(Boolean);

  const contactInfo = [
    { icon: <Mail size={20} />, text: "${formData.email}" },
    ${formData.phone ? `{ icon: <Phone size={20} />, text: "${formData.phone}" },` : ''}
    ${formData.location ? `{ icon: <MapPin size={20} />, text: "${formData.location}" },` : ''}
  ].filter(Boolean);

  return (
    <section id="contact" ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <BackgroundBeams />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          Get In <span className="text-purple-500">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's work together</h3>
            <p className="text-gray-300 mb-8">
              I'm always interested in hearing about new projects and opportunities. 
                            Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-500">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/10 hover:bg-purple-500/20 rounded-full transition-all"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
          
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all resize-none"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Send Message
              <Send size={20} />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}`;
}

function generateReadme(formData) {
  return `# ${formData.name}'s Portfolio

An interactive 3D portfolio website built with React, Three.js, and Spline.

## 🚀 Features

- **Interactive 3D Graphics**: Stunning visual effects with Three.js and Spline
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works perfectly on all devices
- **Modern UI Components**: Using Aceternity UI for beautiful interfaces
- **Custom Cursor**: Enhanced user experience with custom cursor effects
- **Scroll Progress**: Visual scroll progress indicator

## 🛠️ Technologies Used

- React 18
- Three.js & React Three Fiber
- Spline for 3D scenes
- Framer Motion for animations
- Tailwind CSS for styling
- Aceternity UI components
- Vite for fast development

## 📦 Installation

1. Clone this repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🏗️ Building for Production

\`\`\`bash
npm run build
\`\`\`

## 📝 Customization

To customize this portfolio:

1. Update personal information in components
2. Replace project data with your own
3. Modify color schemes in tailwind.config.js
4. Add your own 3D models or Spline scenes

## 📧 Contact

- Email: ${formData.email}
${formData.github ? `- GitHub: ${formData.github}` : ''}
${formData.linkedin ? `- LinkedIn: ${formData.linkedin}` : ''}

## 📄 License

This project is open source and available under the MIT License.
`;
}

// Helper functions to get static component code
function getNavbarComponent() {
  return `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-300 \${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : ''
      }\`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </motion.a>
            ))}
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}`;
}

function getCustomCursorComponent() {
  return `import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
                className="fixed w-8 h-8 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
      />
    </>
  );
}`;
}

function getScrollProgressComponent() {
  return `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      <div className="fixed bottom-10 right-10 z-40">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={176}
            strokeDashoffset={176 - (176 * scrollProgress) / 100}
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </>
  );
}`;
}

function getThreeBackgroundComponent() {
  return `import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}`;
}

function getCSSContent() {
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  cursor: none;
}

body {
  font-family: 'Inter', sans-serif;
  background: #000;
  color: #fff;
  overflow-x: hidden;
  cursor: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8b5cf6, #ec4899);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7c3aed, #db2777);
}

/* Hide default cursor */
* {
  cursor: none !important;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Section padding */
section {
  @apply py-20 px-4 md:px-8 lg:px-16;
}`;
}

function getMainContent() {
  return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
}  