
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Environment, Box, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DataParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.2}
        roughness={0.4}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const AbstractNetwork = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    })

    return (
        <group ref={ref}>
            <Torus args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#475569" transparent opacity={0.3} />
            </Torus>
            <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
                <meshStandardMaterial color="#3B82F6" transparent opacity={0.4} />
            </Torus>
        </group>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <DataParticle position={[0, 0, 0]} color="#1E293B" scale={1.2} />
          <AbstractNetwork />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <DataParticle position={[-3, 1, -2]} color="#3B82F6" scale={0.5} />
           <DataParticle position={[3, -1, -3]} color="#94A3B8" scale={0.6} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const AbstractDataScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#3B82F6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
          <group rotation={[0, Math.PI / 4, 0]}>
             {/* Central Monolith */}
             <Box args={[1.5, 2, 1.5]}>
                <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
             </Box>
             
             {/* Glowing Core */}
             <Box args={[1.55, 0.1, 1.55]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
             </Box>
             <Box args={[1.55, 0.1, 1.55]} position={[0, 0.5, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
             </Box>
             <Box args={[1.55, 0.1, 1.55]} position={[0, -0.5, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
             </Box>

             {/* Orbiting data points */}
             <group>
                 <Sphere args={[0.1]} position={[1.5, 1, 0]}>
                    <meshStandardMaterial color="#3B82F6" />
                 </Sphere>
                 <Sphere args={[0.1]} position={[-1.5, -1, 0]}>
                    <meshStandardMaterial color="#3B82F6" />
                 </Sphere>
                 <Torus args={[2, 0.02, 16, 64]} rotation={[Math.PI/2, 0, 0]}>
                     <meshBasicMaterial color="#94A3B8" transparent opacity={0.2} />
                 </Torus>
             </group>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
