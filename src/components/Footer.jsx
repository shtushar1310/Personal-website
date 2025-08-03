import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      href: 'http://www.linkedin.com/in/shtushar1310',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      href: 'https://github.com/shtushar1310',
      label: 'GitHub'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      label: 'Twitter'
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0 text-center md:text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tushar Sharma
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 All rights reserved. Made with{' '}
              <Heart className="inline w-4 h-4 text-red-500 animate-pulse" />
              {' '}and modern web technologies.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-blue-600/30 transition-all duration-200 border border-white/10 hover:border-blue-500/30 shadow-lg hover:shadow-xl"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm">
            Built with React, Three.js, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 