import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const artifactDir = 'C:\\Users\\anast\\.gemini\\antigravity\\brain\\90629da6-2410-4d73-b472-664888753cee';
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Desktop Screenshot
  console.log('Navigating to http://localhost:5173 (Desktop)...');
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000)); // Wait for splash animation to finish

  const desktopPath = path.join(artifactDir, 'desktop_preview.png');
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`Saved desktop screenshot to ${desktopPath}`);

  // 2. Mobile Screenshot
  console.log('Navigating to http://localhost:5173 (Mobile)...');
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const mobilePath = path.join(artifactDir, 'mobile_preview.png');
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Saved mobile screenshot to ${mobilePath}`);

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
