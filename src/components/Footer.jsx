import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';

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
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <p className="text-gray-400">
              © 2025 Tushar Sharma. All rights reserved.
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
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 