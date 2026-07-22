import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Flame, Award, ShieldCheck, Calendar, ExternalLink, FileText, Globe, Layers, Code2, Palette } from 'lucide-react';

// Ultra-Modern 3D Glass & Depth Vector SVG Icon Renderer
const Modern3DIcon = ({ name, size = 54 }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.25))',
    transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  switch (name) {
    case 'html5':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="html3d_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B4A" />
                <stop offset="50%" stopColor="#E44D26" />
                <stop offset="100%" stopColor="#B32B0B" />
              </linearGradient>
              <linearGradient id="html3d_grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF8566" />
                <stop offset="100%" stopColor="#F16529" />
              </linearGradient>
            </defs>
            <path d="M15 10 L85 10 L78 82 L50 92 L22 82 Z" fill="url(#html3d_grad1)" />
            <path d="M50 15 L80 15 L74 78 L50 86 Z" fill="url(#html3d_grad2)" />
            <path d="M50 32 H28 L30 46 H50 V32 Z M50 60 H31 L32 70 L50 75 V60 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M50 32 H72 L70 46 H50 V32 Z M50 60 H69 L67 70 L50 75 V60 Z" fill="#E6E6E6" />
          </svg>
        </div>
      );

    case 'dotnet':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="dotnet3d_bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#311B92" />
              </linearGradient>
            </defs>
            <rect x="8" y="8" width="84" height="84" rx="26" fill="url(#dotnet3d_bg)" />
            <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="900" fontFamily="Space Grotesk, sans-serif">.NET</text>
          </svg>
        </div>
      );

    case 'angular':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon points="50,8 14,24 21,76 50,92 79,76 86,24" fill="#DD0031" />
            <path d="M50 20 L24 74 H35 L41 60 H59 L65 74 H76 L50 20 Z M50 36 L56 50 H44 L50 36 Z" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'figma':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <rect x="24" y="10" width="26" height="26" rx="13" fill="#F24E1E" />
            <rect x="50" y="10" width="26" height="26" rx="13" fill="#FF7262" />
            <rect x="24" y="36" width="26" height="26" rx="13" fill="#A259FF" />
            <circle cx="63" cy="49" r="13" fill="#1ABCFE" />
            <path d="M24 62 C24 54.8 29.8 49 37 49 H50 V62 C50 69.2 44.2 75 37 75 C29.8 75 24 69.2 24 62 Z" fill="#0ACF83" />
          </svg>
        </div>
      );

    case 'photoshop':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" rx="20" fill="#001E36" stroke="#31A8FF" strokeWidth="2.5" />
            <text x="32" y="65" fill="#31A8FF" fontSize="38" fontWeight="800" fontFamily="Space Grotesk, sans-serif">P</text>
            <text x="56" y="65" fill="#31A8FF" fontSize="38" fontWeight="800" fontFamily="Space Grotesk, sans-serif">s</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};

