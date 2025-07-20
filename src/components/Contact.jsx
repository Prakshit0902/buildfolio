import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { BackgroundLines } from '../components/ui/background-lines';

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
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { icon: <Github size={24} />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={24} />, href: "https://twitter.com", label: "Twitter" },
  ];

  const contactInfo = [
    { icon: <Mail size={20} />, text: "john.doe@example.com" },
    { icon: <Phone size={20} />, text: "+1 (555) 123-4567" },
    { icon: <MapPin size={20} />, text: "San Francisco, CA" },
  ];

  return (
    <section ref={ref} className="relative py-20 px-4 md:px-8 lg:px-16">
      <BackgroundLines />
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
}