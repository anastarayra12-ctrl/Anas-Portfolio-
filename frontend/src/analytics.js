/**
 * Privacy-friendly analytics: Vercel Web Analytics (cookieless, no personal
 * data, so no consent banner). Loaded without the npm package — it is only a
 * queue stub plus Vercel's own collector script.
 *
 * Off unless the deployment sets VITE_ANALYTICS=vercel: the collector script
 * 404s until Analytics is enabled for the project in the Vercel dashboard.
 * Page views work on every plan; custom events are only stored on plans that
 * include them (elsewhere they are dropped silently).
 *
 * Tracked: page views, project_open, contact_submit, cv_download and
 * outbound clicks (LinkedIn, GitHub, WhatsApp, email).
 */
const enabled = import.meta.env.PROD && import.meta.env.VITE_ANALYTICS === 'vercel';

export function track(name, data) {
  if (enabled) window.va?.('event', { name, data });
}

/** One delegated listener instead of an onClick on every link. */
const classify = (href) => {
  if (/\.pdf($|\?)/i.test(href)) return ['cv_download'];
  if (href.startsWith('mailto:')) return ['outbound', { to: 'email' }];
  if (href.includes('linkedin.com')) return ['outbound', { to: 'linkedin' }];
  if (href.includes('github.com')) return ['outbound', { to: 'github' }];
  if (href.includes('wa.me')) return ['outbound', { to: 'whatsapp' }];
  return null;
};

export function initAnalytics() {
  if (!enabled) return;
  window.va = window.va || ((...args) => (window.vaq = window.vaq || []).push(args));
  const s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);

  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    const hit = a && classify(a.getAttribute('href'));
    if (hit) track(...hit);
  });
}
