"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(10000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta/10;
    ref.current.rotation.y -= delta/15;
  })


  return (
    <group rotation={[0,0, Math.PI / 8]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
            <PointMaterial
                transparent
                color="$fff"
                size={0.002}
                sizeAttenuation={true}
                dethWrite={false}
            />
        </Points>
    </group>
  )
};

const StarsCanvas = () => (
    <div className="stareffect w-full h-[100vh] fixed inset-0 z-10">
        <Canvas camera={{position: [1, 0, 1]}}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
)

export default StarsCanvas;