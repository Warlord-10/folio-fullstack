"use client"

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import CreateRock from './asteroids';

// import "@/DefaultPortfolio/animations.js"

const projects = [
    {
        id: 1,
        title: 'Folio',
        description: 'A portfolio hosting platform for developers.',
        image: '/project1.jpg',
        technologies: ['Next.js', 'Node.js', 'MongoDB'],
    },
    {
        id: 2,
        title: 'Beta-1',
        description: 'A personal assistant for your computer, capable of performing various tasks.',
        image: '/project2.jpg',
        technologies: ['Python', 'Machine Learning', 'Large Language Models'],
    },
    {
        id: 3,
        title: 'C-Compiler',
        description: 'A small compiler for the subset of C.',
        image: null,
        technologies: ['C']
    }
    // Add more projects as needed
];


function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#030014] to-black text-white p-10">
            <div className='h-[400px] w-full'></div>
            <h1 className="text-4xl font-bold mb-10">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedProject(project)}
                    >
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-300">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
                            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover mb-4 rounded" />
                            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map((tech) => (
                                    <span key={tech} className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <button
                                className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setSelectedProject(null)}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ProjectsPage;