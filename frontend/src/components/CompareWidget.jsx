import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, XCircle, Sparkles, Zap, ShieldCheck, Palette, Code2, MessageSquare } from 'lucide-react';

export const CompareWidget = () => {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  const rows = [
    {
      feature: lang === 'ar' ? 'سرعة الإنجاز والتطوير' : 'Development Speed',
      traditional: lang === 'ar' ? 'تطوير يدوي بطيء وحلقات مراجعة طويلة' : 'Standard manual dev speed & long cycles',
      anas: lang === 'ar' ? 'أسرع بمرتين مع Vibe Coding هندسة أوامر Claude' : '2x Faster with AI Vibe Coding & Claude Prompting',
      icon: Zap,
    },
    {
      feature: lang === 'ar' ? 'التصميم وتجربة المستخدم' : 'UI/UX Integration',
      traditional: lang === 'ar' ? 'فجوة وتعارض دائم بين المصمم والمبرمج' : 'Handoff gaps between designer & developer',
      anas: lang === 'ar' ? 'هجين كامل: تصميم Figma بيكسل بيكسل → كود ممتاز' : 'Hybrid designer-developer: Figma to clean code',
      icon: Palette,
    },
    {
      feature: lang === 'ar' ? 'بنية التقنيات والمعمارية' : 'Architecture & Tech Stack',
      traditional: lang === 'ar' ? 'اعتماد على مكتبات قديمة أو تقنية واحدة فقط' : 'Legacy patterns or single stack focus',
      anas: lang === 'ar' ? '.NET 9 Web API مع Angular 17+ & React 19' : 'Modern .NET 9 Web API + Angular 17+ & React 19',
      icon: Code2,
    },
    {
      feature: lang === 'ar' ? 'الجودة والمعايير البصرية' : 'Visual & Code Quality',
      traditional: lang === 'ar' ? 'تصاميم قوالب عادية تفتقر للمظهر الفاخر' : 'Generic templates lacking premium feel',
      anas: lang === 'ar' ? 'واجهات زجاجية عصرية Glassmorphism + معايير WCAG' : 'State-of-the-art Glassmorphism & WCAG AA standards',
      icon: ShieldCheck,
    },
    {
      feature: lang === 'ar' ? 'التواصل والمتابعة' : 'Communication & Reliability',
      traditional: lang === 'ar' ? 'ردود متأخرة وعدم وضوح في المواعيد' : 'Delayed responses & unclear status updates',
      anas: lang === 'ar' ? 'تواصل مبادر وواضح بتوقيت عمان (+03:00)' : 'Proactive, transparent communication (Amman UTC+3)',
      icon: MessageSquare,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: '40px',
        marginBottom: '20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '36px',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          backgroundColor: 'var(--card-bg)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              color: 'var(--accent-blue)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'مقارنة القيمة' : 'Why Work With Anas?'}</span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 8px 0' }}>
            {lang === 'ar' ? 'ما الذي يميز أسلوب عملي؟' : 'The Value Difference'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, maxWidth: '600px', marginInline: 'auto' }}>
            {lang === 'ar'
              ? 'مقارنة شفافة بين أسلوب التطوير التقليدي وبين بيئة العمل الحديثة المدعومة بالذكاء الاصطناعي.'
              : 'A transparent comparison between conventional dev workflows and my AI-augmented full-stack process.'}
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {rows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(140px, 1.2fr) 1fr 1.2fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'background 200ms ease',
                }}
              >
                {/* Feature Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(59, 130, 246, 0.12)',
                      color: 'var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <span>{row.feature}</span>
                </div>

                {/* Traditional Dev */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  <XCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <span>{row.traditional}</span>
                </div>

                {/* Anas */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                  <span>{row.anas}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
