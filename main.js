import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. LENIS SMOOTH SCROLL & UNIFIED MASTER RAF
  // ------------------------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.8,
    infinite: false
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ------------------------------------------------------------------------
  // 2. DOM ELEMENT REFERENCES
  // ------------------------------------------------------------------------
  const introCurtain = document.getElementById('intro-curtain');
  const scene01Stage = document.getElementById('scene-01-stage');
  const interactiveCard = document.getElementById('interactive-card');
  const heroImg = document.getElementById('hero-img');
  const heroDisc = document.getElementById('hero-disc-container');
  const orbitRing = document.getElementById('orbit-ring');
  const heroHalo = document.querySelector('.hero-halo');
  const cardinals = document.querySelectorAll('.cardinal');
  const cardinalTL = document.querySelector('.cardinal-tl');
  const cardinalTR = document.querySelector('.cardinal-tr');
  const cardinalBL = document.querySelector('.cardinal-bl');
  const cardinalBR = document.querySelector('.cardinal-br');
  const watermark = document.querySelector('.hero-watermark');
  const caption = document.querySelector('.hero-caption');
  const marquees = document.querySelectorAll('.marquee-strip');
  const kanjiLeft = document.querySelector('.kanji-left');
  const kanjiRight = document.querySelector('.kanji-right');
  const satellites = document.querySelectorAll('.satellite-node');
  const satelliteHotroll = document.querySelector('.satellite-hotroll');
  const satelliteBadge = document.querySelector('.satellite-badge');

  const typoLeft = document.querySelector('.typo-layer-left');
  const typoRight = document.querySelector('.typo-layer-right');
  const shutterTop = document.querySelector('.shutter-blade-top');
  const shutterBtm = document.querySelector('.shutter-blade-bottom');

  // ------------------------------------------------------------------------
  // 3. RAPID SMOOTH ENTRANCE (IMMEDIATE FRAME A FIDELITY)
  // ------------------------------------------------------------------------
  if (introCurtain) {
    gsap.to(introCurtain, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        introCurtain.style.display = 'none';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. SCENE 01: ARCHITECTURAL SHUTTER SPLIT PINNED TIMELINE
  // ------------------------------------------------------------------------
  const scene01Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene01Stage,
      start: 'top top',
      end: '+=180% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  // Phase 1 (0.00 -> 0.25): Frame A Cardinal & Satellite Elements Exit
  scene01Tl
    .to([cardinalTL, cardinalTR].filter(Boolean), {
      yPercent: -50,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to([cardinalBL, cardinalBR].filter(Boolean), {
      yPercent: 50,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(caption, {
      yPercent: 40,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(orbitRing, {
      scale: 1.35,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, 0.02)
    .to(heroHalo, {
      scale: 1.4,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.02)
    .to(satelliteHotroll, {
      x: -80,
      y: -30,
      scale: 0.5,
      opacity: 0,
      duration: 0.20,
      ease: 'power2.in'
    }, 0.02)
    .to(satelliteBadge, {
      x: 80,
      y: 30,
      scale: 0.5,
      opacity: 0,
      duration: 0.20,
      ease: 'power2.in'
    }, 0.02);

  // Phase 2 (0.10 -> 0.85): Shutter Split & Monolith Full Disclosure
  scene01Tl
    .to(heroDisc, {
      width: 'clamp(340px, 32vw, 460px)',
      height: '74vh',
      duration: 0.70,
      ease: 'power2.inOut'
    }, 0.10)
    .to(interactiveCard, {
      clipPath: 'polygon(0% 4%, 100% 4%, 100% 96%, 0% 96%)',
      borderRadius: '16px',
      borderWidth: '1.5px',
      duration: 0.70,
      ease: 'power2.inOut'
    }, 0.10)
    .to(heroImg, {
      scale: 1.02,
      duration: 0.70,
      ease: 'power2.inOut'
    }, 0.10)
    .to([shutterTop, shutterBtm], {
      opacity: 0.7,
      duration: 0.40,
      ease: 'power1.out'
    }, 0.20)
    .fromTo(typoLeft,
      { xPercent: -25, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
      0.20
    )
    .fromTo(typoRight,
      { xPercent: 25, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
      0.20
    );

  // Phase 3 (0.80 -> 1.00): Sustained 4K Presence (Zero Blank State)
  scene01Tl
    .to([typoLeft, typoRight], {
      opacity: 0.7,
      duration: 0.20,
      ease: 'power1.out'
    }, 0.80);


  // ------------------------------------------------------------------------
  // 5. SCENE 02: HOT ROLLS CROCANTES (MONÓLITO & TENSÃO TIPOGRÁFICA UNPINNED)
  // ------------------------------------------------------------------------
  const scene02Stage = document.getElementById('scene-02-hotroll');
  const monolithSlab = document.querySelector('.monolith-slab');
  const monolithImg = document.querySelector('.monolith-img');
  const typoCut = document.querySelector('.typo-backdrop-cut');
  const editorialField = document.querySelector('.editorial-field');

  const scene02Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene02Stage,
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 1.0
    }
  });

  scene02Tl
    .fromTo(monolithSlab,
      { yPercent: 14, scale: 0.96 },
      { yPercent: -6, scale: 1.00, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(monolithImg,
      { yPercent: -8 },
      { yPercent: 6, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(typoCut,
      { xPercent: 6, opacity: 0.05 },
      { xPercent: -6, opacity: 0.12, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(editorialField,
      { xPercent: 12, opacity: 0.2 },
      { xPercent: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      0.15
    );


  // ------------------------------------------------------------------------
  // 6. SCENE 03: BANQUETES & COMBINADOS (HORIZONTE ZENITAL 94VW PINNED)
  // ------------------------------------------------------------------------
  const scene03Stage = document.getElementById('scene-03-combinados');
  const horizonFrame = document.querySelector('.horizon-frame');
  const horizonImg = document.querySelector('.horizon-img');
  const horizonContent = document.querySelector('.horizon-content-dock');
  const topBeam = document.querySelector('.top-beam');

  const scene03Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene03Stage,
      start: 'top top',
      end: '+=140% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  scene03Tl
    .fromTo(horizonFrame,
      { scale: 0.94, opacity: 0.7 },
      { scale: 1.00, opacity: 1, duration: 0.35, ease: 'power2.out' },
      0
    )
    .fromTo(horizonImg,
      { yPercent: 0 },
      { yPercent: -12, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(topBeam,
      { opacity: 0.3, yPercent: -15 },
      { opacity: 1, yPercent: 0, duration: 0.3, ease: 'power2.out' },
      0.1
    )
    .fromTo(horizonContent,
      { yPercent: 25, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
      0.15
    );


  // ------------------------------------------------------------------------
  // 7. SCENE 04: EXPEDIÇÃO NOTURNA (TWIN SLICES UNPINNED PARALLAX)
  // ------------------------------------------------------------------------
  const scene04Stage = document.getElementById('scene-04-expedicao');
  const sliceA = document.querySelector('.slice-a');
  const sliceB = document.querySelector('.slice-b');
  const blockLeft = document.querySelector('.block-left');
  const blockRight = document.querySelector('.block-right');
  const stripHeader = document.querySelector('.top-header-strip');

  const scene04Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene04Stage,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.0
    }
  });

  scene04Tl
    .fromTo(sliceA,
      { yPercent: 12 },
      { yPercent: -8, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(sliceB,
      { yPercent: -8 },
      { yPercent: 10, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(stripHeader,
      { opacity: 0.2, yPercent: -15 },
      { opacity: 1, yPercent: 0, duration: 0.3, ease: 'power2.out' },
      0.05
    )
    .fromTo(blockLeft,
      { xPercent: -10, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      0.1
    )
    .fromTo(blockRight,
      { xPercent: 10, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      0.15
    );


  // ------------------------------------------------------------------------
  // 8. SCENE 05: FINAL PÔSTER GASTRONÔMICO & CONVERSÃO
  // ------------------------------------------------------------------------
  const scene05Stage = document.getElementById('scene-05-poster');
  const posterCanvas = document.querySelector('.poster-canvas');
  const posterBgImg = document.querySelector('.poster-bg-img');

  const scene05Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene05Stage,
      start: 'top 75%',
      end: 'bottom bottom',
      scrub: 1.0
    }
  });

  scene05Tl
    .fromTo(posterCanvas,
      { yPercent: 15, opacity: 0.3 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
      0
    )
    .fromTo(posterBgImg,
      { scale: 1.10 },
      { scale: 1.02, duration: 1.0, ease: 'none' },
      0
    );


  // ------------------------------------------------------------------------
  // 9. POINTER TILT ON FIRST FRAME (DAMPENED VIA GSAP TICKER)
  // ------------------------------------------------------------------------
  let pointerX = 0;
  let pointerY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  const onPointerMove = (e) => {
    if (window.scrollY > window.innerHeight * 0.1) return;
    const { innerWidth, innerHeight } = window;
    pointerX = (e.clientX / innerWidth - 0.5) * 2;
    pointerY = (e.clientY / innerHeight - 0.5) * 2;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  gsap.ticker.add(() => {
    if (window.scrollY < window.innerHeight * 0.15) {
      currentTiltX += (pointerX * 10 - currentTiltX) * 0.08;
      currentTiltY += (-pointerY * 10 - currentTiltY) * 0.08;

      if (interactiveCard && !ScrollTrigger.isScrolling) {
        gsap.set(interactiveCard, {
          rotateY: currentTiltX,
          rotateX: currentTiltY,
          transformPerspective: 1000
        });
      }
    }
  });


  // ------------------------------------------------------------------------
  // 10. RESIZE & REFRESH HANDLER
  // ------------------------------------------------------------------------
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});
