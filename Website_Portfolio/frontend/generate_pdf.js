import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    const htmlPath = 'file:///C:/Users/anast/Downloads/Anas-Tarayra-Brand-Guide_2.html';
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    
    const pdfDest = 'C:\\Users\\anast\\Desktop\\Anas Portfolio\\Anas-Tarayra-Brand-Guide_2.pdf';
    
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
