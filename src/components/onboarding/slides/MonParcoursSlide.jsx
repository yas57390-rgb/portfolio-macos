import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MonParcoursSlide = () => {
    const scrollContainerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Get all paragraphs
        const paragraphs = container.querySelectorAll('.reveal-paragraph');

        paragraphs.forEach((para) => {
            const words = para.querySelectorAll('.word');

            // Word reveal animation
            gsap.fromTo(
                words,
                {
                    opacity: 0.1,
                    filter: 'blur(4px)'
                },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    stagger: 0.03,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: para,
                        scroller: container,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    }
                }
            );

            // Paragraph rotation
            gsap.fromTo(
                para,
                { rotate: 2, transformOrigin: '0% 50%' },
                {
                    rotate: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: para,
                        scroller: container,
                        start: 'top bottom',
                        end: 'top center',
                        scrub: true,
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const splitIntoWords = (text) => {
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return <span key={index}>{word}</span>;
            return (
                <span className="inline-block word" key={index}>
                    {word}
                </span>
            );
        });
    };

    const paragraphs = [
        "Bienvenue dans mon portfolio numérique ! J'ai conçu cet espace comme un véritable système d'exploitation macOS pour démontrer ma passion pour les systèmes informatiques. Ce choix n'est pas anodin : MacOs est l'environnement que j'utilise quotidiennement, bien que je maîtrise également Windows et Linux dans le cadre de mes missions professionnelles. À travers cette interface interactive, vous découvrirez mon parcours de professionnalisation en BTS SIO option SISR.",
        "Mon appétence pour l'informatique remonte à l'enfance. Dès 12 ans, je créais mon premier serveur privé pour un jeu en ligne : gestion de base de données MySQL, création d'assets graphiques, coordination d'une équipe de modérateurs bénévole. Cette passion m'a naturellement orienté vers un Bac Pro Systèmes Électroniques Numériques en 2011.",
        "Pendant 10 ans, j'ai travaillé dans les secteurs de la production et de la logistique au Luxembourg. Bien que cette expérience m'ait apporté rigueur et méthode, j'ai progressivement ressenti le besoin de retrouver un métier offrant des défis quotidiens et un apprentissage continu. L'informatique me manquait.",
        "À 28 ans, j'ai pris la décision de reprendre mes études en BTS SIO SISR, dans la continuité logique de mon Bac Pro SEN. Ce fut la meilleure décision de ma vie. Ma passion pour les systèmes et réseaux informatiques est revenue intacte, et je m'épanouis pleinement dans les missions qui me sont confiées chez SIE, l'ESN où j'effectue mon alternance en tant que technicien systèmes et réseaux.",
        "Mon ambition après l'obtention du BTS ? Poursuivre en Licence Professionnelle Administration des Systèmes et Réseaux pour approfondir mes compétences techniques et renforcer ma compréhension globale des infrastructures informatiques. Dans ce portfolio, vous trouverez l'ensemble de mes réalisations professionnelles qui mobilisent les compétences du bloc E5 : gestion de patrimoine, support utilisateur, mode projet, mise à disposition de services et développement professionnel.",
    ];

    return (
        <div className="w-full h-full flex flex-col items-center select-none overflow-hidden">
            {/* Title - Fixed at top */}
            <h2 className="text-3xl font-semibold mb-4 text-white tracking-tight flex-shrink-0 drop-shadow-md z-10 text-center px-4">
                Bienvenue dans mon portfolio interactif
            </h2>

            {/* Scrollable Content Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 w-full max-w-3xl overflow-y-auto px-6 pb-16"
                style={{
                    scrollBehavior: 'smooth',
                    maxHeight: 'calc(100% - 80px)'
                }}
            >
                <div ref={contentRef} className="space-y-8 pt-4">
                    {paragraphs.map((text, index) => (
                        <div
                            key={index}
                            className="reveal-paragraph"
                        >
                            <p className="text-lg leading-relaxed font-medium text-gray-200">
                                {splitIntoWords(text)}
                            </p>
                        </div>
                    ))}

                    {/* Call-to-action */}
                    <div className="pt-8 pb-8 text-center">
                        <p className="text-xl text-blue-400 font-medium leading-relaxed">
                            ✨ Naviguez librement dans les applications pour découvrir mon parcours, mes projets et mes compétences. Bonne exploration !
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonParcoursSlide;
