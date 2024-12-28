"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Node.js', icon: '🟩', color: '#339933' },
  { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
  { name: 'TypeScript', icon: '🔷', color: '#3178C6' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'GraphQL', icon: '🟣', color: '#E10098' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Git', icon: '📂', color: '#F05032' },
];

function TechStackPage() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="relative z-20 min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">My Tech Stack</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-4xl mb-2">{tech.icon}</div>
            <h2 className="text-xl font-semibold">{tech.name}</h2>
            {hoveredTech === tech.name && (
              <motion.div
                className="mt-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click to learn more
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TechStackPage;