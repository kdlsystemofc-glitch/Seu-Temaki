import puppeteer from 'puppeteer-core';
import path from 'path';

async function captureRestoredHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop 1440x900
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  const desktopErrors = [];
  pageDesktop.on('console', msg => { if (msg.type() === 'error') desktopErrors.push(msg.text()); });
  pageDesktop.on('pageerror', err => desktopErrors.push(err.toString()));

  console.log('Loading Desktop http://localhost:5181 ...');
  await pageDesktop.goto('http://localhost:5181', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  await pageDesktop.screenshot({ path: path.resolve('screenshots/desktop_1440x900_restored.png') });
  console.log('Desktop Screenshot Captured. Errors:', desktopErrors);

  // 2. Mobile 390x844
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  const mobileErrors = [];
  pageMobile.on('console', msg => { if (msg.type() === 'error') mobileErrors.push(msg.text()); });
  pageMobile.on('pageerror', err => mobileErrors.push(err.toString()));

  console.log('Loading Mobile http://localhost:5181 ...');
  await pageMobile.goto('http://localhost:5181', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  await pageMobile.screenshot({ path: path.resolve('screenshots/mobile_390x844_restored.png') });
  console.log('Mobile Screenshot Captured. Errors:', mobileErrors);

  await browser.close();
  console.log('Hero Verification Complete!');
}

captureRestoredHero().catch(err => {
  console.error(err);
  process.exit(1);
});
