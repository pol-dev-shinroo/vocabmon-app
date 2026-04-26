"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { vocabData, VocabWord } from '@/data/vocab';

// --- 1. AVATAR COMPONENT ---
function Avatar({ gender, targetPos }: { gender: 'boy' | 'girl', targetPos: THREE.Vector3 }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const currentPos = group.current.position;
    const target = new THREE.Vector3(targetPos.x, 0, targetPos.z);
    const distance = currentPos.distanceTo(target);

    if (distance > 0.1) {
      group.current.lookAt(target.x, group.current.position.y, target.z);
      currentPos.lerp(target, 0.1);
      group.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 15)) * 0.4;
    } else {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const isBoy = gender === 'boy';
  const skinColor = "#ffcdb2"; const hairColor = isBoy ? "#7f4f24" : "#9d0208";
  const shirtColor = isBoy ? "#0077b6" : "#d00000"; const pantsColor = isBoy ? "#1d3557" : "#370617";

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh position={[0, 2.2, 0]} castShadow><boxGeometry args={[1.2, 1.1, 1.2]} /><meshStandardMaterial color={skinColor} /></mesh>
      <mesh position={[-0.25, 2.2, 0.61]}><boxGeometry args={[0.15, 0.2, 0.05]} /><meshStandardMaterial color="#000" /></mesh>
      <mesh position={[0.25, 2.2, 0.61]}><boxGeometry args={[0.15, 0.2, 0.05]} /><meshStandardMaterial color="#000" /></mesh>
      <mesh position={[0, 2.85, 0]} castShadow><boxGeometry args={[1.3, 0.4, 1.3]} /><meshStandardMaterial color={hairColor} /></mesh>
      {!isBoy && (
        <>
          <mesh position={[-0.7, 2.4, 0]} castShadow><boxGeometry args={[0.3, 0.8, 0.4]} /><meshStandardMaterial color={hairColor} /></mesh>
          <mesh position={[0.7, 2.4, 0]} castShadow><boxGeometry args={[0.3, 0.8, 0.4]} /><meshStandardMaterial color={hairColor} /></mesh>
        </>
      )}
      <mesh position={[0, 1.2, 0]} castShadow><boxGeometry args={[0.9, 1.0, 0.5]} /><meshStandardMaterial color={shirtColor} /></mesh>
      <mesh position={[-0.6, 1.2, 0]} castShadow><boxGeometry args={[0.3, 0.9, 0.3]} /><meshStandardMaterial color={skinColor} /></mesh>
      <mesh position={[0.6, 1.2, 0]} castShadow><boxGeometry args={[0.3, 0.9, 0.3]} /><meshStandardMaterial color={skinColor} /></mesh>
      <mesh position={[-0.22, 0.35, 0]} castShadow><boxGeometry args={[0.35, 0.7, 0.35]} /><meshStandardMaterial color={pantsColor} /></mesh>
      <mesh position={[0.22, 0.35, 0]} castShadow><boxGeometry args={[0.35, 0.7, 0.35]} /><meshStandardMaterial color={pantsColor} /></mesh>
    </group>
  );
}

// --- 2. MONSTER COMPONENTS ---
function Slime({ position, color = "#22c55e", speed = 3, onClick }: { position: [number, number, number], color?: string, speed?: number, onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime * speed + position[0];
      group.current.position.y = position[1] + Math.abs(Math.sin(t)) * 0.5;
      group.current.scale.y = 1 - Math.abs(Math.sin(t)) * 0.2;
      group.current.scale.x = 1 + Math.abs(Math.sin(t)) * 0.1;
      group.current.scale.z = 1 + Math.abs(Math.sin(t)) * 0.1;
    }
  });
  return (
    <group position={position} ref={group} onClick={(e) => { e.stopPropagation(); onClick(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'crosshair'}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.25, 0.6, 0.51]}><boxGeometry args={[0.15, 0.15, 0.05]}/><meshStandardMaterial color="black" /></mesh>
      <mesh position={[0.25, 0.6, 0.51]}><boxGeometry args={[0.15, 0.15, 0.05]}/><meshStandardMaterial color="black" /></mesh>
    </group>
  );
}

function Ghost({ position, onClick }: { position: [number, number, number], onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  return (
    <group position={position} ref={group} onClick={(e) => { e.stopPropagation(); onClick(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'crosshair'}>
      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.5, 8]} />
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.25, 1.2, 0.55]}><boxGeometry args={[0.15, 0.15, 0.05]}/><meshStandardMaterial color="#000" /></mesh>
      <mesh position={[0.25, 1.2, 0.55]}><boxGeometry args={[0.15, 0.15, 0.05]}/><meshStandardMaterial color="#000" /></mesh>
    </group>
  );
}

// --- 3. ENVIRONMENT ---
function BrightEnvironment({ setTargetPos }: { setTargetPos: (pos: THREE.Vector3) => void }) {
  return (
    <group>
      {/* Massive Bright Grass Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow onClick={(e) => setTargetPos(e.point)}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#bbf7d0" roughness={1} />
      </mesh>
      <gridHelper args={[100, 100, '#86efac', '#86efac']} position={[0, 0.01, 0]} />
      
      {/* Light Stone Pillars */}
      {[[-15, 15], [15, 15], [-15, -15], [15, -15]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[1.5, 4, 1.5]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
          <mesh position={[0, 4.5, 0]}><sphereGeometry args={[0.5]} /><meshBasicMaterial color="#38bdf8" /></mesh>
          <pointLight position={[0, 5, 0]} intensity={2} color="#38bdf8" distance={20} />
        </group>
      ))}
    </group>
  );
}

