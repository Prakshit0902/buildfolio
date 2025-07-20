import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HoverEffect } from '../components/ui/card-hover-effect';

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skills = [
    { name: "React", level: 95, category: "Frontend" },
    { name: "Three.js", level: 85, category: "3D Graphics" },
    { name: "Node.js", level: 90, category: "Backend" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "GraphQL", level: 78, category: "API" },
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      description: "React, Vue, Angular, Next.js",
      link: "#",
    },
    {
      title: "Backend Development",
      description: "Node.js, Express, Python, Django",
      link: "#",
    },
    {
      title: "3D & Animation",
      description: "Three.js, Spline, Blender, WebGL",
      link: "#",
    },
    {
      title: "Database & Cloud",
      description: "MongoDB, PostgreSQL, AWS, Docker",
      link: "#",
    },
    {
      title: "Design Tools",
      description: "Figma, Adobe XD, Photoshop, Illustrator",
      link: "#",
    },
    {
      title: "DevOps & Tools",
      description: "Git, CI/CD, Kubernetes, Testing",
      link: "#",
    },
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
          Skills & <span className="text-purple-500">Expertise</span>
        </h2>
        
        {/* Animated 3D Text Alternative */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1, type: "spring" }}
            className="inline-block"
          >
            <h3 className="text-7xl md:text-9xl font-bold gradient-text mb-8">
              SKILLS
            </h3>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{skill.name}</h3>
                <span className="text-sm text-purple-400">{skill.category}</span>
              </div>
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              <span className="text-sm text-gray-400 mt-2">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
        
        <HoverEffect items={skillCategories} className="grid md:grid-cols-2 lg:grid-cols-3" />
      </motion.div>
    </section>
  );
}