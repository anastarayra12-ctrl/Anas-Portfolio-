import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Mail, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const NewsletterSection = () => {
  const { lang } = useLanguage();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast(lang === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      addToast(lang === 'ar' ? 'تم الاشتراك بنجاح! شكراً لك' : 'Successfully subscribed! Thank you', 'success');
    }, 800);
  };

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          className="glass-card"
          style={{
            padding: '40px 32px',
            textAlign: 'center',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'النشرة البرمجية والتجارب' : 'Dev & AI Insights'}</span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: '10px' }}>
            {lang === 'ar' ? 'تابع أحدث مشاريعي وتجاربي مع AI' : 'Follow My Latest Projects & AI Experiments'}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '580px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            {lang === 'ar'
              ? 'احصل على تحديثات قصيرة وعالية القيمة في .NET 9 وتقنيات Vibe Coding وتصميم الواجهات. لا إعلانات ولا رسائل مزعجة.'
              : 'Get short, high-value updates on .NET 9, Vibe Coding workflows, and UI/UX design. Zero spam, unsubscribe anytime.'}
          </p>

          {submitted ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-green)', fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{lang === 'ar' ? 'تم الاشتراك بنجاح! يسعدني انضمامك.' : 'Subscribed successfully! Glad to have you.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني...' : 'Enter your email address...'}
                  style={{
                    width: '100%',
                    height: '48px',
                    paddingLeft: '44px',
                    paddingRight: '16px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 200ms ease',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ height: '48px', minWidth: '130px' }}
              >
                <span>{loading ? (lang === 'ar' ? 'جاري...' : 'Submitting...') : (lang === 'ar' ? 'اشترك الآن' : 'Subscribe')}</span>
                <Send size={16} />
              </button>
            </form>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            <ShieldCheck size={14} />
            <span>{lang === 'ar' ? 'خصوصيتك محفوطة 100%. يمكنك إلغاء الاشتراك في أي وقت.' : '100% privacy assurance. Unsubscribe at any time.'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
