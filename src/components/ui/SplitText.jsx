import React from 'react';
import { motion } from 'framer-motion';

const SplitText = ({
    text,
    className = '',
    delay = 100,
    duration = 1,
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    textAlign = 'center',
    ease = "circOut"
}) => {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: delay / 1000,
                delayChildren: 0.1 // Fixed typo
            }
        }
    };

    const child = {
        hidden: { ...from },
        visible: {
            ...to,
            transition: {
                duration,
                ease, // Uses prop
                type: ease.includes('spring') || ease.includes('elastic') ? 'spring' : 'tween'
            }
        }
    };

    return (
        <motion.div
            className={className}
            style={{ textAlign, display: 'block' }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <span key={index} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            style={{ display: 'inline-block' }}
                            key={charIndex}
                            variants={child}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    );
};

export default SplitText;
