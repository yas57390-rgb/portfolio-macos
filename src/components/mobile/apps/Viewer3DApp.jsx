import React, { useState, Suspense } from 'react';
import { FaChevronLeft, FaCube, FaSync } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, Html } from '@react-three/drei';

// Same models as desktop version
const MODELS = [
    { id: 1, name: 'Steve Jobs Sketch', path: '/assets/steve_sketch.glb', scale: 2, emoji: '👨‍💼' },
    { id: 2, name: 'Metz Cathedral', path: '/assets/metz_cathedral.glb', scale: 0.5, emoji: '⛪' },
    { id: 3, name: 'Server V2 Console', path: '/assets/server_v2_console.glb', scale: 1, rotationX: -Math.PI / 2, emoji: '🖥️' },
];

const Model = ({ path, scale = 1, rotationX = 0 }) => {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={scale} rotation={[rotationX, 0, 0]} />;
};

const ModelLoader = () => (
    <Html center>
        <div className="flex flex-col items-center text-gray-400">
            <FaSync className="animate-spin text-2xl mb-2" />
            <span className="text-sm">Chargement...</span>
        </div>
    </Html>
);

const Viewer3DApp = ({ onClose }) => {
    const [selectedModel, setSelectedModel] = useState(null);

    if (selectedModel) {
        return (
            <div className="h-full bg-gray-900 flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between z-10 bg-gray-900/80 backdrop-blur">
                    <button
                        onClick={() => setSelectedModel(null)}
                        className="text-blue-400 font-medium flex items-center"
                    >
                        <FaChevronLeft className="mr-1" size={14} />
                        Modèles
                    </button>
                    <h1 className="font-semibold text-white text-sm truncate max-w-[60%]">{selectedModel.name}</h1>
                    <div className="w-16" />
                </div>

                {/* 3D Canvas */}
                <div className="flex-1">
                    <Canvas
                        camera={{ position: [0, 2, 5], fov: 45 }}
                        style={{ background: '#111827' }}
                    >
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <Suspense fallback={<ModelLoader />}>
                            <Center>
                                <Model
                                    path={selectedModel.path}
                                    scale={selectedModel.scale}
                                    rotationX={selectedModel.rotationX || 0}
                                />
                            </Center>
                            <Environment preset="city" />
                        </Suspense>
                        <OrbitControls
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            autoRotate={true}
                            autoRotateSpeed={1}
                        />
                    </Canvas>
                </div>

                {/* Controls hint */}
                <div className="p-3 bg-gray-800/80 text-center text-gray-400 text-xs">
                    👆 Glissez pour tourner • Pincez pour zoomer
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 flex items-center border-b border-gray-200 bg-gray-50">
                <button onClick={onClose} className="text-blue-500 font-medium flex items-center">
                    <FaChevronLeft className="mr-1" size={14} />
                    Retour
                </button>
                <h1 className="flex-1 text-center font-semibold text-gray-900 pr-12">
                    3D Viewer
                </h1>
            </div>

            {/* Models List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setSelectedModel(model)}
                        className="w-full bg-white rounded-2xl p-4 shadow-sm active:bg-gray-50 flex items-center"
                    >
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-md">
                            {model.emoji}
                        </div>
                        <div className="ml-4 flex-1 text-left">
                            <h3 className="font-semibold text-gray-900">{model.name}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Modèle 3D interactif</p>
                        </div>
                        <FaChevronLeft className="text-gray-300 rotate-180" size={14} />
                    </button>
                ))}

                {/* Info */}
                <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
                    <p className="text-blue-700 text-sm leading-relaxed">
                        💡 Touchez un modèle pour l'ouvrir. Faites glisser pour tourner et pincez pour zoomer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Viewer3DApp;
