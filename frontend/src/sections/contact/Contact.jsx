import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { links } from '../../content';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/ui/Reveal';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '../../components/ui/Icons';
import './Contact.css';

/** Local time in Amman, refreshed every 30 s. */
function useAmmanTime(lang) {
  const format = () =>
    new Intl.DateTimeFormat(lang === 'ar' ? 'ar-JO' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Amman' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return time;
}

/**
 * "Let's Build Something" — every contact channel from the CV, each one a real
 * link (mailto:, tel:, WhatsApp, LinkedIn, GitHub, the CV file). No form.
 */
export function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const time = useAmmanTime(lang);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  const channels = [
    { key: 'phone', href: `tel:${links.phone}`, value: links.phoneDisplay, Icon: Phone, ltr: true },
    { key: 'whatsapp', href: links.whatsapp, value: links.phoneDisplay, Icon: WhatsAppIcon, external: true, ltr: true },
    { key: 'linkedin', href: links.linkedin, value: links.linkedinHandle, Icon: LinkedInIcon, external: true, ltr: true },
    { key: 'github', href: links.github, value: links.githubHandle, Icon: GitHubIcon, external: true, ltr: true },
    { key: 'cv', href: links.cvPdf, download: links.cvFileName, value: c.channels.cv.value, Icon: Download },
  ];

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead id="contact" index={c.index} kicker={c.kicker} title={c.title} intro={c.intro} />

        <div className="contact__grid">
          <Reveal className="mailcard">
            <p className="mailcard__status">
              <span className="status-dot" aria-hidden="true" />
              {c.status}
            </p>
            <p className="mailcard__label">{c.emailLabel}</p>
            <a className="mailcard__email" href={`mailto:${links.email}`} dir="ltr">
              {links.email}
            </a>
            <div className="mailcard__actions">
              <a className="btn btn--primary mailcard__send" href={`mailto:${links.email}`}>
                <Mail size={16} aria-hidden="true" />
                {c.emailLabel}
              </a>
              <button type="button" className="mailcard__copy" onClick={copy} aria-live="polite">
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copied ? c.copied : c.copy}
              </button>
            </div>
            <div className="mailcard__foot">
              <span>
                <MapPin size={14} aria-hidden="true" />
                {c.location}
              </span>
              <span>
                {c.timeLabel} <b dir="ltr">{time}</b>
              </span>
            </div>
            <span className="mailcard__mark" aria-hidden="true" />
          </Reveal>

          <ul className="channels">
            {channels.map(({ key, href, value, Icon, external, download, ltr }, i) => (
              <Reveal as="li" key={key} delay={0.04 * i} className={`channel channel--${key}`}>
                <a
                  className="channel__link"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  {...(download ? { download } : {})}
                >
                  <span className="channel__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="channel__text">
                    <span className="channel__label">{c.channels[key].label}</span>
                    <span className="channel__value" dir={ltr ? 'ltr' : undefined}>
                      {value}
                    </span>
                  </span>
                  <span className="channel__action">
                    {c.channels[key].action}
                    {download ? <Download size={15} aria-hidden="true" /> : <ArrowUpRight size={15} className="btn__ext" aria-hidden="true" />}
                  </span>
                  {external && <span className="sr-only">{t.a11y.newTab}</span>}
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
