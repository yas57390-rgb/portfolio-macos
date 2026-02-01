import React from 'react';
import { motion } from 'framer-motion';

const OnboardingMenu = ({ currentStep, onStepChange }) => {
    const steps = [
        { id: 1, label: 'Intro' },
        { id: 2, label: 'SIE' },
        { id: 3, label: 'CV' },
        { id: 4, label: 'Portfolio' },
        { id: 5, label: 'Certifs' },
        { id: 6, label: 'Veille' },
        { id: 7, label: 'Guide' },
        { id: 8, label: 'Contact' }
    ];

    return (
        <div className="w-full h-8 flex items-center px-4 bg-black/20 backdrop-blur-md border-b border-white/10 select-none">
            {/* Apple Logo (Static) */}
            <div className="mr-6 text-white/90 hover:text-white cursor-pointer">
                
            </div>

            {/* Menu Items */}
            <div className="flex space-x-1">
                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    return (
                        <button
                            key={step.id}
                            onClick={() => onStepChange(step.id)}
                            className={`
                                relative px-3 py-0.5 rounded text-sm font-medium transition-all duration-200 outline-none
                                ${isActive ? 'bg-white text-black shadow-sm' : 'text-white/90 hover:bg-white/10'}
                            `}
                        >
                            <span className="relative z-10">{step.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default OnboardingMenu;
