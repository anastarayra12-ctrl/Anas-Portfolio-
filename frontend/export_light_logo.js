import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const svgContent = `
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
  <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
    <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="#3B82F6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <polygon points="50,50 57,58 50,66 43,58" fill="#38BDF8" />
    <circle cx="50" cy="14" r="3.5" fill="#38BDF8" />
    <circle cx="18" cy="84" r="3.5" fill="#3B82F6" />
    <circle cx="82" cy="84" r="3.5" fill="#2563EB" />
  </svg>
  <div style="color: #09090B; font-family: 'Space Grotesk', sans-serif; text-align: center;">
    <div style="font-size: 2.2rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Anas Tarayra</div>
    <div style="font-size: 1rem; color: #185FA5; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px;">UI/UX & Engineering</div>
  </div>
</div>
`;

const html = `
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; align-items: center; width: 1080px; height: 1080px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>
`;

(async () => {
  try {
    const tempHtmlPath = path.resolve('temp_light_logo.html');
    fs.writeFileSync(tempHtmlPath, html);
    
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
    
    const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    const outDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\الهوية البصرية';
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    const outPath = path.join(outDir, 'Logo_Light_Background.png');
    await page.screenshot({ path: outPath, omitBackground: true });
    
    await browser.close();
    fs.unlinkSync(tempHtmlPath);
    console.log('Light Logo PNG saved to:', outPath);
  } catch(e) {
    console.error(e);
  }
})();
