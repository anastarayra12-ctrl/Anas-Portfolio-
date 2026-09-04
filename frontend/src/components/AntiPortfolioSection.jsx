import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const AntiPortfolioSection = () => {
  const { lang } = useLanguage();

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
            padding: '36px',
            borderRadius: '24px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            position: 'relative',
          }}
        >
          {/* Badge & Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '30px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              <AlertTriangle size={16} />
              <span>{lang === 'ar' ? 'الشفافية والدروس المستفادة' : 'The Anti-Portfolio · Transparency'}</span>
            </div>

            <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px 0' }}>
              {lang === 'ar' ? 'ما الذي لم ينجح؟ والدرس المستفاد' : 'A Real Mistake & What I Learned From It'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
              {lang === 'ar'
                ? 'الخبرة الحقيقية لا تأتي فقط من النجاحات، بل من القرارات الخاطئة التي تم تحليلها وتصحيحها.'
                : 'True engineering growth comes from analyzing past wrong decisions and evolving from them.'}
            </p>
          </div>

          {/* 3 Step Breakdown Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {/* Step 1: What Happened */}
            <div
              style={{
                padding: '24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderTop: '3px solid #F59E0B',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#F59E0B', uppercase: true, letterSpacing: '0.05em', marginBottom: '8px' }}>
                {lang === 'ar' ? '1. ما الذي حدث؟' : '1. What Happened?'}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'التعقيد المبكر في معمارية الحالات' : 'Over-Engineering State Management'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {lang === 'ar'
                  ? 'في أحد المشاريع الأولى، قمت بنقل جميع حالات الواجهة إلى متجر عام (Global Store) معقد، مما أبطأ التطوير.'
                  : 'In an early project, I routed all UI state into a complex global store, causing unnecessary friction.'}
              </p>
            </div>

            {/* Step 2: What Went Wrong */}
            <div
              style={{
                padding: '24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderTop: '3px solid #EF4444',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#EF4444', uppercase: true, letterSpacing: '0.05em', marginBottom: '8px' }}>
                {lang === 'ar' ? '2. الخلل والتأثير' : '2. What Went Wrong?'}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'بطء في التعديل وحجم كود زائد' : 'Boilerplate Overhead & Slower Cycles'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {lang === 'ar'
                  ? 'أي تغيير بسيط في الواجهة تطلب تعديل 4 ملفات مختلفة، مما زاد صعوبة الصيانة وبطء التحديثات.'
                  : 'A simple UI toggle required touching 4 files, creating refactoring friction and maintenance debt.'}
              </p>
            </div>

            {/* Step 3: What I Learned */}
            <div
              style={{
                padding: '24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderTop: '3px solid var(--accent-green)',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-green)', uppercase: true, letterSpacing: '0.05em', marginBottom: '8px' }}>
                {lang === 'ar' ? '3. النتيجة والنهج الحالي' : '3. What I Learned'}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'مبدأ البساطة والمكونات المستقلة' : 'Local State First & Pragmatic Architecture'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {lang === 'ar'
                  ? 'الآن أتبع مبدأ (Local-First): ابدأ بحالة المكون المحلية، واستخدم المتجر العام فقط للحالات المشتركة فعلية.'
                  : 'Now I follow Local-State First: keep state within components, reserve global stores strictly for cross-cutting data.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
