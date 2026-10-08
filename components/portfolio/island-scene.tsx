'use client'

import { Float, Sparkles, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const BLUE = '#3ba4ff'
const PURPLE = '#a45cff'

function Crystal({ position, scale = 1, color }: { position: [number, number, number]; scale?: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6
  })
  return (
    <mesh ref={ref} position={position} scale={[scale * 0.5, scale * 1.2, scale * 0.5]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} roughness={0.2} metalness={0.4} transparent opacity={0.92} toneMapped={false} />
    </mesh>
  )
}

function FloatingCube({ position, color, size = 0.35, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.4 * speed
    ref.current.rotation.y += dt * 0.6 * speed
  })
  return (
    <Float speed={1.5 * speed} floatIntensity={1.2} rotationIntensity={0}>
      <group ref={ref} position={position}>
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color="#0b0b18" emissive={color} emissiveIntensity={0.25} roughness={0.3} metalness={0.8} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size * 1.02, size * 1.02, size * 1.02)]} />
          <lineBasicMaterial color={color} toneMapped={false} />
        </lineSegments>
      </group>
    </Float>
  )
}

function HoloScreen({ position, rotationY, color }: { position: [number, number, number]; rotationY: number; color: string }) {
  const bars = useMemo(() => [0.7, 0.45, 0.85, 0.3, 0.6], [])
  const scanRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (scanRef.current) scanRef.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.28
  })
  return (
    <Float speed={2} floatIntensity={0.4} rotationIntensity={0.1}>
      <group position={position} rotation={[0, rotationY, 0]}>
        <mesh>
          <planeGeometry args={[1.1, 0.7]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.1, 0.7)]} />
          <lineBasicMaterial color={color} toneMapped={false} />
        </lineSegments>
        {bars.map((w, i) => (
          <mesh key={i} position={[-0.45 + w * 0.4, 0.24 - i * 0.11, 0.01]}>
            <planeGeometry args={[w * 0.8, 0.04]} />
            <meshBasicMaterial color={i % 2 ? PURPLE : BLUE} transparent opacity={0.8} toneMapped={false} />
          </mesh>
        ))}
        <mesh ref={scanRef} position={[0, 0, 0.02]}>
          <planeGeometry args={[1.1, 0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

function Pathway({ points, color }: { points: [number, number][]; color: string }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0.02, z)))
    return new THREE.TubeGeometry(curve, 48, 0.025, 6, false)
  }, [points])
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )
}

function Island() {
  const ringRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.3
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 0.8
      coreRef.current.position.y = 1.35 + Math.sin(clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group>
      {/* Top surface */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[2.4, 2.2, 0.16, 6]} />
        <meshStandardMaterial color="#10102a" roughness={0.6} metalness={0.6} flatShading />
      </mesh>
      <lineSegments position={[0, 0.001, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(2.4, 2.2, 0.16, 6)]} />
        <lineBasicMaterial color={BLUE} toneMapped={false} />
      </lineSegments>
      <gridHelper args={[3.8, 12, PURPLE, '#2a2a5a']} position={[0, 0.005, 0]} />

      {/* Rocky underside */}
      <mesh position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[2.2, 2.2, 6, 1]} />
        <meshStandardMaterial color="#0a0a1c" roughness={0.9} metalness={0.2} flatShading />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={PURPLE} toneMapped={false} />
      </mesh>

      {/* Pathways */}
      <Pathway color={BLUE} points={[[-1.9, 0.6], [-0.9, 0.2], [0, 0], [0.8, -0.5], [1.7, -1]]} />
      <Pathway color={PURPLE} points={[[-1.2, -1.4], [-0.4, -0.6], [0, 0], [0.5, 0.8], [0.9, 1.7]]} />

      {/* Central core */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.5, 6]} />
        <meshStandardMaterial color="#14143a" metalness={0.8} roughness={0.25} emissive={BLUE} emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={coreRef} position={[0, 1.35, 0]}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={2} wireframe toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} position={[0, 1.35, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.6, 0.012, 8, 64]} />
        <meshBasicMaterial color={PURPLE} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.6} toneMapped={false} />
      </mesh>

      {/* Crystals */}
      <Crystal position={[-1.5, 0.35, -0.6]} scale={1.1} color={PURPLE} />
      <Crystal position={[-1.25, 0.22, -0.95]} scale={0.6} color={BLUE} />
      <Crystal position={[1.4, 0.3, 0.7]} scale={0.95} color={BLUE} />
      <Crystal position={[1.7, 0.2, 0.35]} scale={0.55} color={PURPLE} />
      <Crystal position={[0.3, 0.2, -1.6]} scale={0.7} color={PURPLE} />

      {/* Floating cubes */}
      <FloatingCube position={[-0.9, 1.0, 0.9]} color={BLUE} />
      <FloatingCube position={[1.1, 1.3, -0.9]} color={PURPLE} size={0.28} speed={1.3} />
      <FloatingCube position={[-2.6, 1.6, -0.4]} color={PURPLE} size={0.22} speed={0.8} />
      <FloatingCube position={[2.7, 0.9, 1.2]} color={BLUE} size={0.26} speed={1.1} />

      {/* Screens */}
      <HoloScreen position={[-1.6, 1.1, 0.2]} rotationY={0.6} color={BLUE} />
      <HoloScreen position={[1.6, 1.25, -0.2]} rotationY={-0.6} color={PURPLE} />
    </group>
  )
}

function Rig() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }, dt) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.45 + t * 0.05, 3, dt)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.12, 3, dt)
    ref.current.position.y = Math.sin(t * 0.6) * 0.12
  })
  return (
    <group ref={ref}>
      <Island />
    </group>
  )
}

export default function IslandScene({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.6, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
    >
      <fog attach="fog" args={['#04040a', 7, 16]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 2.5, 0]} intensity={18} color={BLUE} distance={8} />
      <pointLight position={[-3, 1, 2]} intensity={10} color={PURPLE} distance={8} />
      <directionalLight position={[3, 5, 3]} intensity={0.6} color="#c8d0ff" />
      <Rig />
      <Sparkles count={70} scale={[7, 4, 7]} size={2.5} speed={0.3} color={BLUE} position={[0, 1, 0]} />
      <Sparkles count={40} scale={[7, 4, 7]} size={3} speed={0.2} color={PURPLE} position={[0, 1, 0]} />
      <Stars radius={40} depth={20} count={800} factor={2} fade speed={0.5} />
    </Canvas>
  )
}
