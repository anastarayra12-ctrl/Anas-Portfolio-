// Maintenance Mode Configuration
// Set `enabled: true` to show the 3D Maintenance / Under Construction screen to visitors.
// Set `enabled: false` to display the full live portfolio.

export const maintenanceConfig = {
  enabled: true, // Toggle maintenance mode ON (true) or OFF (false)
  progressPercent: 88, // Live estimated progress percentage
  estimatedCompletion: {
    ar: 'التحديث الجاري لعام 2026',
    en: '2026 Major Upgrade in Progress',
  },
  title: {
    ar: 'الموقع متوقف مؤقتاً للتحديث والتطوير 🚀',
    en: 'Site Temporarily Paused for Upgrades 🚀',
  },
  subtitle: {
    ar: 'نعمل حالياً على بناء وتطوير تجربة رقمية استثنائية، وإضافة أحدث المشاريع والحلول التقنية بلمسات 3D عصرية! سنعود قريباً جداً.',
    en: 'We are crafting an extraordinary next-gen digital experience, adding fresh projects & interactive 3D features. We will be back shortly!',
  },
  contact: {
    whatsapp: 'https://wa.me/962796851497',
    email: 'anastarayra12@gmail.com',
    linkedin: 'https://linkedin.com/in/anas-al-tarayra',
    github: 'https://github.com/anastarayra12',
  },
  allowBypassQuery: true, // Allows appending `?preview=true` to URL or shortcut Ctrl+Shift+M to view the live site
};

export default maintenanceConfig;
