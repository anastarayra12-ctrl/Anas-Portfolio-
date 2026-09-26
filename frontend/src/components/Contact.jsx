import { useId, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Loader2, MapPin, Send, CircleCheck, CircleAlert, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { links } from '../content/site';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './ui/Icons';
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

  const channels = [
    { key: 'linkedin', href: links.linkedin, label: 'LinkedIn', value: 'in/anastarayra12', Icon: LinkedInIcon, ext: true },
    { key: 'github', href: links.github, label: 'GitHub', value: '@anastarayra12', Icon: GitHubIcon, ext: true },
    { key: 'whatsapp', href: links.whatsapp, label: 'WhatsApp', value: links.phoneDisplay, Icon: WhatsAppIcon, ext: true },
    { key: 'cv', href: links.cvWeb, label: 'CV', value: c.cvWeb, Icon: FileText, ext: true },
  ];

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead id="contact" index={c.index} kicker={c.kicker} title={c.title} intro={c.intro} />

        <div className="contact__layout">
          <Reveal className="contact__direct">
            <p className="contact__label">{c.emailLabel}</p>
            <div className="contact__email-row">
              <a className="contact__email" href={`mailto:${links.email}`} dir="ltr">
                {links.email}
                <ArrowUpRight className="contact__email-arrow" aria-hidden="true" />
              </a>
              <button type="button" className="icon-btn contact__copy" onClick={copyEmail} aria-label={copied ? c.copied : c.copy} title={c.copy}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? c.copied : ''}
              </span>
            </div>

            <p className="contact__label contact__label--sub">{c.elsewhere}</p>
            <ul className="channels">
              {channels.map(({ key, href, label, value, Icon, ext }) => (
                <li key={key}>
                  <a className="channel" href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>
                    <span className="channel__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="channel__text">
                      <span className="channel__label">{label}</span>
                      <span className="channel__value" dir="auto">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight size={16} className="channel__arrow" aria-hidden="true" />
                    {ext && <span className="sr-only">{t.a11y.newTab}</span>}
                  </a>
                </li>
              ))}
            </ul>

            <p className="contact__location">
              <MapPin size={14} aria-hidden="true" />
              {c.location}
            </p>
          </Reveal>

          <Reveal className="contact__form-wrap" delay={0.1}>
            <ContactForm f={c.form} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
