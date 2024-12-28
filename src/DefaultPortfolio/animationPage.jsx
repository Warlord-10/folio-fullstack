"use client"
import { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, Html, Line } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

function ProjectSphere({ position, texture, projectName, orbitRadius, orbitSpeed, onClick, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
    meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
    meshRef.current.rotation.y += 0.01;

    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial map={useTexture(texture)} />
        {hovered && (
          <Html>
            <div className="bg-black bg-opacity-75 text-white p-2 rounded">
              {projectName}
            </div>
          </Html>
        )}
      </mesh>
      {isSelected && (
        <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="yellow" transparent opacity={0.3} />
        </mesh>
      )}
    </>
  );
}

function OrbitLines({ radius }) {
  const points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }
    return points;
  }, [radius]);

  return <Line points={points} color="gray" lineWidth={1} />;
}

function Sun() {
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    '/color.jpg',
    '/normal.png',
    '/occlusion.jpg'
  ]);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
    </mesh>
  );
}

function ProjectsOrbit({ setSelectedProject }) {
  const projects = [
    { name: "Project 1", texture: "/color.jpg", orbitRadius: 3, orbitSpeed: 0.5, description: "This is project 1" },
    { name: "Project 2", texture: "/normal.png", orbitRadius: 4, orbitSpeed: 0.3, description: "This is project 2" },
    { name: "Project 3", texture: "/occlusion.jpg", orbitRadius: 5, orbitSpeed: 0.2, description: "This is project 3" },
    // Add more projects as needed
  ];

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const { camera } = useThree();

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
  };

  useFrame((state) => {
    if (selectedProjectIndex !== null) {
      const project = projects[selectedProjectIndex];
      const time = state.clock.getElapsedTime();
      const angle = time * project.orbitSpeed;
      const x = Math.cos(angle) * project.orbitRadius;
      const z = Math.sin(angle) * project.orbitRadius;

      // Position the camera outside the orbit, chasing the planet
      const cameraDistance = 2; // Adjust this value to change the camera distance
      camera.position.set(
        x + Math.cos(angle) * cameraDistance,
        1.5, // Slightly above the planet
        z + Math.sin(angle) * cameraDistance
      );
      camera.lookAt(x, 0, z);
    }
  });

  return (
    <group>
      {projects.map((project, index) => (
        <ProjectSphere
          key={index}
          position={[project.orbitRadius, 0, 0]}
          texture={project.texture}
          projectName={project.name}
          orbitRadius={project.orbitRadius}
          orbitSpeed={project.orbitSpeed}
          onClick={() => handleProjectClick(project, index)}
          isSelected={selectedProjectIndex === index}
        />
      ))}
      {projects.map((project, index) => (
        <OrbitLines key={`orbit-${index}`} radius={project.orbitRadius} />
      ))}
      <Sun />
    </group>
  );
}

function CameraController({ resetView }) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (resetView) {
      camera.position.set(0, 5, 10);
      camera.lookAt(0, 0, 0);
    }
  }, [resetView, camera]);

  return null;
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
        <p className="mb-4">{project.description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [resetView, setResetView] = useState(false);

  const handleResetView = () => {
    setSelectedProject(null);
    setResetView(true);
    setTimeout(() => {
      setResetView(false);
    }, 100);
  };

  return (
    <div className='relative h-screen overflow-hidden bg-black cursor-grab'>
      <Canvas>
        <CameraController resetView={resetView} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls enableZoom={false} enabled={selectedProject === null} />
        
        <Stars />
        <ProjectsOrbit setSelectedProject={setSelectedProject} />
      </Canvas>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='absolute top-[25%] left-0 right-0 text-white text-center'
      >
        <h1 className="text-4xl font-bold mb-4">Folio</h1>
        <p className="text-xl">Explore the universe of my projects</p>
      </motion.div>

      <button
        onClick={handleResetView}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reset View
      </button>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}