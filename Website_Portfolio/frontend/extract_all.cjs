const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\frontend\\brand_guide_5.html';
const outDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\الهوية البصرية\\الأصول_المستخرجة';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Regex to find all base64 images (png, jpeg, jpg, webp, svg)
const regex = /data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;
let match;
let count = 0;

while ((match = regex.exec(html)) !== null) {
  count++;
  const ext = match[1] === 'svg+xml' ? 'svg' : match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');
  const filePath = path.join(outDir, `Asset_${count}.${ext}`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved ${filePath}`);
}

// Regex to find raw SVGs
const svgRegex = /<svg[\s\S]*?<\/svg>/g;
let svgCount = 0;
while ((match = svgRegex.exec(html)) !== null) {
  svgCount++;
  const svgContent = match[0];
  const filePath = path.join(outDir, `Asset_Raw_${svgCount}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Saved ${filePath}`);
}

console.log(`Extraction complete. Found ${count} base64 images and ${svgCount} raw SVGs.`);
