import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Convert Windows path to file URI properly
    const htmlPath = 'file:///' + 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\frontend\\brand_guide.html'.replace(/\\/g, '/');
    
    console.log('Loading HTML file:', htmlPath);
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    
    const pdfDest = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\Anas_AlTarayrah_Brand_Guidelines.pdf';
    
    console.log('Generating PDF...');
    await page.pdf({ 
      path: pdfDest, 
      format: 'A4', 
      printBackground: true 
    });
    
    console.log('PDF saved successfully to:', pdfDest);
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
})();
