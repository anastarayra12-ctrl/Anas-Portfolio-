import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const svgContent = `
<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="#3B82F6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <polygon points="50,50 57,58 50,66 43,58" fill="#38BDF8" />
  <circle cx="50" cy="14" r="3.5" fill="#38BDF8" />
  <circle cx="18" cy="84" r="3.5" fill="#3B82F6" />
  <circle cx="82" cy="84" r="3.5" fill="#2563EB" />
</svg>
`;

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; align-items: center; width: 1024px; height: 1024px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>
`;

(async () => {
  try {
    fs.writeFileSync('temp_logo.html', html);
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 2 });
    
    const fileUrl = 'file:///' + path.resolve('temp_logo.html').replace(/\\/g, '/');
    await page.goto(fileUrl);
    
    const outPath = path.resolve('..', 'Anas_Logo_Transparent.png');
    await page.screenshot({ path: outPath, omitBackground: true });
    
    await browser.close();
    fs.unlinkSync('temp_logo.html');
    console.log('PNG saved to:', outPath);
  } catch(e) {
    console.error(e);
  }
})();
