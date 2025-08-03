import { motion } from 'framer-motion';
import { ChevronDown, MousePointer } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, Text3D, OrbitControls, Float, Stars, Points, PointMaterial } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// 3D Floating Cubes Component
function FloatingCubes() {
  const groupRef = useRef();
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire group
      groupRef.current.rotation.y += 0.005;
      
      // Interactive camera movement based on mouse position
      camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  const cubes = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        <Float key={index} speed={1} rotationIntensity={1} floatIntensity={2}>
          <Box
            position={cube.position}
            rotation={cube.rotation}
            scale={cube.scale}
            args={[1, 1, 1]}
          >
            <meshStandardMaterial
              color={index % 3 === 0 ? '#3B82F6' : index % 3 === 1 ? '#8B5CF6' : '#10B981'}
              transparent
              opacity={0.8}
              wireframe={index % 4 === 0}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// 3D Avatar Component
function Avatar() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={[3, 0, 0]}>
      {/* Head */}
      <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#F59E0B" />
      </Sphere>
      
      {/* Body */}
      <Box args={[1.2, 2, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3B82F6" />
      </Box>
      
      {/* Arms */}
      <Box args={[0.3, 1.5, 0.3]} position={[-1, 0.5, 0]}>
        <meshStandardMaterial color="#F59E0B" />
      </Box>
      <Box args={[0.3, 1.5, 0.3]} position={[1, 0.5, 0]}>
        <meshStandardMaterial color="#F59E0B" />
      </Box>
      
      {/* Legs */}
      <Box args={[0.4, 1.2, 0.4]} position={[-0.3, -1.5, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      <Box args={[0.4, 1.2, 0.4]} position={[0.3, -1.5, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
    </group>
  );
}

// Particle Field Component
function ParticleField() {
  const ref = useRef();
  
  const count = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToProjects();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <FloatingCubes />
          <Avatar />
          <ParticleField />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      
      {/* Glassmorphism Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tushar Sharma
            </span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 mb-8"
          >
            Frontend / Full Stack Developer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I create beautiful, responsive, and user-friendly web applications 
            using modern technologies. Passionate about clean code and exceptional user experiences.
          </motion.p>
          
                      <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex justify-center items-center relative z-20"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm relative z-30 cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                View My Work
              </motion.button>
            </motion.div>
        </motion.div>
        
        {/* Mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <MousePointer className="w-6 h-6" />
            {/* <span className="text-sm">Move mouse to interact</span> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 