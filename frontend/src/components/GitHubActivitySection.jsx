import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GitBranch, GitCommit, Star, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const GitHubActivitySection = () => {
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';

  // Generate 52 weeks x 7 days contribution activity grid mockup
  const contributionWeeks = Array.from({ length: 36 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const randomValue = Math.random();
      let level = 0;
      if (randomValue > 0.75) level = 3;
      else if (randomValue > 0.5) level = 2;
      else if (randomValue > 0.3) level = 1;
      return level;
    });
  });

  const getCellColor = (level) => {
    switch (level) {
      case 3: return '#22C55E';
      case 2: return 'rgba(34, 197, 94, 0.65)';
      case 1: return 'rgba(34, 197, 94, 0.35)';
      default: return 'rgba(255, 255, 255, 0.06)';
    }
  };

  const githubStats = [
    { label: isRTL ? 'إجمالي المساهمات' : 'Total Contributions', value: '520+', icon: GitCommit, color: '#22C55E' },
    { label: isRTL ? 'المستودعات البرمجية' : 'Repositories', value: '12+', icon: GitBranch, color: '#3B82F6' },
    { label: isRTL ? 'تقييمات الكود' : 'Code Quality Score', value: '98%', icon: Star, color: '#F59E0B' },
  ];

  return (
    <section id="github" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '80px', paddingBottom: '90px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <GithubIcon size={16} />
            <span>{isRTL ? 'نشاط GitHub والكود' : 'GitHub Open Source Activity'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {isRTL ? 'نشاط التطوير والكود البرمجي' : 'GitHub Code & Activity'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            {isRTL 
              ? 'متابعة مستمرة لتطوير المشاريع المفتوحة والمستودعات البرمجية بانتظام وجودة عالية.'
              : 'Consistent commits, open source projects, and software repositories.'}
          </p>
        </motion.div>

        {/* GitHub Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card"
          style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {githubStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} style={{ padding: '16px 20px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contribution Heatmap Grid */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={18} style={{ color: 'var(--accent-blue)' }} />
                <span>{isRTL ? 'سجل المساهمات والأنشطة' : 'Contribution Graph'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <span>Less</span>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(34, 197, 94, 0.35)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'rgba(34, 197, 94, 0.65)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#22C55E' }} />
                <span>More</span>
              </div>
            </div>

            {/* Grid */}
            <div className="no-scrollbar" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '4px', minWidth: '600px', justifyContent: 'center' }}>
                {contributionWeeks.map((week, wIdx) => (
                  <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '2px',
                          backgroundColor: getCellColor(level),
                          transition: 'transform 150ms ease',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GitHub CTA Link Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MagneticElement strength={0.3}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', fontSize: '0.95rem', textDecoration: 'none' }}
              >
                <GithubIcon size={18} />
                <span>{isRTL ? 'زيارة حساب GitHub للمزيد من الأكواد' : 'Visit GitHub Profile'}</span>
                <ExternalLink size={16} />
              </a>
            </MagneticElement>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
