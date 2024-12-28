"use client"

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import CreateRock from './asteroids';
import { OrbitControls } from '@react-three/drei';

function Banner() {
  return (
    <div className='banner relative h-screen'>
      <div className='relative h-[250px] w-full'>
        <video autoPlay muted loop className='rotate-180 absolute top-[-370px] object-cover z-[1] w-full left-0'>
          <source src="/blackhole.webm" alt="blackhole gif" type='video/webm' />
        </video>
      </div>

      <div className='flex relative z-30 justify-around items-center'>
        <motion.div
          id='about-me'
          className='relative z-[2] flex flex-col gap-2 text-6xl font-sans font-bold text-white p-20'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.span
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Hi, I am
          </motion.span>
          <motion.span
            className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Deepanshu Joshi
          </motion.span>
          <motion.span
            className='text-2xl font-mono font-medium mt-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            I am a developer who loves creating new things
          </motion.span>
        </motion.div>

        <div className='w-full h-[400px]'>
          <Canvas>
            <perspectiveCamera />
            <ambientLight intensity={0.05} />
            <directionalLight
              color="white"
              position={[5, 1, 5]}
              intensity={0.5}
              castShadow
            />
            <pointLight args={[0xff7f24, 500, 1000]} position={[-5, 30, 5]}/>

            <CreateRock size={2.90} position={[0, 0, 0]} detail={0}/>
            <CreateRock size={1.04} position={[-4, 1, 1]} />
            <CreateRock size={0.54} position={[-5, -3, 2]} detail={1} />
            <CreateRock size={1.82} position={[9, 1, -3]} />
            <CreateRock size={0.82} position={[7, -3.5, -3]} />
            <CreateRock size={0.82} position={[7.2, -2, -3]} />
            <CreateRock size={0.82} position={[7.5, -4, -3]} />
          </Canvas>
        </div>
      </div>

    </div>
  )
}

export default Banner;