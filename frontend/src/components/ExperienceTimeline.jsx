import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, GraduationCap, Award, Calendar, Sparkles } from 'lucide-react';

export const ExperienceTimeline = () => {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';

  const timelineContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 80%", "end 20%"]
  });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 80,
    damping: 25,
  });

  const filterTabs = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { id: 'work', label: lang === 'ar' ? 'الخبرات العملية' : 'Work Experience' },
    { id: 'education', label: lang === 'ar' ? 'التعليم الأكاديمي' : 'Education' },
    { id: 'certification', label: lang === 'ar' ? 'الشهادات والدورات' : 'Certifications' },
  ];

  const milestones = [
    {
      id: 1,
      type: 'work',
      categoryLabel: lang === 'ar' ? 'عمل وتطوير' : 'Work & Dev',
      date: '2025 - Present',
      title: lang === 'ar' ? 'مطور Full-Stack & Vibe Coder' : 'Full-Stack Developer & Vibe Coder',
      subtitle: lang === 'ar' ? 'تطوير مستقل ومشاريع برمجية متكاملة' : 'Freelance & Full-Stack Projects',
      description: lang === 'ar' 
        ? 'بناء وتصميم منظمات رقمية متكاملة باستخدام ASP.NET Core و Angular و React، مع تطبيق أحدث معايير الأداء والواجهات الزجاجية العصري.'
        : 'Engineered robust web applications using ASP.NET Core, Angular, and React 19, delivering scalable APIs and modern glassmorphic UIs.',
      icon: Briefcase,
    },
    {
      id: 2,
      type: 'certification',
      categoryLabel: lang === 'ar' ? 'شهادات تخصصية' : 'Certification',
      date: '2026',
      title: lang === 'ar' ? 'احتراف الذكاء الاصطناعي Vibe Coding & Claude' : 'Claude AI & Vibe Coding Mastery',
      subtitle: lang === 'ar' ? 'Anthropic & Advanced Prompt Engineering' : 'Anthropic & Advanced Prompt Engineering',
      description: lang === 'ar' 
        ? 'إتقان تقنيات الهندسة العكسية وتوجيه الذكاء الاصطناعي (Prompting) لتسريع بناء وتطوير الأنظمة البرمجية بأعلى كفاءة.'
        : 'Mastered advanced prompt engineering and AI-assisted Vibe Coding workflows to accelerate software production cycles.',
      icon: Award,
    },
    {
      id: 3,
      type: 'education',
      categoryLabel: lang === 'ar' ? 'تعليم جامعي' : 'Academic Degree',
      date: '2023 - Present (سنة ثالثة)',
      title: lang === 'ar' ? 'بكالوريوس هندسة البرمجيات' : 'B.Sc. Software Engineering',
      subtitle: lang === 'ar' ? 'جامعة الزيتونة الأردنية — عمان' : 'Alzaytoonah University of Jordan — Amman',
      description: lang === 'ar' 
        ? 'دراسة خوارزميات البرمجة والهياكل البيانات، هندسة المعمارية للنظم البرمجية، وإدارة قواعد البيانات العلاقاتية SQL.'
        : 'Studying core computer science fundamentals, software architectural patterns, algorithms, data structures, and relational SQL databases.',
      icon: GraduationCap,
    },
    {
      id: 4,
      type: 'certification',
      categoryLabel: lang === 'ar' ? 'شهادات تخصصية' : 'Certification',
      date: '2026',
      title: lang === 'ar' ? 'دبلوم احتراف تصميم UI/UX' : 'UI/UX Design Masterclass',
      subtitle: lang === 'ar' ? 'Udemy & ZINC Zain Innovation Campus' : 'Udemy & ZINC Zain Innovation Campus',
      description: lang === 'ar' 
        ? 'تعلّم واحتراف تصميم الواجهات التفاعلية وأنظمة المكونات (Design Systems) وبروتوتايب Figma بإشراف خبراء متخصصين.'
        : 'Mastered interactive UI prototyping, user research, wireframing, and Figma design systems supervised by industry design leads.',
      icon: Award,
    },
    {
      id: 5,
      type: 'certification',
      categoryLabel: lang === 'ar' ? 'شهادات تخصصية' : 'Certification',
      date: '2025',
      title: lang === 'ar' ? 'دورة الجرافيك و Adobe Photoshop' : 'Adobe Photoshop Graphic Design',
      subtitle: lang === 'ar' ? 'تصميم الهويات البصرية والشعارات' : 'Brand Identity & Visual Arts',
      description: lang === 'ar' 
        ? 'إتقان أدوات الفوتوشوب والتصميم الجرافيكي وصناعة الهويات البصرية المتكاملة للمشاريع الرقمية.'
        : 'Learned advanced graphic design principles, logo creation, photo editing, and brand identity asset development.',
      icon: Award,
    }
  ];

  const filteredMilestones = filter === 'all' 
    ? milestones 
    : milestones.filter((m) => m.type === filter);

  return (
    <section id="experience" style={{ paddingBottom: '100px', paddingTop: '80px', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'المسار المهني والأكاديمي' : 'Experience & Milestones'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'المسار المهني والخبرات' : 'Career & Experience'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'ar' 
              ? 'محطات رئيسية تشمل التعليم الأكاديمي، المشاريع العملية، والشهادات التخصصية التي شكلت مساري كمهندس برمجيات.'
              : 'Key milestones encompassing academic education, full-stack projects, and specialized certifications.'}
          </p>
        </motion.div>

        {/* Filter Tabs — Active glow, inactive muted */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={filter === tab.id ? 'filter-tab-active' : 'filter-tab-inactive'}
              style={{
                padding: '10px 22px',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: 700,
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 180ms ease',
                minHeight: '44px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Wrapper */}
        <div ref={timelineContainerRef} style={{ position: 'relative', paddingLeft: isRTL ? 0 : '24px', paddingRight: isRTL ? '24px' : 0 }}>
          
          {/* Animated Timeline Line — draws itself as user scrolls */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              right: isRTL ? '11px' : 'auto',
              left: isRTL ? 'auto' : '11px',
              width: '3px',
              background: 'var(--border-color)',
              borderRadius: '2px',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--accent-blue) 0%, var(--accent-purple) 50%, var(--border-color) 100%)',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Milestones List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {filteredMilestones.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  {/* Indicator Dot on the Line — category colored, glowing ring on current */}
                  <motion.div
                    whileInView={{ scale: [1, 1.3, 1] }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: isRTL ? '-21px' : 'auto',
                      left: isRTL ? 'auto' : '-21px',
                      width: item.id === 1 ? '22px' : '18px',
                      height: item.id === 1 ? '22px' : '18px',
                      borderRadius: '50%',
                      backgroundColor: item.type === 'work' ? 'var(--cat-work)' : item.type === 'education' ? 'var(--cat-education)' : 'var(--cat-cert)',
                      border: '3px solid var(--bg-primary)',
                      boxShadow: item.id === 1
                        ? '0 0 0 4px rgba(59,130,246,0.3), 0 0 20px rgba(59,130,246,0.5)'
                        : item.type === 'work' ? '0 0 12px var(--cat-work-glow)'
                        : item.type === 'education' ? '0 0 12px var(--cat-education-glow)'
                        : '0 0 12px var(--cat-cert-glow)',
                      zIndex: 2,
                    }}
                  />

                  {/* Milestone Card */}
                  <div
                    className="glass-card"
                    style={{
                      padding: '24px 28px',
                      marginLeft: isRTL ? 0 : '20px',
                      marginRight: isRTL ? '20px' : 0,
                      backgroundColor: 'var(--card-bg)',
                    }}
                  >
                    {/* Header Row: Category Badge & Date */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: item.type === 'work' ? 'rgba(59,130,246,0.14)' : item.type === 'education' ? 'rgba(139,92,246,0.14)' : 'rgba(16,185,129,0.14)',
                          color: item.type === 'work' ? 'var(--cat-work)' : item.type === 'education' ? 'var(--cat-education)' : 'var(--cat-cert)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Icon size={18} />
                        </div>
                        <span style={{ fontSize: 'var(--text-caption)', fontWeight: 700, color: item.type === 'work' ? 'var(--cat-work)' : item.type === 'education' ? 'var(--cat-education)' : 'var(--cat-cert)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {item.categoryLabel}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                      {item.subtitle}
                    </div>

                    {/* Short Description */}
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
