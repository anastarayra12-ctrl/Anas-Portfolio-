import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const width = 1080;
  const height = 1080;
  const artifactDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio';
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:5173...');
  await page.setViewport({ width, height, deviceScaleFactor: 2 }); // Scale factor 2 for high quality

  // Go to page
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // The splash screen animations finish their initial state around 1.2s to 1.5s.
  // We'll wait exactly 1.6s so everything is fully visible before it starts fading out at 2.2s.
  await new Promise(r => setTimeout(r, 1600));

  const outPath = path.join(artifactDir, 'Instagram_Splash.png');
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height } });
  
  console.log(`Saved Instagram splash screenshot to ${outPath}`);

  await browser.close();
})();
