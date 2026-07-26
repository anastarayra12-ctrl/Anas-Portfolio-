import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const getSvg = (variant) => {
  let symbolColor1 = '#3B82F6';
  let symbolColor2 = '#38BDF8';
  let symbolColor3 = '#2563EB';

  if (variant === 'black') {
    symbolColor1 = '#09090B';
    symbolColor2 = '#09090B';
    symbolColor3 = '#09090B';
  } else if (variant === 'white') {
    symbolColor1 = '#FFFFFF';
    symbolColor2 = '#FFFFFF';
    symbolColor3 = '#FFFFFF';
  }

  return `
  <div style="display: flex; align-items: center; justify-content: center; width: 1080px; height: 1080px; background: transparent;">
    <svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="${symbolColor1}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <polygon points="50,50 57,58 50,66 43,58" fill="${symbolColor2}" />
      <circle cx="50" cy="14" r="3.5" fill="${symbolColor2}" />
      <circle cx="18" cy="84" r="3.5" fill="${symbolColor1}" />
      <circle cx="82" cy="84" r="3.5" fill="${symbolColor3}" />
    </svg>
  </div>
  `;
};

const variants = [
  { name: 'Colored', variant: 'colored' },
  { name: 'Black', variant: 'black' },
  { name: 'White', variant: 'white' }
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const outDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\الهوية البصرية';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const v of variants) {
    const html = `<!DOCTYPE html>
<html>
<head><style>body { margin: 0; padding: 0; background: transparent; }</style></head>
<body>${getSvg(v.variant)}</body>
</html>`;

    const tempHtmlPath = path.resolve('temp_logo_' + v.name + '.html');
    fs.writeFileSync(tempHtmlPath, html);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
    
    const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    const outPath = path.join(outDir, 'Logo_Symbol_' + v.name + '_Transparent.png');
    await page.screenshot({ path: outPath, omitBackground: true });
    
    await page.close();
    fs.unlinkSync(tempHtmlPath);
    console.log('Saved ' + v.name + ' Logo PNG to: ', outPath);
  }

  await browser.close();
})();
