import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import SIECubeLogo from '../../effects/SIECubeLogo';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const cardData = [
    {
        color: '#060010',
        label: 'Identité',
        render: () => (
            <div className="w-full h-full flex items-center justify-center p-2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                    <img src="/assets/cv-photo.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        )
    },
    {
        color: '#060010',
        label: 'Profil',
        render: () => (
            <div className="flex flex-col h-full justify-between p-1">
                <div>
                    <h3 className="text-lg font-bold text-white leading-tight">Yassine Dinar</h3>
                    <p className="text-xs text-blue-300 font-medium">Technicien en Reconversion</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">30 ans • Audun-le-Tiche, Grand Est</p>
                </div>

                <div className="mt-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Passionné par :</p>
                    <ul className="text-xs text-gray-300 space-y-0.5">
                        <li className="flex items-center gap-1.5"><span className="text-blue-500">›</span> Systèmes & Réseaux</li>
                        <li className="flex items-center gap-1.5"><span className="text-purple-500">›</span> Cybersécurité</li>
                        <li className="flex items-center gap-1.5"><span className="text-pink-500">›</span> Technologies IA</li>
                        <li className="flex items-center gap-1.5"><span className="text-green-500">›</span> Automatisation</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        color: '#060010',
        label: 'Formation',
        render: () => (
            <div className="flex flex-col h-full justify-between gap-2 p-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-semibold text-blue-300 mb-0.5">Campus MEWO - Metz</h3>
                        <p className="text-xs text-gray-400">Technopôle de Metz</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg w-20 h-20 flex items-center justify-center shadow-lg">
                        <img src="/assets/images/mewo_logo.png" alt="MEWO" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-purple-300 mb-0.5">BTS SIO option SISR</h3>
                    <p className="text-[10px] text-gray-400 italic">Solutions d'Infrastructure, Systèmes et Réseaux</p>
                    <p className="text-xs text-gray-500 mt-1">Sept 2024 - Juin 2026</p>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Pourquoi SISR ?</p>
                    <p className="text-xs text-gray-300 leading-tight">
                        Passion pour les <span className="text-blue-300">infrastructures physiques</span>, la <span className="text-purple-300">sécurité réseau</span> et le <span className="text-green-300">service aux utilisateurs</span>.
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-300 font-medium">Rythme d'alternance :</p>
                    <ul className="text-xs text-gray-400 pl-2 space-y-0.5">
                        <li className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                            1 jour/semaine en cours
                        </li>
                        <li className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                            1 semaine complète/mois
                        </li>
                    </ul>
                    <p className="text-xs text-gray-300 mt-1"><span className="text-blue-400">•</span> Épreuve E5 : Mai 2026</p>
                </div>

                <div className="mt-1">
                    <p className="text-xs text-green-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">→ Objectif : Licence Pro Admin Sys & Réseaux</p>
                </div>
            </div>
        )
    },
    {
        color: '#060010',
        label: 'Parcours',
        render: () => (
            <div className="flex flex-col h-full p-2 gap-2 relative overflow-hidden justify-between">
                {/* Timeline */}
                <div className="flex flex-col gap-2 relative pl-2 pt-1">
                    {/* Line connecting dots */}
                    <div className="absolute left-[3.5px] top-1.5 bottom-4 w-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30"></div>

                    {/* Item 1 */}
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <h4 className="text-xs font-bold text-white mb-0.5">2014 ⚡ Bac Pro SEN</h4>
                        <p className="text-[10px] text-gray-400">Systèmes Électroniques Numériques</p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                        <h4 className="text-xs font-bold text-white mb-0.5">2014-2024 🏭 10 ans Logistique</h4>
                        <p className="text-[10px] text-gray-400">Rigueur, Méthode, Gestion de flux</p>
                    </div>

                    {/* Item 3 */}
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <h4 className="text-xs font-bold text-white mb-0.5">2024 💻 Reconversion IT</h4>
                        <p className="text-[10px] text-gray-400">Retour à la passion systèmes et réseaux</p>
                    </div>
                </div>

                {/* Summary / Badges */}
                <div className="mt-1 pt-2 border-t border-white/5">
                    <p className="text-[10px] text-gray-300 font-medium mb-1.5">
                        <span className="text-purple-300">10 ans d'expertise organisationnelle</span> au service de l'IT
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {['Rigueur', 'Gestion de flux', 'Méthode', 'Travail d\'équipe'].map((skill, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-gray-300 border border-white/10 whitespace-nowrap">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        color: '#060010',
        label: 'Entreprise',
        render: () => (
            <div className="flex h-full items-center justify-between p-2 relative overflow-hidden group">
                <div className="flex flex-col justify-center z-10 w-full">
                    <h3 className="text-xl font-bold text-white mb-0.5">SIE</h3>
                    <p className="text-xs text-blue-200 font-medium whitespace-nowrap">Technicien Systèmes & Réseaux</p>
                    <p className="text-[10px] text-gray-400 mt-1 max-w-[140px]">Administration & Support</p>
                </div>
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 scale-[0.4] opacity-90 z-20">
                    <div className="w-[300px] h-[300px] flex items-center justify-center">
                        <SIECubeLogo />
                    </div>
                </div>
            </div>
        )
    },
    {
        color: '#060010',
        label: 'Missions',
        title: 'Sécurité',
        description: 'Administration système et support utilisateur'
    }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = radius => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false
}) => {
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const timeoutsRef = useRef([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef(null);

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;

        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        magnetismAnimationRef.current?.kill();

        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    particle.parentNode?.removeChild(particle);
                }
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;

        if (!particlesInitialized.current) {
            initializeParticles();
        }

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true);
                cardRef.current.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }, index * 100);

            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;

        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 5,
                    rotateY: 5,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseMove = e => {
            if (!enableTilt && !enableMagnetism) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleClick = e => {
            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                {
                    scale: 0,
                    opacity: 1
                },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                }
            );
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

    return (
        <div
            ref={cardRef}
            className={`${className} relative overflow-hidden`}
            style={{ ...style, position: 'relative', overflow: 'hidden' }}
        >
            {children}
        </div>
    );
};

const GlobalSpotlight = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
    const spotlightRef = useRef(null);
    const isInsideSection = useRef(false);

    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;

        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = e => {
            if (!spotlightRef.current || !gridRef.current) return;

            const section = gridRef.current.closest('.bento-section');
            const rect = section?.getBoundingClientRect();
            const mouseInside =
                rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            isInsideSection.current = mouseInside || false;
            const cards = gridRef.current.querySelectorAll('.card');

            if (!mouseInside) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                cards.forEach(card => {
                    card.style.setProperty('--glow-intensity', '0');
                });
                return;
            }

            const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardElement = card;
                const cardRect = cardElement.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance =
                    Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) {
                    glowIntensity = 1;
                } else if (effectiveDistance <= fadeDistance) {
                    glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                }

                updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
            });

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            const targetOpacity =
                minDistance <= proximity
                    ? 0.8
                    : minDistance <= fadeDistance
                        ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                        : 0;

            gsap.to(spotlightRef.current, {
                opacity: targetOpacity,
                duration: targetOpacity > 0 ? 0.2 : 0.5,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            isInsideSection.current = false;
            gridRef.current?.querySelectorAll('.card').forEach(card => {
                card.style.setProperty('--glow-intensity', '0');
            });
            if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
    <div
        className="bento-section grid gap-4 p-4 w-full h-full select-none relative"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
        ref={gridRef}
    >
        {children}
    </div>
);

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const MagicBento = ({
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true
}) => {
    const gridRef = useRef(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    return (
        <>
            <style>
                {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.2);
            --purple-border: rgba(132, 0, 255, 0.8);
          }
          
          .card-responsive {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            gap: 1rem;
          }
          
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: repeat(3, 1fr);
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 90%;
              margin: 0 auto;
              padding: 0.5rem;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: 180px;
            }
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={false}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef}>
                <div className="card-responsive grid gap-2">
                    {cardData.map((card, index) => {
                        const baseClassName = `card flex flex-col justify-between relative h-full w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-colors duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${enableBorderGlow ? 'card--border-glow' : ''
                            }`;

                        const cardStyle = {
                            backgroundColor: card.color || 'var(--background-dark)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--white)',
                            '--glow-x': '50%',
                            '--glow-y': '50%',
                            '--glow-intensity': '0',
                            '--glow-radius': '200px'
                        };

                        if (enableStars) {
                            return (
                                <ParticleCard
                                    key={index}
                                    className={baseClassName}
                                    style={cardStyle}
                                    disableAnimations={shouldDisableAnimations}
                                    particleCount={particleCount}
                                    glowColor={glowColor}
                                    enableTilt={enableTilt}
                                    clickEffect={clickEffect}
                                    enableMagnetism={enableMagnetism}
                                >
                                    <div className="card__header flex justify-between gap-3 relative text-white">
                                        <span className="card__label text-base">{card.label}</span>
                                    </div>
                                    <div className="card__content flex flex-col relative text-white h-full justify-end">
                                        {card.render ? (
                                            card.render()
                                        ) : (
                                            <>
                                                <h3 className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                                                    {card.title}
                                                </h3>
                                                <p
                                                    className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}
                                                >
                                                    {card.description}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </ParticleCard>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={baseClassName}
                                style={cardStyle}
                                ref={el => {
                                    if (!el) return;

                                    const handleMouseMove = e => {
                                        if (shouldDisableAnimations) return;

                                        const rect = el.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        const centerX = rect.width / 2;
                                        const centerY = rect.height / 2;

                                        if (enableTilt) {
                                            const rotateX = ((y - centerY) / centerY) * -10;
                                            const rotateY = ((x - centerX) / centerX) * 10;

                                            gsap.to(el, {
                                                rotateX,
                                                rotateY,
                                                duration: 0.1,
                                                ease: 'power2.out',
                                                transformPerspective: 1000
                                            });
                                        }

                                        if (enableMagnetism) {
                                            const magnetX = (x - centerX) * 0.05;
                                            const magnetY = (y - centerY) * 0.05;

                                            gsap.to(el, {
                                                x: magnetX,
                                                y: magnetY,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }
                                    };

                                    const handleMouseLeave = () => {
                                        if (shouldDisableAnimations) return;

                                        if (enableTilt) {
                                            gsap.to(el, {
                                                rotateX: 0,
                                                rotateY: 0,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }

                                        if (enableMagnetism) {
                                            gsap.to(el, {
                                                x: 0,
                                                y: 0,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }
                                    };

                                    const handleClick = e => {
                                        if (!clickEffect || shouldDisableAnimations) return;

                                        const rect = el.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;

                                        const maxDistance = Math.max(
                                            Math.hypot(x, y),
                                            Math.hypot(x - rect.width, y),
                                            Math.hypot(x, y - rect.height),
                                            Math.hypot(x - rect.width, y - rect.height)
                                        );

                                        const ripple = document.createElement('div');
                                        ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                                        el.appendChild(ripple);

                                        gsap.fromTo(
                                            ripple,
                                            {
                                                scale: 0,
                                                opacity: 1
                                            },
                                            {
                                                scale: 1,
                                                opacity: 0,
                                                duration: 0.8,
                                                ease: 'power2.out',
                                                onComplete: () => ripple.remove()
                                            }
                                        );
                                    };

                                    el.addEventListener('mousemove', handleMouseMove);
                                    el.addEventListener('mouseleave', handleMouseLeave);
                                    el.addEventListener('click', handleClick);
                                }}
                            >
                                <div className="card__header flex justify-between gap-3 relative text-white">
                                    <span className="card__label text-base">{card.label}</span>
                                </div>
                                <div className="card__content flex flex-col relative text-white h-full justify-end">
                                    {card.render ? (
                                        card.render()
                                    ) : (
                                        <>
                                            <h3 className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                                                {card.title}
                                            </h3>
                                            <p
                                                className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}
                                            >
                                                {card.description}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default MagicBento;
