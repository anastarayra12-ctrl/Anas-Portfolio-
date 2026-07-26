const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\frontend\\brand_guide_new.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const getLogoHtml = (variant) => {
  let symbolColor1 = '#3B82F6';
  let symbolColor2 = '#38BDF8';
  let symbolColor3 = '#2563EB';
  let textColor = '#09090B';
  let subTextColor = '#185FA5';

  if (variant === 'dark') {
    textColor = 'white';
    subTextColor = '#38BDF8';
  } else if (variant === 'black') {
    symbolColor1 = '#09090B';
    symbolColor2 = '#09090B';
    symbolColor3 = '#09090B';
    textColor = '#09090B';
    subTextColor = '#09090B';
  } else if (variant === 'white') {
    symbolColor1 = 'white';
    symbolColor2 = 'white';
    symbolColor3 = 'white';
    textColor = 'white';
    subTextColor = 'white';
  }

  return `
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: scale(0.6); transform-origin: center; background: transparent;">
  <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48" stroke="${symbolColor1}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <polygon points="50,50 57,58 50,66 43,58" fill="${symbolColor2}" />
    <circle cx="50" cy="14" r="3.5" fill="${symbolColor2}" />
    <circle cx="18" cy="84" r="3.5" fill="${symbolColor1}" />
    <circle cx="82" cy="84" r="3.5" fill="${symbolColor3}" />
  </svg>
</div>`;
};

// We will use a counter or look at surrounding context to know which logo to insert.
// A simpler way: just split the file by `<img src="data:image/png;base64,` and manually reconstruct it.
const imgRegex = /<img src="data:image\/png;base64,[^"]+"[^>]*>/g;

// Cover page logo (Index 0) -> Dark Logo (usually cover is dark, or light, let's use light by default unless we know)
// Wait, Cover Page in this file has class "page cover". In previous file, cover was dark.
// Let's just use Light Logo everywhere except where class "dark" is used.
let matchCount = 0;
html = html.replace(imgRegex, (match, offset, str) => {
  matchCount++;
  // Determine variant based on surrounding HTML
  const preContext = str.substring(Math.max(0, offset - 100), offset);
  
  if (preContext.includes('card dark') || preContext.includes('خلفية غامقة')) {
    if (preContext.includes('أبيض')) {
      return getLogoHtml('white');
    }
    return getLogoHtml('dark');
  } else if (preContext.includes('أسود') || preContext.includes('أحادية اللون — أسود')) {
    return getLogoHtml('black');
  } else if (matchCount === 2 || matchCount === 1) {
     // Page 1 (Cover) & Page 2 (Logo Story)
     // The cover might be light. We'll use Light.
     return getLogoHtml('light');
  } else {
    // Default to light
    return getLogoHtml('light');
  }
});

fs.writeFileSync(htmlPath, html);
console.log('Replaced ' + matchCount + ' images with SVG logos.');
