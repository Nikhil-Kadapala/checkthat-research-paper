
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Environment, Stars, Box, Text, Instance, Instances, Sphere, Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- NLP VISUALIZATION COMPONENTS ---

// Represents Social Media Posts (Structured Cards with Platform colors)
const SocialMediaStream = ({ count = 40 }: { count?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Generate random posts
  const posts = useMemo(() => {
    const platforms = [
        { color: "#000000", name: "X" }, // X (Twitter)
        { color: "#1877F2", name: "FB" }, // Facebook
        { color: "#FF4500", name: "RD" }, // Reddit
        { color: "#C13584", name: "IG" }  // Instagram
    ];
    
    return new Array(count).fill(0).map((_, i) => ({
      x: -15 - Math.random() * 10, // Start far left
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 6,
      rotation: [Math.random() * 0.5, Math.random() * 0.5, 0] as [number, number, number],
      speed: 0.05 + Math.random() * 0.08,
      platform: platforms[Math.floor(Math.random() * platforms.length)]
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.children.forEach((child, i) => {
      const p = posts[i];
      
      // Move right
      p.x += p.speed;
      
      // Reset loop (disappear into the neural net at x=-3)
      if (p.x > -3) {
        p.x = -15 - Math.random() * 5;
        // Randomize Y slightly on reset
        p.y = (Math.random() - 0.5) * 8;
      }

      child.position.set(p.x, p.y, p.z);
      child.rotation.set(
        Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1, 
        Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1, 
        0
      );
    });
  });

  return (
    <group ref={meshRef}>
        {posts.map((post, i) => (
            <group key={i}>
                {/* Card Background */}
                <Box args={[1.2, 0.8, 0.05]}>
                    <meshStandardMaterial color="white" />
                </Box>
                {/* Header Bar */}
                <Box args={[1.2, 0.2, 0.06]} position={[0, 0.3, 0]}>
                    <meshStandardMaterial color={post.platform.color} />
                </Box>
                {/* Simulated Text Lines */}
                <Box args={[0.8, 0.05, 0.06]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#cbd5e1" />
                </Box>
                <Box args={[0.8, 0.05, 0.06]} position={[0, -0.15, 0]}>
                    <meshStandardMaterial color="#cbd5e1" />
                </Box>
            </group>
        ))}
    </group>
  );
};

// Represents Normalized Claims (Clean, Glowing Strips)
const NormalizedClaims = ({ count = 12 }: { count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const claims = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      x: i * 2.5 + 3, // Start appearing after x=3
      speed: 0.04
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    groupRef.current.children.forEach((child, i) => {
      const c = claims[i];
      c.x += c.speed;
      
      if (c.x > 18) {
        c.x = 3; // Reset near the center output
      }

      child.position.set(c.x, Math.sin(state.clock.elapsedTime + i) * 0.2, 0);
    });
  });

  return (
    <group ref={groupRef}>
        {claims.map((c, i) => (
            <group key={i}>
                {/* Main Text Strip */}
                <Box args={[2, 0.3, 0.05]}>
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </Box>
                {/* Gold Highlight (Signifying "Fact/Claim") */}
                <Box args={[0.1, 0.3, 0.06]} position={[-0.95, 0, 0]}>
                    <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1} />
                </Box>
                {/* Simulated Text */}
                <Box args={[1.4, 0.05, 0.06]} position={[0.1, 0, 0]}>
                    <meshStandardMaterial color="#94a3b8" />
                </Box>
            </group>
        ))}
    </group>
  );
};

// The Processing Unit: A Large, Explicit Neural Core
const NeuralFilterNetwork = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);
    const outerGlowRef1 = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if(meshRef.current) {
             meshRef.current.rotation.x = time * 0.1;
             meshRef.current.rotation.y = time * 0.15;
        }
        
        // Pulsating Inner Core
        if(innerCoreRef.current) {
             const scale = 1 + Math.sin(time * 3) * 0.05;
             innerCoreRef.current.scale.set(scale, scale, scale);
        }

        // Rotating Glow Layers
        if(outerGlowRef1.current) {
            outerGlowRef1.current.rotation.z = -time * 0.2;
            outerGlowRef1.current.rotation.x = time * 0.1;
        }
    });

    return (
        <group position={[0, 0, 0]}>
             {/* Large Outer Network Architecture - Explicit Wireframe */}
             <mesh ref={meshRef}>
                 <icosahedronGeometry args={[2.8, 1]} />
                 {/* Faint Hull to give it volume */}
                 <meshStandardMaterial 
                    color="#e0f2fe" // Very light blue
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                 />
                 {/* Visible Thick Edges */}
                 <Edges 
                    scale={1.0} 
                    threshold={15} // Display edges > 15 degrees
                    color="#0284c7" // Vivid Sky Blue (700)
                 />
             </mesh>
             
             {/* Secondary Inner Wireframe for Complexity */}
             <mesh rotation={[0.5, 0.5, 0]}>
                 <icosahedronGeometry args={[1.8, 0]} />
                 <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.3} />
             </mesh>
             
             {/* Core Energy - Bright Ocean/Steel Blue Source */}
             <mesh ref={innerCoreRef}>
                 <sphereGeometry args={[0.8, 32, 32]} />
                 <meshBasicMaterial color="#0077be" />
                 <pointLight intensity={3} color="#38bdf8" distance={6} />
             </mesh>

             {/* Volumetric Glow Layer */}
             <mesh ref={outerGlowRef1}>
                 <sphereGeometry args={[1.2, 32, 32]} />
                 <meshBasicMaterial 
                    color="#0ea5e9"
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                 />
             </mesh>
        </group>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="white" />
        <pointLight position={[-10, -5, 5]} intensity={0.5} color="#94a3b8" />

        <group position={[0, -0.5, 0]}>
            {/* 1. Input: Social Media Stream (Left) */}
            <SocialMediaStream count={35} />
            
            {/* 2. Process: Neural Filter (Center) */}
            <NeuralFilterNetwork />
            
            {/* 3. Output: Normalized Claims (Right) */}
            <NormalizedClaims count={8} />
        </group>

        <Environment preset="city" />
        {/* Subtle background stars/particles */}
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.2} />
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
             {/* Central Processing Unit Representation */}
             <Box args={[1.5, 2, 1.5]}>
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
             </Box>
             
             {/* Glowing Data Layers */}
             <Box args={[1.6, 0.05, 1.6]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
             </Box>
             <Box args={[1.6, 0.05, 1.6]} position={[0, 0.6, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.4} />
             </Box>
             <Box args={[1.6, 0.05, 1.6]} position={[0, -0.6, 0]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.4} />
             </Box>

             {/* Orbiting Elements */}
             <group>
                 <Torus args={[2.2, 0.02, 16, 64]} rotation={[Math.PI/2, 0, 0]}>
                     <meshBasicMaterial color="#94A3B8" transparent opacity={0.3} />
                 </Torus>
             </group>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
