import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BrandMark } from './ui/BrandMark';
import './Footer.css';

/** Slim sign-off. Contact is the closing section; navigation lives in the dock. */
export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__sign">
          <BrandMark size={22} />
          <span>
            {f.signoff} <span className="footer__built">{f.built}</span>
          </span>
        </p>
        <div className="footer__end">
          <p className="footer__copy">
            © {new Date().getFullYear()} {t.header.name}. {f.rights}
          </p>
          <a href="#top" className="icon-btn footer__top" aria-label={t.a11y.backToTop} title={t.a11y.backToTop}>
            <ArrowUp size={17} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}
