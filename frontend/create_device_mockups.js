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
    
    const rootDir = 'C:\\Users\\anast\\Desktop\\Anas Portfolio';
    const desktopImg = 'file://' + path.join(rootDir, 'desktop_preview.png').replace(/\\/g, '/');
    const mobileImg = 'file://' + path.join(rootDir, 'mobile_preview.png').replace(/\\/g, '/');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devices.css@0.1.15/dist/devices.min.css">
      <style>
        body {
          margin: 0;
          padding: 100px 50px;
          background: #0B0B0B;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 80px;
          font-family: sans-serif;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .presentation {
          display: flex;
          align-items: flex-start;
          gap: 60px;
          background: #141414;
          padding: 80px;
          border-radius: 30px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .device-content img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Allow scrolling in mockup for realism, but we want full image to be scrollable if needed.
           devices.css sets overflow:hidden on device-content. */
        .device-content {
          background: #fff;
          overflow-y: auto !important;
        }

        /* Custom scrollbar for device screen */
        .device-content::-webkit-scrollbar {
          width: 0px;
        }

        h1 {
          color: #F5F4F1;
          text-align: center;
          font-size: 42px;
          margin-bottom: 60px;
          letter-spacing: 2px;
          font-weight: 600;
          width: 100%;
        }
        
        .layout-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div class="layout-container">
        <h1>ANAS TARAYRA — PORTFOLIO MOCKUPS</h1>
        <div class="presentation">
          <!-- MacBook Pro -->
          <div class="device device-macbook-pro device-spacegray">
            <div class="device-frame">
              <div class="device-content">
                <img src="${desktopImg}" alt="Desktop Preview">
              </div>
            </div>
            <div class="device-stripe"></div>
            <div class="device-header"></div>
            <div class="device-sensors"></div>
            <div class="device-btns"></div>
            <div class="device-power"></div>
          </div>
          
          <!-- iPhone 14 Pro -->
          <div class="device device-iphone-14-pro device-spaceblack">
            <div class="device-frame">
              <div class="device-content">
                <img src="${mobileImg}" alt="Mobile Preview">
              </div>
            </div>
            <div class="device-stripe"></div>
            <div class="device-header"></div>
            <div class="device-sensors"></div>
            <div class="device-btns"></div>
            <div class="device-power"></div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
    
    const tempHtmlPath = path.join(__dirname, 'temp_mockup.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 2 });
    await page.goto('file://' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    
    // Create Mockups directory if it doesn't exist
    const mockupsDir = path.join(rootDir, 'Mockups');
    if (!fs.existsSync(mockupsDir)){
        fs.mkdirSync(mockupsDir);
    }
    
    const pngDest = path.join(mockupsDir, 'Portfolio_Mockups_Presentation.png');
    await page.screenshot({ path: pngDest, fullPage: true });
    console.log('Mockup presentation saved to', pngDest);

    fs.unlinkSync(tempHtmlPath);
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
