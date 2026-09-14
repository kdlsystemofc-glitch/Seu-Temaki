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

  // ------------------------------------------------------------------------
  // 3. OPENING ENTRANCE TIMELINE (LOCKED FRAME A REVEAL)
  // ------------------------------------------------------------------------
  const entranceTl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Initial Restored State
  gsap.set(cardinals, { opacity: 0, y: (i) => (i < 2 ? -20 : 20) });
  gsap.set(marquees, { opacity: 0, scale: 0.95 });
  if (kanjiLeft) gsap.set(kanjiLeft, { opacity: 0, x: -30 });
  if (kanjiRight) gsap.set(kanjiRight, { opacity: 0, x: 30 });
  gsap.set(caption, { opacity: 0, y: 25 });
  gsap.set(watermark, { opacity: 0, scale: 0.9 });
  gsap.set(orbitRing, { opacity: 0, scale: 0.8, rotate: -45 });
  gsap.set(heroDisc, { opacity: 0, scale: 0.75, rotateX: 15 });
  gsap.set(satellites, { opacity: 0, scale: 0.5 });
  gsap.set(heroImg, { scale: 1.3 });

  entranceTl
    // Lift Intro Curtain
    .to(introCurtain, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        if (introCurtain) introCurtain.style.display = 'none';
      }
    })
    // Reveal Background Marquees & Kanjis
    .to(marquees, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')
    .to([kanjiLeft, kanjiRight].filter(Boolean), {
      opacity: 1,
      x: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=1.2')
    // Reveal Hero Disc & Food Centerpiece
    .to(heroDisc, {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 1.3,
      ease: 'expo.out'
    }, '-=1.0')
    .to(heroImg, {
      scale: 1.18,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=1.3')
    // Reveal Satellites & Orbital SVG Ring
    .to(satellites, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, '-=0.9')
    .to(orbitRing, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=1.1')
    .to(watermark, {
      opacity: 0.035,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=1.2')
    // Reveal 4 Cardinal Corners
    .to(cardinals, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.8')
    // Reveal Editorial Caption
    .to(caption, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6');

  // ------------------------------------------------------------------------
  // 4. SCENE 01: APERTURE RUPTURE & HONEST EDGE-BREAK PINNED TIMELINE
  // ------------------------------------------------------------------------
  const scene01Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene01Stage,
      start: 'top top',
      end: '+=220% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  // Phase 1 (0.00 -> 0.25): Cardinal Corners & Marquees Exit
  scene01Tl
    .to([cardinalTL, cardinalTR].filter(Boolean), {
      yPercent: -45,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0)
    .to([cardinalBL, cardinalBR].filter(Boolean), {
      yPercent: 45,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0)
    .to(marquees, {
      scaleY: 0,
      opacity: 0,
      duration: 0.22,
      ease: 'power1.out'
    }, 0)
    .to(kanjiLeft, {
      xPercent: -70,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(kanjiRight, {
      xPercent: 70,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(caption, {
      yPercent: 40,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0)
    .to(watermark, {
      scale: 1.25,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0)
    .to(orbitRing, {
      scale: 1.45,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.28,
      ease: 'power2.out'
    }, 0.04)
    .to(heroHalo, {
      scale: 1.5,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0.05)
    .to(satelliteHotroll, {
      x: -100,
      y: -40,
      scale: 0.6,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.05)
    .to(satelliteBadge, {
      x: 100,
      y: 40,
      scale: 0.6,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.05);

  // Phase 2 (0.18 -> 0.75): The Aperture Rupture & Honest Edge-Break
  scene01Tl
    .to(heroDisc, {
      width: '100vw',
      height: '100vh',
      duration: 0.57,
      ease: 'power3.inOut'
    }, 0.18)
    .to(interactiveCard, {
      clipPath: 'circle(130vmax at 50% 50%)',
      borderRadius: '0%',
      borderWidth: '0px',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.57,
      ease: 'power3.inOut'
    }, 0.18)
    .to(heroImg, {
      scale: 1.48,
      yPercent: -8,
      duration: 0.57,
      ease: 'power3.inOut'
    }, 0.18);

  // Phase 3 (0.70 -> 1.00): Food Texture Persistence & Scene 02 Handoff (NO BLANK STATE)
  scene01Tl
    .to(heroImg, {
      filter: 'brightness(0.65) saturate(1.15)',
      duration: 0.30,
      ease: 'power2.out'
    }, 0.70);


  // ------------------------------------------------------------------------
  // 5. SCENE 02: HOT ROLLS CROCANTES (ASYMMETRIC SLAB PINNED STAGE)
  // ------------------------------------------------------------------------
  const scene02Stage = document.getElementById('scene-02-hotroll');
  const hotrollSlab = document.querySelector('.hotroll-slab');
  const hotrollImg = document.querySelector('.hotroll-img');
  const hotrollContent = document.querySelector('.hotroll-content');

  const scene02Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene02Stage,
      start: 'top top',
      end: '+=150% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  scene02Tl
    .fromTo(hotrollSlab, 
      { yPercent: 18, scale: 0.94 },
      { yPercent: 0, scale: 1.00, ease: 'power2.out', duration: 0.4 },
      0
    )
    .fromTo(hotrollImg,
      { yPercent: -12, scale: 1.18 },
      { yPercent: 8, scale: 1.02, ease: 'none', duration: 1.0 },
      0
    )
    .fromTo(hotrollContent,
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: 'power2.out', duration: 0.4 },
      0.15
    );


  // ------------------------------------------------------------------------
  // 6. SCENE 03: COMBINADOS & BANQUETES (PANORAMIC SPREAD 90VW PINNED)
  // ------------------------------------------------------------------------
  const scene03Stage = document.getElementById('scene-03-combinados');
  const combinadosPanoramic = document.querySelector('.combinados-panoramic');
  const panoramicImg = document.querySelector('.panoramic-img');
  const panoramicContent = document.querySelector('.panoramic-content');
  const combinadosHeader = document.querySelector('.combinados-header');

  const scene03Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene03Stage,
      start: 'top top',
      end: '+=160% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  scene03Tl
    .fromTo(combinadosPanoramic,
      { scale: 0.94, yPercent: 8 },
      { scale: 1.00, yPercent: 0, duration: 0.35, ease: 'power2.out' },
      0
    )
    .fromTo(panoramicImg,
      { yPercent: 0, scale: 1.12 },
      { yPercent: -20, scale: 1.00, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(combinadosHeader,
      { opacity: 0.4, yPercent: 20 },
      { opacity: 1, yPercent: 0, duration: 0.3, ease: 'power2.out' },
      0.1
    )
    .fromTo(panoramicContent,
      { yPercent: 35, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      0.2
    );


  // ------------------------------------------------------------------------
  // 7. SCENE 04: EXPEDIÇÃO NOTURNA (FULL-BLEED REAL KITCHEN PINNED)
  // ------------------------------------------------------------------------
  const scene04Stage = document.getElementById('scene-04-expedicao');
  const expedicaoImg = document.querySelector('.expedicao-img');
  const expedicaoHeader = document.querySelector('.expedicao-header');
  const editorialBlocks = document.querySelectorAll('.editorial-grid-block');

  const scene04Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene04Stage,
      start: 'top top',
      end: '+=140% top',
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      anticipatePin: 1
    }
  });

  scene04Tl
    .fromTo(expedicaoImg,
      { yPercent: -8, scale: 1.10 },
      { yPercent: 4, scale: 1.00, duration: 1.0, ease: 'none' },
      0
    )
    .fromTo(expedicaoHeader,
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
      0.1
    )
    .fromTo(editorialBlocks,
      { yPercent: 40, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      0.2
    );


  // ------------------------------------------------------------------------
  // 8. SCENE 05: FINAL PÔSTER GASTRONÔMICO & CONVERSÃO
  // ------------------------------------------------------------------------
  const scene05Stage = document.getElementById('scene-05-poster');
  const posterFrame = document.querySelector('.poster-frame');
  const posterBackdropImg = document.querySelector('.poster-backdrop-img');

  const scene05Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene05Stage,
      start: 'top 75%',
      end: 'bottom bottom',
      scrub: 1.0
    }
  });

  scene05Tl
    .fromTo(posterFrame,
      { yPercent: 25, opacity: 0.2 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    )
    .fromTo(posterBackdropImg,
      { scale: 1.15 },
      { scale: 1.02, duration: 1, ease: 'none' },
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
    // Only apply tilt when near the top of the page
    if (window.scrollY > window.innerHeight * 0.1) return;
    const { innerWidth, innerHeight } = window;
    pointerX = (e.clientX / innerWidth - 0.5) * 2;
    pointerY = (e.clientY / innerHeight - 0.5) * 2;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  gsap.ticker.add(() => {
    if (window.scrollY < window.innerHeight * 0.15) {
      currentTiltX += (pointerX * 12 - currentTiltX) * 0.08;
      currentTiltY += (-pointerY * 12 - currentTiltY) * 0.08;

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

  // Ensure refresh on full image/font load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});
