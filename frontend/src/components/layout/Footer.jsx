import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { links } from '../../content';
import { BrandMark } from '../brand/BrandMark';
import './Footer.css';

/** Minimal footer: the signature, the copyright line, one way to reach me, back to top. */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__brand" aria-label={t.a11y.home}>
          <BrandMark size={26} />
          <span className="footer__name">{t.header.name}</span>
        </a>
        <p className="footer__tagline">{t.footer.tagline}</p>
        <div className="footer__meta">
          <p className="footer__copy">
            © {year} {t.header.name}. {t.footer.rights}
          </p>
          <a className="link footer__mail" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="footer__top" href="#top" aria-label={t.a11y.backToTop} title={t.a11y.backToTop}>
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
