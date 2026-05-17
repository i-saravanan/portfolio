"use client";

import { Float, Html, Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const nodes = [
  { label: "Client", position: [-3.8, 1.15, -1.6], color: "#37d7ff" },
  { label: "REST", position: [-1.35, 0.25, -1.2], color: "#55f7d2" },
  { label: "Service", position: [1.35, 0.55, -1.35], color: "#a66cff" },
  { label: "JPA", position: [3.55, -0.65, -1.7], color: "#ff4ecd" },
  { label: "MySQL", position: [0.65, -1.8, -2.2], color: "#37d7ff" }
] as const;

function TechCube({
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
    mesh.current.rotation.x = state.clock.elapsedTime * 0.24 + position[0];
    mesh.current.rotation.y = state.clock.elapsedTime * 0.34 + position[1];
  });

  return (
    <Float speed={1.55} rotationIntensity={0.45} floatIntensity={0.75}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.13}
          metalness={0.72}
          transmission={0.12}
          thickness={0.7}
          transparent
          opacity={0.86}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.97, 0.97, 0.97)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.42} />
        </lineSegments>
      </mesh>
      <Html position={[position[0], position[1] - 0.74, position[2]]} center>
        <span className="rounded border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
          {label}
        </span>
      </Html>
    </Float>
  );
}

function ArchitectureNode({
  node,
  index
}: {
  node: (typeof nodes)[number];
  index: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2 + index) * 0.08;
    mesh.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={1.15 + index * 0.05} floatIntensity={0.28}>
      <mesh ref={mesh} position={node.position}>
        <sphereGeometry args={[0.22, 36, 36]} />
        <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.42} roughness={0.18} metalness={0.65} />
      </mesh>
      <Html position={[node.position[0], node.position[1] - 0.5, node.position[2]]} center>
        <span className="rounded border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
          {node.label}
        </span>
      </Html>
    </Float>
  );
}

function ArchitectureLines() {
  const lines = useMemo(() => {
    return nodes.slice(0, -1).map((node, index) => {
      return [node.position, nodes[index + 1].position] as [number, number, number][];
    });
  }, []);

  return (
    <>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? "#37d7ff" : "#a66cff"}
          transparent
          opacity={0.42}
          lineWidth={1.6}
        />
      ))}
    </>
  );
}

function RotatingCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.18;
    group.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <group ref={group} position={[0, 0.08, -1.7]}>
      <mesh>
        <icosahedronGeometry args={[1.06, 2]} />
        <meshPhysicalMaterial color="#101a38" emissive="#111d5d" emissiveIntensity={0.4} roughness={0.18} metalness={0.7} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.01, 12, 140]} />
        <meshBasicMaterial color="#37d7ff" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0.8, 0.2, 0.6]}>
        <torusGeometry args={[2.12, 0.012, 12, 140]} />
        <meshBasicMaterial color="#a66cff" transparent opacity={0.48} />
      </mesh>
      <Html position={[0, -1.45, 0]} center>
        <span className="rounded border border-aqua/30 bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-aqua backdrop-blur-md">
          Backend Runtime
        </span>
      </Html>
    </group>
  );
}

function SceneRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.14, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.08, 0.04);
  });

  return (
    <group ref={group}>
      <RotatingCore />
      <ArchitectureLines />
      {nodes.map((node, index) => (
        <ArchitectureNode key={node.label} node={node} index={index} />
      ))}
      <TechCube position={[-4.1, -1.15, -0.7]} color="#37d7ff" label="Java" />
      <TechCube position={[4.2, 1.35, -0.9]} color="#55f7d2" label="Spring" />
      <TechCube position={[-2.2, 2.0, -2.6]} color="#a66cff" label="Git" />
      <TechCube position={[2.55, -2.15, -2.4]} color="#ff4ecd" label="Maven" />
    </group>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 1.15, 8.2], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#03050b"]} />
        <fog attach="fog" args={["#03050b", 7, 18]} />
        <ambientLight intensity={0.28} />
        <pointLight position={[4.5, 3.5, 4]} intensity={80} color="#37d7ff" />
        <pointLight position={[-5, 2.5, 2]} intensity={55} color="#a66cff" />
        <spotLight position={[0, 7, 4]} angle={0.42} penumbra={1} intensity={120} color="#ffffff" />
        <Stars radius={78} depth={28} count={1700} factor={3.2} saturation={0} fade speed={0.5} />
        <SceneRig />
      </Canvas>
      <div className="grid-mask absolute inset-0 opacity-60" />
      <div className="spotlight absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/5 via-graphite/35 to-graphite" />
    </div>
  );
}
