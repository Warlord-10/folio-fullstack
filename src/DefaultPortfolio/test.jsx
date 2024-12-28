"use client"
import { useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion } from 'framer-motion'


function InteractivePlanet() {
    const refMesh = useRef(null);

    const [color, normal, aoMap] = useLoader(TextureLoader, [
        '/color.jpg',
        '/normal.png',
        '/occlusion.jpg'
    ])

    useFrame(() => {
      if(refMesh.current) {
        refMesh.current.rotation.y += 0.002;
      }
    });
    return (
        <motion.mesh ref={refMesh} scale={2.5}>
            <sphereGeometry args={[1, 64, 64]}/>
            <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap}/>
        </motion.mesh>
    );
}

function FloatingScreen({ position, rotation }) {
    const texture = useTexture('/logo4.png')
    const meshRef = useRef()
  
    return (
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[3, 2]} /> {/* Adjust size as needed */}
        <meshBasicMaterial map={texture} side={2} /> {/* side={2} for double-sided */}
      </mesh>
    )
}



export default function Home() {
  return (
    <div className='relative h-screen overflow-hidden bg-black'>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls enableZoom={false} />
        
        {/* <Stars /> */}
        <InteractivePlanet />
        {/* <FloatingScreen 
            position={[10, 1, -2]} 
            rotation={[0, -Math.PI / 6, 0]}
        /> */}
      </Canvas>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='absolute top-[25%] text-white text-center'
      >
        <h1>Folio</h1>
        <p>Explore the universe of your projects</p>
      </motion.div>
    </div>
  )
}

