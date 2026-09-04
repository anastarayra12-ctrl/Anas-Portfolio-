import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Compass, CheckCircle2, Flame, Rocket, Code2, Info } from 'lucide-react';

export const TechRadarSection = () => {
  const { lang } = useLanguage();
  const [activeRing, setActiveRing] = useState('all');

  const rings = [
    {
      id: 'production',
      title: lang === 'ar' ? 'أستخدمه حالياً (In Production)' : 'Currently Using (Production)',
      color: 'var(--accent-green)',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.3)',
      icon: CheckCircle2,
      items: [
        { name: '.NET 9 & C# Architecture', desc: lang === 'ar' ? 'بناء خلفيات عالية الأداء ومستقرة' : 'High-performance Web API backends' },
        { name: 'Angular 17+ & TypeScript', desc: lang === 'ar' ? 'تطبيقات ويب متكاملة وإدارة حالات خفيفة' : 'Scalable enterprise frontends' },
        { name: 'React 19 & Vite', desc: lang === 'ar' ? 'تفاعلية فائقة السرعة وأنيميشن زجاجي' : 'Ultra-fast interactive UIs & animations' },
        { name: 'Figma UI/UX Systems', desc: lang === 'ar' ? 'تصميم أنظمة مكونات وشاشات تفاعلية' : 'Pixel-perfect design systems' },
        { name: 'SQL Server & Relational DBs', desc: lang === 'ar' ? 'تصميم قواعد البيانات وتحسين الاستعلامات' : 'Relational schema design & optimization' },
      ],
    },
    {
      id: 'exploring',
      title: lang === 'ar' ? 'أجربه واستكشفه (Exploring)' : 'Exploring & Trying',
      color: 'var(--accent-blue)',
      bg: 'rgba(59, 130, 246, 0.12)',
      border: 'rgba(59, 130, 246, 0.3)',
      icon: Flame,
      items: [
        { name: 'Vibe Coding & Claude API', desc: lang === 'ar' ? 'تطوير مدعوم بالذكاء الاصطناعي لتسريع الإنجاز' : 'AI-assisted dev cycles & RAG prompts' },
        { name: 'Docker & Containerization', desc: lang === 'ar' ? 'حزم وتغليف التطبيقات للنشر المستمر' : 'App containerization for clean deploys' },
        { name: 'PostgreSQL & Dapper', desc: lang === 'ar' ? 'استعلامات سريعة وقواعد بيانات مفتوحة المصدر' : 'High-speed lightweight queries' },
      ],
    },
    {
      id: 'next',
      title: lang === 'ar' ? 'أخطط لتعلّمه قريباً (Learning Next)' : 'Want to Learn Next',
      color: 'var(--accent-purple)',
      bg: 'rgba(139, 92, 246, 0.12)',
      border: 'rgba(139, 92, 246, 0.3)',
      icon: Rocket,
      items: [
        { name: 'Next.js 15 App Router', desc: lang === 'ar' ? 'توليد صفحات جانب السيرفر وتحسين الـ SEO' : 'Full-stack React framework & SSR' },
        { name: 'Microservices & Event Bus', desc: lang === 'ar' ? 'معمارية النظم الموزعة الرسائل الحية' : 'Distributed systems & RabbitMQ' },
        { name: 'Redis Caching & PubSub', desc: lang === 'ar' ? 'التخزين المؤقت فائق السرعة واستجابة اللحظة' : 'In-memory caching for speed' },
      ],
    },
  ];

  const filteredRings = activeRing === 'all' ? rings : rings.filter((r) => r.id === activeRing);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      style={{ marginTop: '48px', marginBottom: '20px' }}
    >
      <div
        className="glass-card"
        style={{
          padding: '36px',
          borderRadius: '24px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              color: 'var(--accent-purple)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            <Compass size={16} />
            <span>{lang === 'ar' ? 'رادار التقنيات التفاعلي' : 'Personal Tech Radar'}</span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px 0' }}>
            {lang === 'ar' ? 'رادار الأدوات والتطور التقني' : 'Technology Radar & Horizon'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            {lang === 'ar'
              ? 'نظرة منظمة للتقنيات التي أنفذ بها المشاريع حالياً، وما أستكشفه، وما أخطط لإتقانه.'
              : 'Structured view of technologies currently in production, being explored, and planned next.'}
          </p>
        </div>

        {/* Ring Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={() => setActiveRing('all')}
            className={activeRing === 'all' ? 'filter-tab-active' : 'filter-tab-inactive'}
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '0.84rem', fontWeight: 700, border: '1px solid', cursor: 'pointer' }}
          >
            {lang === 'ar' ? 'الكل (All Rings)' : 'All Rings'}
          </button>
          {rings.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRing(r.id)}
              className={activeRing === r.id ? 'filter-tab-active' : 'filter-tab-inactive'}
              style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '0.84rem', fontWeight: 700, border: '1px solid', cursor: 'pointer' }}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Radar Rings Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredRings.map((ring) => {
            const Icon = ring.icon;
            return (
              <div
                key={ring.id}
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${ring.border}`,
                  borderLeft: `4px solid ${ring.color}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: ring.bg,
                      color: ring.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {ring.title}
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {ring.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'transform 200ms ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ring.color }} />
                        <span>{item.name}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
