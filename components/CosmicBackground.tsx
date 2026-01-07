import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { StyleSheet, View } from 'react-native';

const Particles = () => {
    const points = useRef<THREE.Points>(null);

    const particlesCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y += 0.001;
            points.current.rotation.x += 0.0005;

            const time = state.clock.getElapsedTime();
            points.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#FF3B30"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

const CosmicBackground = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Particles />
            </Canvas>
        </View>
    );
};

export default CosmicBackground;
