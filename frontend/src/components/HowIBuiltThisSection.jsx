import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Code2, Layers, Cpu, Sparkles, ChevronDown, ChevronUp, Terminal, ShieldCheck, Paintbrush } from 'lucide-react';

export const HowIBuiltThisSection = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          className="glass-card"
          style={{
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Header & Toggle Button */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              userSelect: 'none',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                <Code2 size={16} />
                <span>{lang === 'ar' ? 'كيف بنيت هذا الموقع؟' : 'How I Built This Site (Case Study)'}</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, margin: 0 }}>
                {lang === 'ar' ? 'الموقع نفسه كدليل على جودة العمل (Proof of Work)' : 'The Portfolio Itself as Proof-of-Work'}
              </h3>
            </div>

            <button
              className="btn-outline"
              style={{
                height: '42px',
                padding: '0 18px',
                fontSize: '0.86rem',
                gap: '8px',
                borderRadius: '30px',
                pointerEvents: 'none',
              }}
            >
              <span>{isOpen ? (lang === 'ar' ? 'إغلاق التاصيل' : 'Hide Architecture') : (lang === 'ar' ? 'عرض تفاصيل المعمارية' : 'Explore Architecture')}</span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Expandable Architecture Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  {/* Card 1: Stack Decisions */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '10px' }}>
                      <Cpu size={18} />
                      <span>{lang === 'ar' ? 'تقنيات الـ Frontend' : 'Core Frontend Stack'}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {lang === 'ar'
                        ? 'تم استخدام React 19 مع Vite 6 لتوفير سرعة بناء خاطفة وتحديث فوري (HMR)، مع Framer Motion للتنقلات الزجاجية السلسة.'
                        : 'Built with React 19 + Vite 6 for instant HMR. Framer Motion handles GPU-accelerated glassmorphism animations.'}
                    </p>
                  </div>

                  {/* Card 2: Design System */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 700, marginBottom: '10px' }}>
                      <Paintbrush size={18} />
                      <span>{lang === 'ar' ? 'نظام التصميم والألوان' : 'Design System & Tokens'}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {lang === 'ar'
                        ? 'متغيرات CSS مخصصة بالكامل (:root) تدعم الأوضاع الليلية والنهارية ووضع OLED الأسود الحقيقي، مع مراعاة WCAG AA.'
                        : 'Pure CSS custom properties (:root) supporting Dark, Light, and True OLED Black modes with WCAG AA compliance.'}
                    </p>
                  </div>

                  {/* Card 3: Performance */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '10px' }}>
                      <ShieldCheck size={18} />
                      <span>{lang === 'ar' ? 'الأداء والوصول (Performance)' : 'Performance & Accessibility'}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {lang === 'ar'
                        ? 'تقسيم الكود (Code Splitting)، التحميل الكسول للمكونات الثقيلة، ودعم الكيبورد وإيقاف الأنيميشن لضعاف الحركة.'
                        : 'Lazy loading for heavy components, zero unneeded bundles, full keyboard accessibility & reduced-motion support.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