export const SkillsSection = () => {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Exact Filter Tabs Order requested by user: All -> General -> Full-Stack -> UI/UX -> Graphic Design
  const filterTabs = [
    { id: 'all', label: lang === 'ar' ? 'جميع المهارات والدورات' : 'All Skills & Courses' },
    { id: 'general', label: lang === 'ar' ? 'دورات تقنية عامة' : 'General Tech Courses' },
    { id: 'fullstack', label: lang === 'ar' ? 'دورات Full-Stack .NET' : 'Full-Stack .NET' },
    { id: 'uiux', label: lang === 'ar' ? 'دورات UI / UX' : 'UI / UX Design' },
    { id: 'graphic', label: lang === 'ar' ? 'دورات Graphic Design' : 'Graphic Design' },
  ];

  const masteredSkills = [
    { category: 'fullstack', name: 'HTML5 & CSS3 Architecture', level: '100% Mastered', desc: lang === 'ar' ? 'بناء واجهات قياسية متجاوبة وعالية الأداء' : 'Responsive layout & web accessibility standards', iconName: 'html5' },
    { category: 'uiux', name: 'UI / UX & Figma Wireframes', level: '100% Mastered', desc: lang === 'ar' ? 'تصميم تجارب المستخدم والنماذج التفاعلية' : 'Interactive prototyping & Figma design tokens', iconName: 'figma' },
    { category: 'graphic', name: 'Adobe Photoshop & Branding', level: 'Mastered', desc: lang === 'ar' ? 'ابتكار الجرافيك والشعارات والهويات البصرية' : 'Graphic design, logo identity & visual collateral', iconName: 'photoshop' },
  ];

  const learningSkills = [
    { category: 'fullstack', name: '.NET Full Stack (C# & ASP.NET)', level: 'In Progress', desc: lang === 'ar' ? 'بناء واجهات REST APIs وقواعد بيانات SQL Server' : 'C#, ASP.NET Core Web API, Entity Framework, SQL Server', iconName: 'dotnet' },
    { category: 'fullstack', name: 'Angular & TypeScript', level: 'In Progress', desc: lang === 'ar' ? 'تطوير واجهات مستخدم تفاعلية للأنظمة المعقدة' : 'TypeScript, RxJS, Component Architecture & Forms', iconName: 'angular' },
  ];

  // Certifications list with rich redesign requested by user
  const certificationsList = [
    {
      id: 1,
      category: 'fullstack',
      date: '2024 - 2026',
      title: lang === 'ar' ? 'شهادة احتراف تطوير الويب Full Stack (.NET Core)' : '.NET Core Full Stack Professional Certificate',
      issuer: lang === 'ar' ? 'المجلس الدولي للمراجعة والتدريب البرمجي' : 'Global Tech Certification Authority',
      reviewer: lang === 'ar' ? 'د. مراجعة هندسة البرمجيات' : 'Senior Software Engineer Reviewer',
      platform: 'Professional Bootcamp Track',
      previewImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      fileDetail: lang === 'ar' ? 'تغطي C#، Web API، SQL Server، وأنماط التصميم المعمارية' : 'Curriculum covers C#, ASP.NET Web API, SQL Server, and OOP architecture.',
    },
    {
      id: 2,
      category: 'uiux',
      date: '2024',
      title: lang === 'ar' ? 'شهادة التخصص في تصميم تجارب وواجهات المستخدم (UI/UX)' : 'UI/UX Interactive Prototyping & Figma Specialist',
      issuer: 'Design Academy & UX Association',
      reviewer: 'Lead UI/UX Architect',
      platform: 'Figma Design Academy',
      previewImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80',
      fileDetail: lang === 'ar' ? 'تغطي بناء Wireframes، النماذج التفاعلية، وأنظمة الألوان المتكيفة' : 'Covers Wireframes, Figma components, interactive flows, and dark mode tokens.',
    },
    {
      id: 3,
      category: 'graphic',
      date: '2023',
      title: lang === 'ar' ? 'شهادة احتراف تصميم الجرافيك والهوية البصرية' : 'Graphic Design & Visual Brand Identity Certification',
      issuer: 'Adobe Certified Expert Review',
      reviewer: 'Senior Graphic Brand Director',
      platform: 'Adobe Creative Campus',
      previewImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
      fileDetail: lang === 'ar' ? 'تغطي أدوات Photoshop، تصميم الشعارات، والدليل البصري للهويات' : 'Mastery in Adobe Photoshop, logo creation, typography, and brand identity manuals.',
    },
    {
      id: 4,
      category: 'general',
      date: '2022 - 2026',
      title: lang === 'ar' ? 'المؤهل الأكاديمي هندسة البرمجيات' : 'Software Engineering Academic Degree',
      issuer: lang === 'ar' ? 'جامعة الزيتونة الأردنية' : 'Alzaytoonah University of Jordan',
      reviewer: lang === 'ar' ? 'عمادة كلية تكنولوجيا المعلومات' : 'IT Faculty Academic Board',
      platform: 'Alzaytoonah Academic Portal',
      previewImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
      fileDetail: lang === 'ar' ? 'تغطي هندسة البرمجيات، خوارزميات البيانات، وتطوير الأنظمة المعقدة' : 'Comprehensive computer science & software engineering curriculum.',
    },
  ];

  // Filtering
  const filteredMastered = activeFilter === 'all'
    ? masteredSkills
    : masteredSkills.filter((s) => s.category === activeFilter);

  const filteredLearning = activeFilter === 'all'
    ? learningSkills
    : learningSkills.filter((s) => s.category === activeFilter);

  const filteredCerts = activeFilter === 'all'
    ? certificationsList
    : certificationsList.filter((c) => c.category === activeFilter);

  return (
    <section id="skills">
      <div className="container">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '12px' }}>
            {t.skills.title}
          </h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-blue)', margin: '0 auto 24px auto', borderRadius: '2px' }} />
        </motion.div>

        {/* Top Category Filter Bar requested by user */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '52px' }}>
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
                boxShadow: activeFilter === tab.id ? '0 8px 20px var(--accent-blue-glow)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mastered & Learning Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px', marginBottom: '64px' }}>
          {/* Mastered Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{ padding: '32px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: 'var(--accent-green)' }}>
              <CheckCircle size={24} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{t.skills.mastered}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AnimatePresence mode="popLayout">
                {filteredMastered.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      padding: '18px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Modern3DIcon name={skill.iconName} size={42} />
                        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{skill.name}</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
                        {skill.level}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {skill.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Currently Learning Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card"
            style={{ padding: '32px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: 'var(--accent-blue)' }}>
              <Flame size={24} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{t.skills.learning}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AnimatePresence mode="popLayout">
                {filteredLearning.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      padding: '18px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Modern3DIcon name={skill.iconName} size={42} />
                        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{skill.name}</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
                        {skill.level}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {skill.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Certifications & Course Credentials Section Empty State requested by user */}
        <div style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            <Award size={28} style={{ color: 'var(--accent-blue)' }} />
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
              {lang === 'ar' ? 'الشهادات والدورات المعتمدة' : 'Certified Courses & Credentials'}
            </h3>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
              }}
            >
              <Award size={30} />
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'لا يوجد شهادات مضافة حالياً' : 'No Certifications Added Yet'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '420px', lineHeight: 1.6 }}>
              {lang === 'ar' ? 'سيتم إضافة الشهادات والدورات المعتمدة قريباً فور اعتمادها وتحديث السجلات.' : 'Certified credentials and program certificates will be uploaded here soon.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


