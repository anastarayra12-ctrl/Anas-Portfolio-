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
  await page.setViewport({ width, height, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // Wait for the elements to fully animate in (1.6s)
  await new Promise(r => setTimeout(r, 1600));

  // Modify the page to hide the background and the loading bar
  await page.evaluate(() => {
    // Make body and html transparent
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';
    
    // Find the splash screen container (fixed inset-0)
    const allDivs = document.querySelectorAll('div');
    for (const div of allDivs) {
      if (div.style.position === 'fixed' && div.style.zIndex === '9999') {
        div.style.backgroundColor = 'transparent';
        
        // Hide the loading bar (it's the last child in that div usually, or we can check its height/style)
        const children = div.children;
        for (const child of children) {
          if (child.style.height === '2px') {
            child.style.display = 'none';
          }
        }
      }
    }
  });

  const outPath = path.join(artifactDir, 'Logo_With_Name_Transparent.png');
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height }, omitBackground: true });
  
  console.log(`Saved transparent logo screenshot to ${outPath}`);

  await browser.close();
})();
