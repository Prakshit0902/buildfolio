import React, { useState, useEffect } from 'react';
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
import CloneModal from './components/CloneModal';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCloneModal, setShowCloneModal] = useState(false);

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
            <div className="text-4xl font-bold animate-pulse">Loading Portfolio...</div>
          </div>
        ) : (
          <>
            <Navbar onClone={() => setShowCloneModal(true)} />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <CloneModal 
              isOpen={showCloneModal} 
              onClose={() => setShowCloneModal(false)} 
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;