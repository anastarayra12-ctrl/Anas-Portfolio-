import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

(async () => {
  const htmlPath = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\frontend\\brand_guide_5.html';
  const outDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\الهوية البصرية';
  const outPath = path.join(outDir, 'Anas-Tarayra-Brand-Guide.pdf');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set file URL
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('Navigating to', fileUrl);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Generate PDF
  console.log('Generating PDF...');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  console.log(`Saved PDF to ${outPath}`);
  await browser.close();
})();
