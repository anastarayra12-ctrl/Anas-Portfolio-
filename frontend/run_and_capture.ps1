$viteProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -NoNewWindow
Start-Sleep -Seconds 5
node capture_instagram_splash.js
Stop-Process -Id $viteProcess.Id -Force
