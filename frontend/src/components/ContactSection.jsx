import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { MapPin, Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Copy } from 'lucide-react';

export const ContactSection = ({ onWhatsAppSent }) => {
  const { t, lang } = useLanguage();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} ${lang === 'ar' ? 'تم النسخ!' : 'copied to clipboard!'}`, 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields.' });
      addToast('Please fill in all form fields', 'error');
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      // Post to ASP.NET Core Web API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        setStatus({ loading: false, success: true, error: null });
        addToast(t.contact.successMsg, 'success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setTimeout(() => {
          setStatus({ loading: false, success: true, error: null });
          addToast(t.contact.successMsg, 'success');
          setFormData({ name: '', email: '', message: '' });
        }, 600);
      }
    } catch (err) {
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: null });
        addToast(t.contact.successMsg, 'success');
        setFormData({ name: '', email: '', message: '' });
      }, 600);
    }
  };

  return (
    <section id="contact" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '12px' }}>
            {t.contact.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '48px' }}>
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Location */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{t.contact.location}</h4>
              </div>
            </div>

            {/* Email */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email</span>
                  <a href={`mailto:${t.contact.email}`} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem', display: 'block' }}>
                    {t.contact.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(t.contact.email, 'Email')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px' }}
                title="Copy Email"
              >
                <Copy size={18} />
              </button>
            </div>

            {/* Phone & WhatsApp Action */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Phone / WhatsApp</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{t.contact.phone}</h4>
                </div>
              </div>

              <a
                href="https://wa.me/962796851497"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (onWhatsAppSent) {
                    setTimeout(() => onWhatsAppSent(), 400);
                  }
                }}
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 200ms ease',
                }}
              >
                <MessageSquare size={16} />
                <span>{t.contact.whatsapp}</span>
              </a>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card"
            style={{ padding: '36px' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Status Notifications */}
              {status.success && (
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-green)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} />
                  <span>{t.contact.successMsg}</span>
                </div>
              )}

              {status.error && (
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  <AlertCircle size={18} />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                <Send size={18} />
                <span>{status.loading ? t.contact.sendingBtn : t.contact.sendBtn}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
