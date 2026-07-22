import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Flame, Award, ShieldCheck, Calendar, ExternalLink, FileText, Globe, Layers, Code2, Palette } from 'lucide-react';

// Official Flat Tech Icons (No background, Latest versions)
const Modern3DIcon = ({ name, size = 54 }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 300ms ease',
  };

  switch (name) {
    case 'html5':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill="#E34F26">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
          </svg>
        </div>
      );

    case 'dotnet':
      return (
        <div style={containerStyle}>
          <span style={{ fontSize: size * 0.45, fontWeight: 900, color: '#512BD4', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-1px' }}>
            .NET
          </span>
        </div>
      );

    case 'angular':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 250 250">
            <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
            <path fill="#C3002F" d="M125 30v200l78.9-43.7 14.2-123.1z"/>
            <path fill="#FFA3B1" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 112.2H108l17-42.5 17 42.5z"/>
          </svg>
        </div>
      );

    case 'figma':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 24 24">
            <path fill="#F24E1E" d="M12 11.966V5.983c0-1.652-1.343-2.991-3-2.991H6v5.983h3c1.657 0 3 1.339 3 2.991z"/>
            <path fill="#FF7262" d="M6 5.983C6 4.33 7.343 2.992 9 2.992h3v5.983H9c-1.657 0-3-1.339-3-2.991z"/>
            <path fill="#A259FF" d="M12 11.966v5.983c0 1.652-1.343 2.992-3 2.992H6v-5.983h3c1.657 0 3-1.339 3-2.992z"/>
            <path fill="#1ABCFE" d="M15 17.949c-1.657 0-3-1.34-3-2.992V8.974h3c1.657 0 3 1.34 3 2.992 0 1.652-1.343 2.991-3 2.991z"/>
            <path fill="#0ACF83" d="M9 17.949c-1.657 0-3 1.34-3 2.992 0 1.652 1.343 2.991 3 2.991 1.657 0 3-1.339 3-2.991v-2.992H9z"/>
          </svg>
        </div>
      );

    case 'photoshop':
      return (
        <div style={containerStyle}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill="#31A8FF">
             <path d="M0 0v24h24V0H0zm6.9 16.5c-2.3 0-3.6-1.5-3.6-3.8 0-2.4 1.4-3.9 3.7-3.9 1 0 1.9.3 2.5.7l-.6 1.4c-.5-.3-1.1-.6-1.8-.6-1.2 0-1.9.8-1.9 2.1 0 1.3.8 2.2 2 2.2.7 0 1.4-.3 1.9-.7l.6 1.4c-.6.5-1.5.8-2.6.8h-.2zm6.6 0c-1 .0-1.8-.3-2.4-.7l.5-1.4c.5.4 1.2.7 1.9.7.8 0 1.3-.4 1.3-1 0-.6-.5-.9-1.5-1.2-1.4-.4-2.3-1-2.3-2.2 0-1.4 1.1-2.2 2.6-2.2.8 0 1.6.3 2.2.7l-.5 1.3c-.5-.3-1.1-.5-1.7-.5-.7 0-1.1.4-1.1.9 0 .6.6.9 1.5 1.2 1.3.4 2.2 1.1 2.2 2.2.1 1.6-1.2 2.2-2.7 2.2z"/>
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