// --- 4. MAIN LAB COMPONENT ---
export default function DesignLab() {
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, 0, 0));
  
  // Monster & Quiz State
  const [monsters, setMonsters] = useState([
    { id: 1, type: 'slime', pos: [6, 0, -6] as [number,number,number], color: "#ef4444", alive: true },
    { id: 2, type: 'slime', pos: [-8, 0, -3] as [number,number,number], color: "#3b82f6", alive: true },
    { id: 3, type: 'slime', pos: [12, 0, 8] as [number,number,number], color: "#eab308", alive: true },
    { id: 4, type: 'ghost', pos: [-10, 2, 12] as [number,number,number], color: "", alive: true },
  ]);
  const [activeQuiz, setActiveQuiz] = useState<{ monsterId: number, target: VocabWord, options: string[] } | null>(null);
  const [quizError, setQuizError] = useState(false);

  const handleMonsterClick = (monsterId: number, mPos: [number,number,number]) => {
    // Move avatar to the monster
    setTargetPos(new THREE.Vector3(mPos[0], 0, mPos[2]));
    
    // Generate a quiz
    const targetWord = vocabData[Math.floor(Math.random() * vocabData.length)];
    const distractors = vocabData.filter(w => w.id !== targetWord.id).sort(() => 0.5 - Math.random()).slice(0, 2);
    const options = [targetWord.word, ...distractors.map(d => d.word)].sort(() => 0.5 - Math.random());
    
    setActiveQuiz({ monsterId, target: targetWord, options });
    setQuizError(false);
  };

  const handleOptionClick = (option: string) => {
    if (!activeQuiz) return;
    if (option === activeQuiz.target.word) {
      // Correct! Defeat the monster.
      setMonsters(prev => prev.map(m => m.id === activeQuiz.monsterId ? { ...m, alive: false } : m));
      setActiveQuiz(null);
    } else {
      // Wrong! Show error shake.
      setQuizError(true);
      setTimeout(() => setQuizError(false), 500);
    }
  };

  return (
    <main className="h-screen bg-sky-50 flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6 z-10 shrink-0">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
          Vocabmon Open World
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-xl flex gap-1 border border-gray-200 shadow-sm">
            <button onClick={() => setGender('boy')} className={`px-6 py-2 rounded-lg font-bold transition-all ${gender === 'boy' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-indigo-500'}`}>Boy</button>
            <button onClick={() => setGender('girl')} className={`px-6 py-2 rounded-lg font-bold transition-all ${gender === 'girl' ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-pink-500'}`}>Girl</button>
          </div>
          <Link href="/" className="bg-white hover:bg-gray-50 text-indigo-600 font-bold py-2 px-4 rounded-lg transition-all border border-gray-200 shadow-sm">← Dashboard</Link>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-sky-100 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative cursor-crosshair">
        <Canvas camera={{ position: [0, 8, 14], fov: 45 }} shadows>
          <color attach="background" args={['#e0f2fe']} />
          
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow shadow-mapSize={2048} />
          <Environment preset="city" />
          
          <BrightEnvironment setTargetPos={setTargetPos} />
          <Avatar gender={gender} targetPos={targetPos} />
          
          {/* Render Alive Monsters */}
          {monsters.map(m => m.alive && (
            m.type === 'slime' 
              ? <Slime key={m.id} position={m.pos} color={m.color} onClick={() => handleMonsterClick(m.id, m.pos)} />
              : <Ghost key={m.id} position={m.pos} onClick={() => handleMonsterClick(m.id, m.pos)} />
          ))}

          <ContactShadows position={[0, 0.05, 0]} opacity={0.3} scale={50} blur={2} far={10} color="#064e3b" />
          
          <OrbitControls 
            makeDefault 
            enablePan={true}
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 2.2} 
            minDistance={5} 
            maxDistance={30} 
            target={[0, 1, 0]}
          />
        </Canvas>
        
        {/* UI Overlays */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-black tracking-widest text-emerald-600 pointer-events-none shadow-lg border-2 border-emerald-100">
          CLICK MONSTERS TO BATTLE • DRAG TO ROTATE
        </div>

        {/* Quiz Popup Overlay */}
        {activeQuiz && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-sky-900/40 backdrop-blur-sm">
            <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
            <div className={`bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 border-4 border-emerald-400 ${quizError ? 'animate-shake border-red-500' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-gray-800">Wild Monster Attacks!</h3>
                <button onClick={() => setActiveQuiz(null)} className="text-gray-400 hover:text-gray-600 font-black text-xl">✕</button>
              </div>
              <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2">Find the matching word:</p>
              <p className="text-gray-700 font-medium text-lg leading-relaxed mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                "{activeQuiz.target.definition}"
              </p>
              <div className="flex flex-col gap-3">
                {activeQuiz.options.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => handleOptionClick(opt)} 
                    className="bg-white border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all text-lg shadow-sm hover:shadow-md active:scale-95 text-left uppercase tracking-wider"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
