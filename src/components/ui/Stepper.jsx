import React, { useState, Children, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

export default function Stepper({
    children,
    initialStep = 1,
    currentStep: propCurrentStep, // Add controlled prop
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = '',
    stepContainerClassName = '',
    contentClassName = '',
    footerClassName = '',
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = 'Back',
    nextButtonText = 'Continue',
    disableStepIndicators = false,
    renderStepIndicator,
    ...rest
}) {
    const [internalStep, setInternalStep] = useState(initialStep);
    // Use prop if provided (controlled), otherwise internal state (uncontrolled)
    const isControlled = propCurrentStep !== undefined;
    const currentStep = isControlled ? propCurrentStep : internalStep;

    const [direction, setDirection] = useState(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = newStep => {
        if (!isControlled) {
            setInternalStep(newStep);
        }
        // Always fire callback
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-full"
            {...rest}
        >
            <div
                className={`mx-auto w-full max-w-5xl ${stepCircleContainerClassName}`} // Modified width constraint
            >
                <div className={`${stepContainerClassName} flex w-full items-center justify-between p-4 mb-2`}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={contentClassName}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>

                {!isCompleted && (
                    <div className={`p-8 w-full ${footerClassName}`}>
                        <div className={`flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
                            {currentStep !== 1 && (
                                <button
                                    onClick={handleBack}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${'text-white/60 hover:text-white bg-white/5 border border-white/10'
                                        }`}
                                    {...backButtonProps}
                                >
                                    {backButtonText}
                                </button>
                            )}
                            <button
                                onClick={isLastStep ? handleComplete : handleNext}
                                className="px-6 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform active:scale-95"
                                {...nextButtonProps}
                            >
                                {isLastStep ? 'Terminer' : nextButtonText}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
    // eslint-disable-next-line no-unused-vars
    const [parentHeight, setParentHeight] = useState(0);

    return (
        <motion.div
            animate={{ height: isCompleted ? 0 : 'auto' }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={className}
        >
            <AnimatePresence initial={false} mode="wait" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SlideTransition({ children, direction }) {
    return (
        <motion.div
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}

const stepVariants = {
    enter: dir => ({
        x: dir >= 0 ? 50 : -50,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: dir => ({
        x: dir >= 0 ? -50 : 50,
        opacity: 0
    })
};

export function Step({ children }) {
    return <div className="w-full h-full">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
    const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) onClickStep(step);
    };

    return (
        <motion.div
            onClick={handleClick}
            className="relative cursor-pointer outline-none focus:outline-none z-10"
            animate={status}
            initial={false}
        >
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: '#1f2937', color: '#9ca3af', borderColor: '#374151' },
                    active: { scale: 1.1, backgroundColor: '#3b82f6', color: '#ffffff', borderColor: '#3b82f6' },
                    complete: { scale: 1, backgroundColor: '#3b82f6', color: '#ffffff', borderColor: '#3b82f6' }
                }}
                transition={{ duration: 0.3 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold shadow-lg"
            >
                {status === 'complete' ? (
                    <FaCheck className="w-4 h-4" />
                ) : status === 'active' ? (
                    <div className="w-3 h-3 rounded-full bg-white" />
                ) : (
                    <span className="text-sm">{step}</span>
                )}
            </motion.div>
        </motion.div>
    );
}

function StepConnector({ isComplete }) {
    const lineVariants = {
        incomplete: { width: 0, backgroundColor: 'rgba(59, 130, 246, 0)' },
        complete: { width: '100%', backgroundColor: '#3b82f6' }
    };

    return (
        <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded bg-gray-700">
            <motion.div
                className="absolute left-0 top-0 h-full"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? 'complete' : 'incomplete'}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}
