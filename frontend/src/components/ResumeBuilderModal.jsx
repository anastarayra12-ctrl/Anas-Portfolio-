import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Download, Eye, X, Check, Code2, Server, Layout, Sparkles } from 'lucide-react';

export const ResumeBuilderModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [selectedFocus, setSelectedFocus] = useState('fullstack');

  const options = [
    {
      id: 'fullstack',
      icon: Sparkles,
      color: 'var(--cat-work)',
      title: lang === 'ar' ? 'السيرة الذاتية الكاملة (Full-Stack)' : 'Full-Stack (.NET & Angular)',
      desc: lang === 'ar' ? 'تغطي جميع مجالات البرمجة والتصميم بالتفصيل الأكاديمي والعملي.' : 'Comprehensive overview of Full-Stack development, design, and education.',
      highlights: ['.NET 9 & C# Architecture', 'Angular 17+ & React 19', 'Figma UI/UX Systems', 'Vibe Coding & AI Prompting'],
      pdfUrl: '/Anas_AL-Tarayra-CV.pdf?v=2',
    },
    {
      id: 'frontend',
      icon: Layout,
      color: 'var(--cat-design)',
      title: lang === 'ar' ? 'تركيز الواجهات والأداء (Frontend)' : 'Frontend & UI Specialist Focus',
      desc: lang === 'ar' ? 'تسليط الضوء على خبرات React، Angular، التصميم الزجاجي والأنيميشن.' : 'Emphasizes React 19, Angular, Framer Motion, glassmorphic UI, and performance.',
      highlights: ['Angular 17+ & TypeScript', 'React 19 & State Mgmt', 'CSS Animations & Responsive', 'Figma Wireframes to Code'],
      pdfUrl: '/Anas_AL-Tarayra-CV.pdf?v=2',
    },
    {
      id: 'backend',
      icon: Server,
      color: 'var(--cat-education)',
      title: lang === 'ar' ? 'تركيز الأنظمة والأنماط (Backend)' : 'Backend & Architecture Focus',
      desc: lang === 'ar' ? 'يركز على معمارية .NET 9، بناء الـ Web APIs، وقواعد البيانات SQL Server.' : 'Highlights C# .NET 9 Web API architecture, SQL Server, and REST APIs.',
      highlights: ['C# & ASP.NET Core 9', 'Entity Framework & SQL Server', 'RESTful API Design', 'Data Structures & OOP'],
      pdfUrl: '/Anas_AL-Tarayra-CV.pdf?v=2',
    },
    {
      id: 'design',
      icon: Code2,
      color: 'var(--cat-cert)',
      title: lang === 'ar' ? 'تركيز التصميم والجرافيك (UI/UX)' : 'UI/UX & Visual Arts Focus',
      desc: lang === 'ar' ? 'يركز على مهارات Figma والـ Design Systems والفوتوشوب والهويات البصرية.' : 'Focuses on Figma design systems, interactive prototypes, and Adobe Photoshop.',
      highlights: ['Figma Design Systems', 'Interactive Prototyping', 'Adobe Photoshop Arts', 'User Research & Wireframes'],
      pdfUrl: '/Anas_AL-Tarayra-CV.pdf?v=2',
    },
  ];

  const currentOption = options.find((o) => o.id === selectedFocus) || options[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(680px, 94vw)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: lang === 'ar' ? 'auto' : '20px',
                left: lang === 'ar' ? '20px' : 'auto',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                <FileText size={16} />
                <span>{lang === 'ar' ? 'منشئ السيرة الذاتية المخصص' : 'Tailored Resume Builder'}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                {lang === 'ar' ? 'اختر تخصص السيرة الذاتية المناسب لك' : 'Select Targeted CV Focus'}
              </h3>
            </div>

            {/* Options Selector Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '28px' }}>
              {options.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedFocus === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedFocus(opt.id)}
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderRadius: '16px',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `2px solid ${opt.color}` : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        backgroundColor: `${opt.color}20`,
                        color: opt.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Focus Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', uppercase: true, letterSpacing: '0.05em', marginBottom: '10px' }}>
                {lang === 'ar' ? 'أبرز النقاط المجهزة في هذه النسخة:' : 'Highlighted in this edition:'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                {currentOption.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                    <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={currentOption.pdfUrl}
                download={`Anas_Al-Tarayrah_CV_${selectedFocus.toUpperCase()}.pdf`}
                className="btn-primary"
                style={{ flex: 1, textDecoration: 'none', justifyContent: 'center' }}
              >
                <Download size={18} />
                <span>{lang === 'ar' ? `تحميل نسخة (${currentOption.id.toUpperCase()})` : `Download (${currentOption.id.toUpperCase()}) PDF`}</span>
              </a>

              <a
                href="/Anas_Al_Tarayrah_CV.html?v=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flex: 1, textDecoration: 'none', justifyContent: 'center' }}
              >
                <Eye size={18} />
                <span>{lang === 'ar' ? 'معاينة ويب' : 'Web Preview'}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
