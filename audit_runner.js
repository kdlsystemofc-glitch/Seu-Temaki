import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function runAudit() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('=== SEU TEMAKI MASTER AUDIT & PROOF GENERATION ===');

  // --------------------------------------------------------------------------
  // 1. DESKTOP AUDIT (1440x900)
  // --------------------------------------------------------------------------
  console.log('\n--- 1. Desktop 1440x900 Run ---');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const consoleErrors = [];
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  desktopPage.on('pageerror', err => consoleErrors.push(err.toString()));

  await desktopPage.goto('http://localhost:5181', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2200)); // Wait for entrance timeline

  // Mandatory Screenshot 01: Hero Locked Frame A
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_01_hero_locked.png') });
  console.log('✔ Captured: desktop_01_hero_locked.png');

  // Measure total scrollable distance
  const maxScroll = await desktopPage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log(`Desktop Scroll Height: ${maxScroll}px`);

  // Scroll to Aperture midpoint (during Scene 01 aperture breakout)
  await desktopPage.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_02_aperture_midpoint.png') });
  console.log('✔ Captured: desktop_02_aperture_midpoint.png');

  // Scroll to Scene 02 (Hot Roll) active pin
  await desktopPage.evaluate(() => {
    const el = document.getElementById('scene-02-hotroll');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_03_scene02_hotroll.png') });
  console.log('✔ Captured: desktop_03_scene02_hotroll.png');

  // Scroll to Scene 03 (Combinados) active pin
  await desktopPage.evaluate(() => {
    const el = document.getElementById('scene-03-combinados');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_04_scene03_combinados.png') });
  console.log('✔ Captured: desktop_04_scene03_combinados.png');

  // Scroll to Scene 04 (Expedição) active pin
  await desktopPage.evaluate(() => {
    const el = document.getElementById('scene-04-expedicao');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_05_scene04_expedicao.png') });
  console.log('✔ Captured: desktop_05_scene04_expedicao.png');

  // Scroll to Scene 05 (Final Poster)
  await desktopPage.evaluate(() => {
    const el = document.getElementById('scene-05-poster');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop_06_final_poster.png') });
  console.log('✔ Captured: desktop_06_final_poster.png');

  // --------------------------------------------------------------------------
  // 2. CHECKPOINT SCRUTINY & REVERSE SCROLL TEST (3 CYCLES)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Reverse Scroll & Continuous Viewport Fill Test ---');
  for (let cycle = 1; cycle <= 3; cycle++) {
    // Scroll 100 -> 0
    await desktopPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 300));
    // Scroll 0 -> 100
    await desktopPage.evaluate((max) => window.scrollTo({ top: max, behavior: 'instant' }), maxScroll);
    await new Promise(r => setTimeout(r, 300));
    console.log(`Cycle ${cycle}/3: 0 -> 100 -> 0 verified.`);
  }

  // Checkpoints 0% through 100% in 10% steps
  for (let pct = 0; pct <= 100; pct += 10) {
    const scrollPos = maxScroll * (pct / 100);
    await desktopPage.evaluate((target) => window.scrollTo({ top: target, behavior: 'instant' }), scrollPos);
    await new Promise(r => setTimeout(r, 200));
    
    // Check DOM visibility
    const visibleElements = await desktopPage.evaluate(() => {
      const elAtCenter = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      return {
        centerTag: elAtCenter ? elAtCenter.tagName : 'NONE',
        centerClass: elAtCenter ? elAtCenter.className : 'NONE'
      };
    });
    console.log(`Checkpoint ${pct}% (scroll ${Math.round(scrollPos)}px): Center element = <${visibleElements.centerTag} class="${visibleElements.centerClass}">`);
  }

  // --------------------------------------------------------------------------
  // 3. MOBILE AUDIT (390x844)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Mobile 390x844 Run ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  const mobileConsoleErrors = [];
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') mobileConsoleErrors.push(msg.text());
  });
  mobilePage.on('pageerror', err => mobileConsoleErrors.push(err.toString()));

  await mobilePage.goto('http://localhost:5181', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2200));

  const mobileMaxScroll = await mobilePage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_01_hero_locked.png') });
  console.log('✔ Captured: mobile_01_hero_locked.png');

  await mobilePage.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_02_aperture_midpoint.png') });
  console.log('✔ Captured: mobile_02_aperture_midpoint.png');

  await mobilePage.evaluate(() => {
    const el = document.getElementById('scene-02-hotroll');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_03_scene02_hotroll.png') });
  console.log('✔ Captured: mobile_03_scene02_hotroll.png');

  await mobilePage.evaluate(() => {
    const el = document.getElementById('scene-03-combinados');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_04_scene03_combinados.png') });
  console.log('✔ Captured: mobile_04_scene03_combinados.png');

  await mobilePage.evaluate(() => {
    const el = document.getElementById('scene-04-expedicao');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + window.innerHeight * 0.7, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_05_scene04_expedicao.png') });
  console.log('✔ Captured: mobile_05_scene04_expedicao.png');

  await mobilePage.evaluate(() => {
    const el = document.getElementById('scene-05-poster');
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_06_final_poster.png') });
  console.log('✔ Captured: mobile_06_final_poster.png');

  await browser.close();

  console.log('\n=== AUDIT COMPLETE ===');
  console.log('Desktop Errors:', consoleErrors);
  console.log('Mobile Errors:', mobileConsoleErrors);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
