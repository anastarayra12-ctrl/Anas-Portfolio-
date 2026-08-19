import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, ShieldCheck, Globe, Loader2, Sparkles, Award, Tag } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

export const SkillsSection = () => {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const shouldReduceMotion = useReducedMotion();

  const filterTabs = [
    { id: 'all', label: lang === 'ar' ? 'جميع المهارات والدورات' : 'All Skills & Courses' },
    { id: 'fullstack', label: 'Full-Stack .NET' },
    { id: 'uiux', label: 'UI / UX Design' },
    { id: 'general', label: lang === 'ar' ? 'دورات تقنية و AI' : 'General & AI Tech' },
    { id: 'graphic', label: 'Graphic Design' },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'fullstack': return 'var(--cat-fullstack)';
      case 'uiux': return 'var(--cat-uiux)';
      case 'general': return 'var(--cat-general)';
      case 'graphic': return 'var(--cat-graphic)';
      default: return 'var(--accent-blue)';
    }
  };

  const categoryLegend = [
    { id: 'fullstack', label: 'Full-Stack .NET', color: 'var(--cat-fullstack)' },
    { id: 'uiux', label: 'UI/UX Design', color: 'var(--cat-uiux)' },
    { id: 'general', label: 'Tech & AI', color: 'var(--cat-general)' },
    { id: 'graphic', label: 'Graphic Design', color: 'var(--cat-graphic)' },
  ];

  const certificationsList = [
    {
      id: 1,
      category: 'general',
      date: '2026',
      status: 'completed',
      title: lang === 'ar' ? 'دورة احتراف الذكاء الاصطناعي Claude' : 'Claude AI Mastery Course',
      issuer: 'Anthropic',
      fileDetail: lang === 'ar' ? 'التعامل مع بيئة Claude من الشركة الأم Anthropic للحصول على أقصى إنتاجية.' : 'Mastering the Claude environment from Anthropic for maximum productivity.',
    },
    {
      id: 2,
      category: 'general',
      date: '2026',
      status: 'completed',
      title: lang === 'ar' ? 'دورة كتابة الأوامر لـ Claude' : 'Claude AI Prompt Engineering',
      issuer: 'YouTube',
      fileDetail: lang === 'ar' ? 'كيفية التعامل مع Claude وكتابة الأوامر (Prompts) المتقدمة بشكل احترافي.' : 'How to use Claude and write advanced AI prompts professionally.',
    },
    {
      id: 3,
      category: 'fullstack',
      date: '2026',
      status: 'completed',
      title: lang === 'ar' ? 'دورة Vibe Coding' : 'Vibe Coding Course',
      issuer: 'YouTube',
      fileDetail: lang === 'ar' ? 'كيفية التعامل مع تقنيات الـ Vibe Coding لتسريع تطوير البرمجيات.' : 'Learning how to utilize Vibe Coding techniques for software development.',
    },
    {
      id: 4,
      category: 'fullstack',
      date: 'In Progress (قيد التعلم)',
      status: 'learning',
      title: lang === 'ar' ? 'مطور Full Stack (.NET & Angular)' : 'Full Stack Developer (.NET & Angular)',
      issuer: 'Step by Step',
      reviewer: lang === 'ar' ? 'م. محمد المومني' : 'Eng. Mohammad Al-Momani',
      fileDetail: lang === 'ar' ? 'بناء تطبيقات ويب متكاملة، قوية، وقابلة للتطوير باستخدام بيئة دوت نت وانجلر.' : 'Building full-stack, scalable, and robust web apps with .NET and Angular.',
    },
    {
      id: 5,
      category: 'uiux',
      date: '2026',
      status: 'completed',
      title: lang === 'ar' ? 'تصميم واجهات وتجربة المستخدم UI/UX' : 'UI/UX Design Masterclass',
      issuer: 'Udemy',
      reviewer: lang === 'ar' ? 'م. إسلام أمير' : 'Eng. Eslam Ameer',
      fileDetail: lang === 'ar' ? 'مفاهيم تجربة المستخدم الحديثة وتصميم الواجهات الاحترافية (بناءً على Figma).' : 'Modern UX concepts and professional UI design (Figma based).',
    },
    {
      id: 6,
      category: 'uiux',
      date: '2026',
      status: 'completed',
      title: lang === 'ar' ? 'ورشة عمل تصميم وتجربة المستخدم' : 'UI/UX Design Workshop (ZINC)',
      issuer: 'Zain Innovation Campus',
      reviewer: lang === 'ar' ? 'أ. علاء علي' : 'Mr. Alaa Ali',
      fileDetail: lang === 'ar' ? 'ورشة عمل تطبيقية ومكثفة في منصة زين للإبداع (ZINC).' : 'Interactive and intensive workshop hosted at Zain Innovation Campus (ZINC).',
    },
    {
      id: 7,
      category: 'graphic',
      date: '2025',
      status: 'completed',
      title: lang === 'ar' ? 'دورة Adobe Photoshop' : 'Adobe Photoshop Course',
      issuer: 'YouTube',
      fileDetail: lang === 'ar' ? 'تعلم أدوات الفوتوشوب المتقدمة واستخدامها بفعالية في تصميم الجرافيك.' : 'Learning advanced Photoshop tools and utilizing them in graphic design.',
    }
  ];

  const filteredCerts = activeFilter === 'all'
    ? certificationsList
    : certificationsList.filter((c) => c.category === activeFilter);

  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border-color)', paddingBottom: '120px', paddingTop: '80px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'المهارات والدورات' : 'Skills & Courses'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {t.skills.title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
            {lang === 'ar' 
              ? 'طالب هندسة برمجيات في جامعة الزيتونة ومطور Full-Stack (.NET & Angular) ومصمم UI/UX، مستمر في التطوير وصياغة الخبرات.'
              : 'Software Engineering student at Alzaytoonah University, Full-Stack (.NET & Angular) Developer, and UI/UX Designer.'}
          </p>

          {/* Skill Mastery Levels Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-sm)', maxWidth: '900px', margin: '0 auto var(--space-lg) auto', textAlign: 'left' }}>
            {[
              { skill: '.NET 9 & C# Architecture', level: 92 },
              { skill: 'UI/UX Design & Figma', level: 95 },
              { skill: 'Angular & TypeScript', level: 88 },
              { skill: 'Vibe Coding & AI Prompting', level: 96 },
              { skill: 'SQL Server & Databases', level: 85 },
              { skill: 'Graphic Design & Photoshop', level: 87 },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: 'var(--space-sm) var(--space-md)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.skill}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{item.level}%</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div className="skill-bar-fill" style={{ width: `${item.level}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Category Color Legend Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: 'var(--space-md)', padding: '12px 20px', borderRadius: '100px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', width: 'max-content', margin: '0 auto var(--space-md) auto' }}>
            {categoryLegend.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: activeFilter === tab.id ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                backgroundColor: activeFilter === tab.id ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                color: activeFilter === tab.id ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px',
              }}
            >
              <Award size={15} style={{ opacity: activeFilter === tab.id ? 1 : 0.6 }} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Unified Cards Stack */}
        <div style={{ position: 'relative' }}>
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert, index) => {
              const catColor = getCategoryColor(cert.category);
              return (
                <div 
                  key={cert.id} 
                  style={{
                    position: 'sticky',
                    top: `calc(100px + ${index * 25}px)`, 
                    marginBottom: index === filteredCerts.length - 1 ? '0' : '8vh', 
                    zIndex: index, 
                  }}
                >
                  <MagneticElement strength={0.15} style={{ width: '100%' }}>
                    <div
                      style={{
                        background: 'var(--card-bg)',
                        borderRadius: '24px',
                        minHeight: '320px',
                        padding: 'var(--space-lg)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.3)', 
                        position: 'relative',
                        overflow: 'hidden',
                        border: `1px solid var(--border-color)`,
                        borderTop: `3px solid ${catColor}`,
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      {/* Top Content: Category Tag & Date/Status */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            backgroundColor: `${catColor}15`,
                            border: `1px solid ${catColor}40`,
                            color: catColor,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}>
                            <Tag size={14} />
                            <span>{cert.category}</span>
                          </span>

                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            backgroundColor: cert.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            border: cert.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(59, 130, 246, 0.25)',
                            color: cert.status === 'completed' ? 'var(--accent-green)' : 'var(--accent-blue)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}>
                            {cert.status === 'completed' ? <CheckCircle size={14} /> : <Loader2 size={14} className="animate-spin" />}
                            <span>{cert.date}</span>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          <Globe size={15} />
                          <span>{cert.issuer}</span>
                        </div>
                      </div>

                      {/* Bottom Content: Title & Details */}
                      <div style={{ marginTop: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>
                          {cert.title}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                          {cert.fileDetail}
                        </p>

                        {cert.reviewer && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            <ShieldCheck size={16} style={{ color: 'var(--accent-green)' }} />
                            <span>{lang === 'ar' ? 'بإشراف:' : 'Supervised by:'} {cert.reviewer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </MagneticElement>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {lang === 'ar' ? 'لا توجد دورات في هذا القسم حالياً.' : 'No courses in this category currently.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
