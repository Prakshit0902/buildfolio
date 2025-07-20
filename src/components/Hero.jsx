import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import Spline from '@splinetool/react-spline';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const words = [
    { text: "Hi,", className: "text-white" },
    { text: "We are", className: "text-white" },
    { text: "John", className: "text-purple-500" },
    { text: "Doe", className: "text-purple-500" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
      <Spline
        scene="https://prod.spline.design/HufqIUO7oCIViwTR/scene.splinecode" 
      />
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
            Full Stack Developer & Creative Technologist
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all transform hover:scale-105">
              View Projects
            </button>
            <button className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600 rounded-full font-semibold transition-all transform hover:scale-105">
              Contact Me
            </button>
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
}