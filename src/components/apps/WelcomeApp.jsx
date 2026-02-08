import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import slide content from AllSlides
import {
    SIESlide, CVSlide, PortfolioSlide,
    VeilleSlide, GuideSlide, ContactSlide, ProfileSlide
} from '../onboarding/slides/AllSlides';
import { CertifsSlide } from '../onboarding/slides/CertifsSlide';

// Slide data with titles for navigation
const SLIDES = [
    { id: 'profil', title: 'Profil', component: ProfileSlide },
    { id: 'sie', title: 'SIE', component: SIESlide },
    { id: 'cv', title: 'CV', component: CVSlide },
    { id: 'portfolio', title: 'Portfolio', component: PortfolioSlide },
    { id: 'certifs', title: 'Certifications', component: CertifsSlide },
    { id: 'veille', title: 'Veille', component: VeilleSlide },
    { id: 'guide', title: 'Guide', component: GuideSlide },
    { id: 'contact', title: 'Contact', component: ContactSlide },
];

// Mon Parcours content with scroll reveal
function MonParcoursContent() {
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const paragraphs = container.querySelectorAll('.reveal-para');

        paragraphs.forEach((para) => {
            gsap.fromTo(
                para,
                { opacity: 0.2, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: para,
                        scroller: container,
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1,
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const paragraphs = [
        "Bienvenue dans mon portfolio numérique ! J'ai conçu cet espace comme un véritable système d'exploitation macOS pour démontrer ma passion pour les systèmes informatiques. Ce choix n'est pas anodin : macOS est l'environnement que j'utilise quotidiennement, bien que je maîtrise également Windows et Linux dans le cadre de mes missions professionnelles.",
        "Mon appétence pour l'informatique remonte à l'enfance. Dès 12 ans, je créais mon premier serveur privé pour un jeu en ligne : gestion de base de données MySQL, création d'assets graphiques, coordination d'une équipe de modérateurs bénévole. Cette passion m'a naturellement orienté vers un Bac Pro Systèmes Électroniques Numériques en 2011.",
        "Pendant 10 ans, j'ai travaillé dans les secteurs de la production et de la logistique au Luxembourg. Bien que cette expérience m'ait apporté rigueur et méthode, j'ai progressivement ressenti le besoin de retrouver un métier offrant des défis quotidiens et un apprentissage continu. L'informatique me manquait.",
        "À 28 ans, j'ai pris la décision de reprendre mes études en BTS SIO SISR, dans la continuité logique de mon Bac Pro SEN. Ce fut la meilleure décision de ma vie. Ma passion pour les systèmes et réseaux informatiques est revenue intacte, et je m'épanouis pleinement dans les missions qui me sont confiées chez SIE.",
        "Mon ambition après l'obtention du BTS ? Poursuivre en Licence Professionnelle Administration des Systèmes et Réseaux pour approfondir mes compétences techniques et renforcer ma compréhension globale des infrastructures informatiques."
    ];

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-4 px-6 pt-4 flex-shrink-0">
                Bienvenue dans mon portfolio interactif
            </h2>
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 pb-8 space-y-6"
            >
                {paragraphs.map((text, i) => (
                    <p key={i} className="reveal-para text-lg leading-relaxed text-gray-300">
                        {text}
                    </p>
                ))}
                <div className="pt-4 text-center">
                    <p className="text-xl text-blue-400 font-medium">
                        ✨ Naviguez librement dans les applications pour découvrir mon parcours !
                    </p>
                </div>
            </div>
        </div>
    );
}

const WelcomeApp = ({ onClose, initialSlide = 0 }) => {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [direction, setDirection] = useState(0);

    // Listen for menu bar navigation events
    useEffect(() => {
        const handleGotoSlide = (e) => {
            const slideId = e.detail?.slideId;
            if (slideId !== undefined && slideId !== currentSlide) {
                setDirection(slideId > currentSlide ? 1 : -1);
                setCurrentSlide(slideId);
            }
        };

        window.addEventListener('welcome-goto-slide', handleGotoSlide);
        return () => window.removeEventListener('welcome-goto-slide', handleGotoSlide);
    }, [currentSlide]);

    // Keyboard navigation with arrow keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                if (currentSlide < SLIDES.length - 1) {
                    setDirection(1);
                    setCurrentSlide(prev => prev + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentSlide > 0) {
                    setDirection(-1);
                    setCurrentSlide(prev => prev - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        if (currentSlide < SLIDES.length - 1) {
            setDirection(1);
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setDirection(-1);
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleFinish = () => {
        // Mark onboarding as complete
        localStorage.setItem('onboardingComplete', 'true');
        if (onClose) onClose();
    };

    const CurrentComponent = SLIDES[currentSlide].component;

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white select-none">
            {/* Header with slide navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2a2a2a] border-b border-white/10 flex-shrink-0">
                {/* Slide tabs */}
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    {SLIDES.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${index === currentSlide
                                ? 'bg-blue-500 text-white'
                                : index < currentSlide
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {index < currentSlide && <FaCheck className="inline mr-1" size={10} />}
                            {slide.title}
                        </button>
                    ))}
                </div>

                {/* Progress */}
                <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
                    {currentSlide + 1}/{SLIDES.length}
                </span>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 overflow-y-auto"
                    >
                        <CurrentComponent />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer navigation */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#2a2a2a] border-t border-white/10 flex-shrink-0 text-sm">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${currentSlide === 0
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-white/10 text-white'
                        }`}
                >
                    <FaChevronLeft size={12} />
                    <span>Précédent</span>
                </button>

                {/* Dots indicator */}
                <div className="flex gap-2">
                    {SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                ? 'bg-blue-500 w-4'
                                : index < currentSlide
                                    ? 'bg-green-500'
                                    : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>

                {currentSlide === SLIDES.length - 1 ? (
                    <button
                        onClick={handleFinish}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-400 text-white font-medium transition-all"
                    >
                        <span>Terminer</span>
                        <FaCheck size={12} />
                    </button>
                ) : (
                    <button
                        onClick={nextSlide}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white transition-all"
                    >
                        <span>Suivant</span>
                        <FaChevronRight size={12} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default WelcomeApp;
