import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Flame, Award, ShieldCheck, Calendar, ExternalLink, FileText, Globe, Layers, Code2, Palette, Loader2 } from 'lucide-react';

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

  // Certificates and Skills List

  // Certifications list with rich redesign requested by user
  const certificationsList = [
    {
      id: 1,
      category: 'general',
      date: 'Completed',
      title: lang === 'ar' ? 'دورة احتراف الذكاء الاصطناعي Claude' : 'Claude AI Mastery Course',
      issuer: 'Anthropic',
      platform: 'Anthropic Official',
      previewImage: '/courses/claude_mastery.jpg',
      fileDetail: lang === 'ar' ? 'التعامل مع بيئة Claude من الشركة الأم Anthropic.' : 'Mastering the Claude environment from Anthropic.',
    },
    {
      id: 2,
      category: 'general',
      date: 'Completed',
      title: lang === 'ar' ? 'دورة كتابة الأوامر لـ Claude (Prompting)' : 'Claude AI Prompt Engineering',
      issuer: 'YouTube',
      platform: 'YouTube',
      previewImage: '/courses/claude_prompting.jpg',
      fileDetail: lang === 'ar' ? 'كيفية التعامل مع Claude وكتابة الأوامر (Prompts) المتقدمة.' : 'How to use Claude and write advanced AI prompts.',
    },
    {
      id: 3,
      category: 'fullstack',
      date: 'Completed',
      title: lang === 'ar' ? 'دورة Vibe Coding' : 'Vibe Coding Course',
      issuer: 'YouTube',
      platform: 'YouTube',
      previewImage: '/courses/vibe_coding.jpg',
      fileDetail: lang === 'ar' ? 'كيفية التعامل مع الـ Vibe Coding لتطوير البرمجيات.' : 'Learning how to utilize Vibe Coding for software development.',
    },
    {
      id: 4,
      category: 'fullstack',
      date: 'In Progress (قيد التعلم)',
      title: lang === 'ar' ? 'دورة مطور Full Stack (.NET & Angular)' : 'Full Stack Developer (.NET & Angular)',
      issuer: 'Step by Step',
      reviewer: lang === 'ar' ? 'م. محمد المومني' : 'Eng. Mohammad Al-Momani',
      platform: 'Step by Step Company',
      previewImage: '/courses/fullstack_dotnet.jpg',
      fileDetail: lang === 'ar' ? 'بناء تطبيقات متكاملة باستخدام بيئة دوت نت وانجلر.' : 'Building full-stack apps with .NET and Angular.',
    },
    {
      id: 5,
      category: 'uiux',
      date: 'Completed',
      title: lang === 'ar' ? 'دورة تصميم واجهات وتجربة المستخدم UI/UX' : 'UI/UX Design Masterclass',
      issuer: 'Udemy',
      reviewer: lang === 'ar' ? 'م. إسلام أمير' : 'Eng. Eslam Ameer',
      platform: 'Udemy',
      previewImage: '/courses/uiux_udemy.jpg',
      fileDetail: lang === 'ar' ? 'مفاهيم تجربة المستخدم وتصميم الواجهات (بناءً على Figma).' : 'UX concepts and modern UI design (Figma based).',
    },
    {
      id: 6,
      category: 'uiux',
      date: 'Completed',
      title: lang === 'ar' ? 'ورشة عمل تصميم وتجربة المستخدم (ZINC)' : 'UI/UX Design Workshop',
      issuer: 'Zain Innovation Campus (ZINC)',
      reviewer: lang === 'ar' ? 'أ. علاء علي' : 'Mr. Alaa Ali',
      platform: 'ZINC - Zain',
      previewImage: '/courses/uiux_workshop.jpg',
      fileDetail: lang === 'ar' ? 'ورشة عمل في منصة زين للإبداع (ZINC).' : 'Interactive workshop hosted at Zain Innovation Campus (ZINC).',
    },
    {
      id: 7,
      category: 'graphic',
      date: 'Completed',
      title: lang === 'ar' ? 'دورة Adobe Photoshop' : 'Adobe Photoshop Course',
      issuer: 'YouTube',
      platform: 'YouTube',
      previewImage: '/courses/photoshop_course.jpg',
      fileDetail: lang === 'ar' ? 'دورة لتعلم الفوتوشوب واستخدامه في التصميم.' : 'Learning Photoshop tools for graphic design.',
    }
  ];

  // Filtering

  const filteredCerts = activeFilter === 'all'
    ? certificationsList
    : certificationsList.filter((c) => c.category === activeFilter);

  const completedCerts = filteredCerts.filter(c => c.date !== 'In Progress (قيد التعلم)');
  const learningCerts = filteredCerts.filter(c => c.date === 'In Progress (قيد التعلم)');

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

        {/* Top Category Filter Bar */}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', marginTop: '32px' }}>
          
          {/* Completed Courses Section */}
          {completedCerts.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <CheckCircle size={28} style={{ color: 'var(--accent-green)' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                  {lang === 'ar' ? 'دورات مكتملة (Completed)' : 'Completed Courses'}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AnimatePresence>
                  {completedCerts.map((cert) => (
                    <motion.div
                      key={cert.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card"
                      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                    >
                      <div style={{ flex: '1 1 300px', minHeight: '220px', position: 'relative' }}>
                        <img src={cert.previewImage} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>
                           <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.95)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', backdropFilter: 'blur(4px)' }}>
                             <CheckCircle size={16} />
                             {cert.date}
                           </span>
                        </div>
                      </div>
                      <div style={{ flex: '2 1 400px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>{cert.title}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} style={{ color: 'var(--accent-blue)' }} /> <span style={{ fontWeight: 600 }}>{cert.issuer}</span></div>
                          {cert.reviewer && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} style={{ color: 'var(--accent-green)' }} /> <span style={{ fontWeight: 600 }}>{cert.reviewer}</span></div>
                          )}
                        </div>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                          {cert.fileDetail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Currently Learning Section */}
          {learningCerts.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Flame size={28} style={{ color: 'var(--accent-blue)' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                  {lang === 'ar' ? 'دورات قيد التعلم (In Progress)' : 'Currently Learning'}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AnimatePresence>
                  {learningCerts.map((cert) => (
                    <motion.div
                      key={cert.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card"
                      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                    >
                      <div style={{ flex: '1 1 300px', minHeight: '220px', position: 'relative' }}>
                        <img src={cert.previewImage} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>
                           <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.95)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(59,130,246,0.5)', backdropFilter: 'blur(4px)' }}>
                             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ display: 'flex' }}>
                               <Loader2 size={16} />
                             </motion.div>
                             {cert.date}
                           </span>
                        </div>
                      </div>
                      <div style={{ flex: '2 1 400px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>{cert.title}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} style={{ color: 'var(--accent-blue)' }} /> <span style={{ fontWeight: 600 }}>{cert.issuer}</span></div>
                          {cert.reviewer && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} style={{ color: 'var(--accent-green)' }} /> <span style={{ fontWeight: 600 }}>{cert.reviewer}</span></div>
                          )}
                        </div>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                          {cert.fileDetail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {filteredCerts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
              {lang === 'ar' ? 'لا يوجد دورات في هذا القسم حالياً' : 'No courses found in this category'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


