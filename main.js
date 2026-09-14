import gsap from 'gsap';

// Initialize Entrance & Micro-Interactions
window.addEventListener('DOMContentLoaded', () => {
  const introCurtain = document.getElementById('intro-curtain');
  const interactiveCard = document.getElementById('interactive-card');
  const heroImg = document.getElementById('hero-img');
  const heroDisc = document.getElementById('hero-disc-container');
  const orbitRing = document.getElementById('orbit-ring');
  const cardinals = document.querySelectorAll('.cardinal');
  const watermark = document.querySelector('.hero-watermark');
  const caption = document.querySelector('.hero-caption');
  const marquees = document.querySelectorAll('.marquee-strip');
  const kanjis = document.querySelectorAll('.kanji-flank');
  const satellites = document.querySelectorAll('.satellite-node');

  // GSAP Master Timeline for Opening Entry
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Initial State Setup
  gsap.set(cardinals, { opacity: 0, y: (i) => (i < 2 ? -20 : 20) });
  gsap.set(marquees, { opacity: 0, scale: 0.95 });
  gsap.set(kanjis, { opacity: 0, x: (i) => (i === 0 ? -30 : 30) });
  gsap.set(caption, { opacity: 0, y: 25 });
  gsap.set(watermark, { opacity: 0, scale: 0.9 });
  gsap.set(orbitRing, { opacity: 0, scale: 0.8, rotate: -45 });
  gsap.set(heroDisc, { opacity: 0, scale: 0.75, rotateX: 15 });
  gsap.set(satellites, { opacity: 0, scale: 0.5 });
  gsap.set(heroImg, { scale: 1.3 });

  // Entry Choreography
  tl
    // 1. Lift Intro Curtain
    .to(introCurtain, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        if (introCurtain) introCurtain.style.display = 'none';
      }
    })
    // 2. Expand Kinetic Background Marquees & Kanjis
    .to(marquees, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')
    .to(kanjis, {
      opacity: 1,
      x: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=1.2')
    // 3. Expand Hero Disc & Reveal Tactile Image
    .to(heroDisc, {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 1.3,
      ease: 'expo.out'
    }, '-=1.0')
    .to(heroImg, {
      scale: 1.08,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=1.3')
    // 4. Reveal Satellites & Orbital Typography
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
      opacity: 0.04,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=1.2')
    // 5. Stagger Cardinal Corners
    .to(cardinals, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.8')
    // 6. Reveal Editorial Headline Lockup
    .to(caption, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6');

  // Multi-Plane 2.5D Tilt Parallax on Pointer Movement
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetPosX = 0;
  let targetPosY = 0;
  let currentPosX = 0;
  let currentPosY = 0;

  const handlePointerMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

    targetRotY = x * 14; // max 14 deg tilt
    targetRotX = -y * 14;
    targetPosX = x * 15;
    targetPosY = y * 15;
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  // Render loop for butter-smooth damping across multiple visual planes
  const renderTilt = () => {
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentPosX += (targetPosX - currentPosX) * 0.06;
    currentPosY += (targetPosY - currentPosY) * 0.06;

    if (interactiveCard) {
      interactiveCard.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(15px)`;
    }

    satellites.forEach((sat, idx) => {
      const factor = idx === 0 ? -1.2 : 1.4;
      sat.style.transform = `translate3d(${(currentPosX * factor).toFixed(2)}px, ${(currentPosY * factor).toFixed(2)}px, 25px)`;
    });

    requestAnimationFrame(renderTilt);
  };

  renderTilt();

  // Mobile Device Orientation (Gyroscope fallback)
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetRotY = Math.min(Math.max(e.gamma / 3.5, -14), 14);
        targetRotX = Math.min(Math.max((e.beta - 45) / 3.5, -14), 14);
      }
    }, { passive: true });
  }
});
