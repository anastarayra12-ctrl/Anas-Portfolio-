const fs = require('fs');
const path = require('path');

const outDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\الهوية البصرية';

// 1. Logo with Text SVG
const logoSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background can be added if needed, kept transparent here -->
  <g transform="translate(190, 200) scale(2.2)">
    <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="#3B82F6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <polygon points="50,50 57,58 50,66 43,58" fill="#38BDF8" />
    <circle cx="50" cy="14" r="3.5" fill="#38BDF8" />
    <circle cx="18" cy="84" r="3.5" fill="#3B82F6" />
    <circle cx="82" cy="84" r="3.5" fill="#2563EB" />
  </g>
  <text x="300" y="520" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="42" fill="#09090B" text-anchor="middle" letter-spacing="2">ANAS TARAYRA</text>
  <text x="300" y="560" font-family="Space Grotesk, Arial, sans-serif" font-weight="500" font-size="18" fill="#185FA5" text-anchor="middle" letter-spacing="2">UI/UX &amp; ENGINEERING</text>
</svg>`;

fs.writeFileSync(path.join(outDir, 'Logo_With_Text_Editable.svg'), logoSvg);

// 2. Logo with Text (Dark BG) SVG
const logoDarkSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="800" fill="#09090B" />
  <g transform="translate(190, 200) scale(2.2)">
    <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="#3B82F6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <polygon points="50,50 57,58 50,66 43,58" fill="#38BDF8" />
    <circle cx="50" cy="14" r="3.5" fill="#38BDF8" />
    <circle cx="18" cy="84" r="3.5" fill="#3B82F6" />
    <circle cx="82" cy="84" r="3.5" fill="#2563EB" />
  </g>
  <text x="300" y="520" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="42" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">ANAS TARAYRA</text>
  <text x="300" y="560" font-family="Space Grotesk, Arial, sans-serif" font-weight="500" font-size="18" fill="#38BDF8" text-anchor="middle" letter-spacing="2">UI/UX &amp; ENGINEERING</text>
</svg>`;

fs.writeFileSync(path.join(outDir, 'Logo_With_Text_Dark_Editable.svg'), logoDarkSvg);

console.log('SVG files generated.');
