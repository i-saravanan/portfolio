"use client";

import { Float, Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CodeCube({
  position,
  color,
  label
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.28 + position[0];
    mesh.current.rotation.y = state.clock.elapsedTime * 0.36 + position[1];
  });

  return (
    <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[1.08, 1.08, 1.08]} />
        <meshStandardMaterial
          color={color}
          roughness={0.18}
          metalness={0.74}
          transparent
          opacity={0.82}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.1, 1.1, 1.1)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.38} />
        </lineSegments>
      </mesh>
      <Html position={[position[0], position[1] - 0.78, position[2]]} center>
        <span className="rounded border border-white/15 bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
          {label}
        </span>
      </Html>
    </Float>
  );
}

function DatabaseNode({ index }: { index: number }) {
  const angle = (index / 8) * Math.PI * 2;
  const radius = index % 2 === 0 ? 3.2 : 4.45;
  const position: [number, number, number] = [
    Math.cos(angle) * radius,
    Math.sin(angle * 1.6) * 0.9 - 0.2,
    Math.sin(angle) * radius - 1.6
  ];

  return (
    <Float speed={1.2 + index * 0.06} floatIntensity={0.34}>
      <mesh position={position}>
        <sphereGeometry args={[0.13, 28, 28]} />
        <meshStandardMaterial
          color={index % 3 === 0 ? "#ffcf5a" : index % 2 === 0 ? "#4df0bd" : "#5dd8ff"}
          emissive={index % 2 === 0 ? "#173a32" : "#153246"}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function NetworkLines() {
  const lines = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const angle = (index / 8) * Math.PI * 2;
      return [
        [0, 0.25, -1.5],
        [Math.cos(angle) * 3.8, Math.sin(angle * 1.3) * 1.1, Math.sin(angle) * 3.8 - 1.6]
      ] as [number, number, number][];
    });
  }, []);

  return (
    <>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? "#4df0bd" : "#5dd8ff"}
          transparent
          opacity={0.32}
          lineWidth={1}
        />
      ))}
    </>
  );
}

function ApiCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={group} position={[0, 0.1, -1.5]}>
      <mesh>
        <torusKnotGeometry args={[0.78, 0.18, 160, 16]} />
        <meshStandardMaterial color="#c8fff1" emissive="#14342d" metalness={0.86} roughness={0.16} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.012, 12, 96]} />
        <meshBasicMaterial color="#5dd8ff" transparent opacity={0.52} />
      </mesh>
      <Html position={[0, -1.25, 0]} center>
        <span className="rounded border border-mint/30 bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-mint backdrop-blur-md">
          REST API Core
        </span>
      </Html>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 1.2, 8], fov: 46 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#090b0f"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={70} color="#4df0bd" />
        <pointLight position={[-5, 3, 2]} intensity={55} color="#ffcf5a" />
        <spotLight position={[0, 6, 4]} angle={0.45} penumbra={1} intensity={95} color="#ffffff" />
        <Stars radius={68} depth={24} count={1500} factor={3} saturation={0} fade speed={0.55} />
        <ApiCore />
        <NetworkLines />
        {Array.from({ length: 8 }, (_, index) => (
          <DatabaseNode key={index} index={index} />
        ))}
        <CodeCube position={[-3.4, 1.2, -0.4]} color="#4df0bd" label="Java" />
        <CodeCube position={[3.6, 1.45, -1.1]} color="#5dd8ff" label="Spring" />
        <CodeCube position={[-2.4, -1.45, -2.4]} color="#ffcf5a" label="MySQL" />
        <CodeCube position={[2.5, -1.25, -2.1]} color="#ff6f61" label="JPA" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
      <div className="grid-mask absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/15 via-graphite/20 to-graphite" />
    </div>
  );
}
