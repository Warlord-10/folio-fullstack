"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="relative bg-black text-white py-16 overflow-hidden  z-20">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            className="w-full md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Explore the Cosmos</h3>
            <p className="text-gray-400">Join me on a journey through the digital universe.</p>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3 mb-8 md:mb-0 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                fill="#8B5CF6"
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
            <motion.p
              className="mt-4 font-semibold"
              animate={{ color: isHovered ? "#8B5CF6" : "#FFFFFF" }}
            >
              Deepanshu Joshi
            </motion.p>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3 text-right"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Warlord-10" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/deepanshu10joshi" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">LinkedIn</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Deepanshu Joshi. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Shooting star */}
      <motion.div
        className="absolute bg-white"
        style={{
          width: '2px',
          height: '2px',
          boxShadow: '0 0 4px 2px white',
        }}
        initial={{ x: '-100%', y: 0 }}
        animate={{ x: '200%', y: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 5,
        }}
      />
    </footer>
  );
};

export default Footer;