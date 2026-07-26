import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // 1. Generate Brand Guide PDF
    const htmlPath = 'file:///C:/Users/anast/Downloads/anas-tarayra-brand-guide_1.html';
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    const pdfDest = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\Brand_Guide.pdf';
    await page.pdf({ path: pdfDest, format: 'A4', printBackground: true });
    console.log('PDF saved to', pdfDest);

    // 2. Generate Logo PNG
    const newSvg = `<svg width="500" height="500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="anasLogoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#042C53" />
        <stop offset="100%" stopColor="#185FA5" />
      </linearGradient>
      <linearGradient id="anasLogoGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#185FA5" />
        <stop offset="100%" stopColor="#85B7EB" />
      </linearGradient>
    </defs>
    <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="url(#anasLogoGradPrimary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M 28 58 L 72 58" stroke="url(#anasLogoGradSecondary)" stroke-width="5.5" stroke-linecap="round" fill="none"/>
    <polygon points="50,50 57,58 50,66 43,58" fill="#185FA5"/>
    <circle cx="50" cy="14" r="3.5" fill="#042C53" />
    <circle cx="18" cy="84" r="3.5" fill="#185FA5" />
    <circle cx="82" cy="84" r="3.5" fill="#85B7EB" />
  </svg>`;

    const tempHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:transparent; display:inline-block;">
      ${newSvg}
    </body>
    </html>`;
    
    const tempHtmlPath = path.join(__dirname, 'temp_logo.html');
    fs.writeFileSync(tempHtmlPath, tempHtml);
    await page.goto('file://' + tempHtmlPath, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 500, height: 500 });
    const pngDest = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\Logo.png';
    await page.screenshot({ path: pngDest, omitBackground: true, clip: { x: 0, y: 0, width: 500, height: 500 } });
    console.log('PNG saved to', pngDest);

    fs.unlinkSync(tempHtmlPath);
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
