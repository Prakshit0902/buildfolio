import React from 'react';
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
    <section ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
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
              I'm a passionate full-stack developer with a keen eye for design and a love for creating 
              immersive digital experiences. With expertise in modern web technologies and a creative 
              mindset, I transform ideas into reality.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My journey in tech has been driven by curiosity and a desire to push boundaries. 
              I specialize in React, Three.js, and creating interactive 3D web experiences that 
              leave lasting impressions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden">
                    <Spline
                      scene="https://prod.spline.design/HufqIUO7oCIViwTR/scene.splinecode" 
                    />
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
}   