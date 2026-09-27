import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Copy, Download, FileText, Loader2, Mail, Send, CircleCheck, CircleAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { links } from '../content/site';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './ui/Icons';
import { BrandMark } from './ui/BrandMark';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const validate = (v, errors) => {
  const out = {};
  if (!v.name.trim()) out.name = errors.name;
  if (!EMAIL_RE.test(v.email.trim())) out.email = errors.email;
  if (v.message.trim().length < 10) out.message = errors.message;
  return out;
};

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`${id}-error`}
            className="field__error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CircleAlert size={14} aria-hidden="true" />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm({ f }) {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  const errors = validate(values, f.errors);
  const showError = (k) => (touched[k] || submitted) && errors[k];
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((s) => ({ ...s, [e.target.name]: true }));
  const describe = (k) => (showError(k) ? `${uid}-${k}-error` : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      const first = ['name', 'email', 'message'].find((k) => errors[k]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = `Portfolio message from ${values.name.trim()}`;

    // No form service configured: hand off to the visitor's email app — never fake a success.
    if (!ACCESS_KEY) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
      window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const botcheck = formRef.current?.querySelector('[name="botcheck"]')?.checked ?? false;
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
      setTouched({});
      setSubmitted(false);
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' || status === 'mailto' ? (
        <m.div
          key="done"
          className="contact__done"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CircleCheck size={28} className="contact__done-icon" aria-hidden="true" />
          <p role="status">
            {status === 'sent' ? (
              f.success
            ) : (
              <>
                {f.mailtoOpened}{' '}
                <a className="link" href={`mailto:${links.email}`}>
                  {links.email}
                </a>
                .
              </>
            )}
          </p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => setStatus('idle')}>
            {f.another}
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          className="contact__form"
          noValidate
          onSubmit={onSubmit}
          aria-labelledby={`${uid}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="contact__form-title" id={`${uid}-title`}>
            {f.title}
          </h3>
          <div className="contact__row">
            <Field id={`${uid}-name`} label={f.name} error={showError('name')}>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={f.namePh}
                value={values.name}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(showError('name'))}
                aria-describedby={describe('name')}
                required
              />
            </Field>
            <Field id={`${uid}-email`} label={f.email} error={showError('email')}>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                placeholder={f.emailPh}
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(showError('email'))}
                aria-describedby={describe('email')}
                required
              />
            </Field>
          </div>
          <Field id={`${uid}-message`} label={f.message} error={showError('message')}>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={5}
              placeholder={f.messagePh}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(showError('message'))}
              aria-describedby={describe('message')}
              required
            />
          </Field>

          {/* Spam honeypot for Web3Forms */}
          <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} aria-hidden="true" />

          {status === 'error' && (
            <p className="contact__alert" role="alert">
              <CircleAlert size={16} aria-hidden="true" />
              <span>
                {f.failure}{' '}
                <a className="link" href={`mailto:${links.email}`}>
                  {links.email}
                </a>
                .
              </span>
            </p>
          )}

          <div className="contact__submit">
            <button type="submit" className="btn btn--primary" disabled={sending} aria-busy={sending}>
              {sending ? (
                <>
                  <Loader2 size={16} className="spin" aria-hidden="true" />
                  {f.sending}
                </>
              ) : (
                <>
                  {f.send}
                  <Send size={16} className="btn__arrow" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

function AmmanClock({ label }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Amman' }).format(now);
  return (
    <div className="ctile ctile--time">
      <span className="ctile__icon" aria-hidden="true">
        <Clock size={20} strokeWidth={1.75} />
      </span>
      <span className="ctile__label">{label}</span>
      <span className="ctile__time" dir="ltr">
        {time}
        <small>UTC+3</small>
      </span>
    </div>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  const socials = [
    { key: 'linkedin', href: links.linkedin, label: 'LinkedIn', value: 'in/anastarayra12', Icon: LinkedInIcon },
    { key: 'github', href: links.github, label: 'GitHub', value: '@anastarayra12-ctrl', Icon: GitHubIcon },
  ];

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead id="contact" index={c.index} kicker={c.kicker} title={c.title} intro={c.intro} />

        <Reveal className="cbento">
          {/* Main tile: email */}
          <div className="ctile ctile--main">
            <span className="ctile__mark" aria-hidden="true">
              <BrandMark size={220} />
            </span>
            <span className="ctile__status">
              <i aria-hidden="true" /> {t.hero.status}
            </span>
            <p className="ctile__eyebrow">{c.emailLabel}</p>
            <div className="ctile__email-row">
              <a className="ctile__email" href={`mailto:${links.email}`} dir="ltr">
                {links.email}
              </a>
              <button type="button" className="ctile__copy" onClick={copyEmail} aria-label={copied ? c.copied : c.copy} title={c.copy}>
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? c.copied : ''}
              </span>
            </div>
            <div className="ctile__actions">
              <a className="btn btn--primary ctile__btn" href={`mailto:${links.email}`}>
                <Mail size={16} aria-hidden="true" />
                {c.mailBtn}
              </a>
              <a className="btn ctile__btn ctile__btn--wa" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                {c.whatsappBtn}
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </div>
          </div>

          {/* Social tiles */}
          {socials.map(({ key, href, label, value, Icon }) => (
            <a key={key} className={`ctile ctile--link ctile--${key}`} href={href} target="_blank" rel="noopener noreferrer">
              <span className="ctile__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <ArrowUpRight size={18} className="ctile__arrow" aria-hidden="true" />
              <span className="ctile__label">{label}</span>
              <span className="ctile__value" dir="ltr">
                {value}
              </span>
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
          ))}

          {/* CV tile */}
          <div className="ctile ctile--cv">
            <span className="ctile__icon" aria-hidden="true">
              <FileText size={20} strokeWidth={1.75} />
            </span>
            <span className="ctile__label">{c.cvTitle}</span>
            <span className="ctile__cv-links">
              <a className="ctile__cv-link" href={links.cvPdf} download={links.cvFileName}>
                <Download size={14} aria-hidden="true" /> {c.cvPdf}
              </a>
              <a className="ctile__cv-link" href={links.cvWeb} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={14} aria-hidden="true" /> {c.cvWebShort}
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </span>
          </div>

          <AmmanClock label={c.timeLabel} />

          {/* Form tile */}
          <div className="ctile ctile--form">
            <div className="ctile__form-intro">
              <span className="ctile__icon" aria-hidden="true">
                <Send size={20} strokeWidth={1.75} />
              </span>
              <p className="ctile__form-text">{c.formText}</p>
            </div>
            <ContactForm f={c.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
