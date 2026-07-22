import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { X, Download, BookOpen, Award, Code2, Briefcase, Copy, Check } from 'lucide-react';

export const CvModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('summary');
  const [cvLang, setCvLang] = useState(lang);

  if (!isOpen) return null;

  const cvData = {
    en: {
      name: 'Anas Tarayra',
      role: 'Vibe Coder / UI-UX Designer & Software Engineering Student',
      university: 'Alzaytoonah University of Jordan — Software Engineering',
      location: 'Amman, Jordan',
      contact: '0796851497 | anastarayra12@gmail.com',
      summary: 'Passionate Software Engineering student focused on building modern web applications, design systems, and UI/UX experiences. Possesses strong analytical thinking, proficiency in modern web stacks, and active learning in .NET Full Stack development.',
      skills: [
        { category: 'Frontend', items: 'HTML5 (Mastered), JavaScript, React, Framer Motion' },
        { category: 'Backend & Frameworks', items: '.NET Core Web API, C# (Currently Learning), Angular' },
        { category: 'Tools & AI', items: 'Figma, VS Code, Git/GitHub, Photoshop, Antigravity AI Tools' },
      ],
      education: [
        { degree: 'Bachelor of Software Engineering', school: 'Alzaytoonah University of Jordan', status: 'In Progress' },
      ],
      courses: [
        { title: '.NET Full Stack Development Bootcamp', status: 'Enrolled' },
        { title: 'Angular Framework & TypeScript Masterclass', status: 'Enrolled' },
        { title: 'UI/UX Design Systems & Prototyping', status: 'Completed' },
      ],
    },
    ar: {
      name: 'أنس ترايرة',
      role: 'مطوّر واجهات وتطبيقات / مصمم UI-UX وطالب هندسة برمجيات',
      university: 'جامعة الزيتونة الأردنية — هندسة البرمجيات',
      location: 'عمان، الأردن',
      contact: '0796851497 | anastarayra12@gmail.com',
      summary: 'طالب هندسة برمجيات شغوف بتطوير مواقع وتطبيقات الويب الحديثة وتصميم واجهات المستخدم. أمتلك مهارات تحليلية وتصميمية متقدمة، وأعمل حالياً على تطوير خبراتي في تقنيات Full Stack عبر .NET.',
      skills: [
        { category: 'تطوير الواجهات', items: 'HTML5 (متقن)، JavaScript، React، Framer Motion' },
        { category: 'الخلفية وأطر العمل', items: '.NET Core Web API، C# (قيد التعلم)، Angular' },
        { category: 'الأدوات والذكاء الاصطناعي', items: 'Figma، VS Code، Git/GitHub، Photoshop، Antigravity' },
      ],
      education: [
        { degree: 'بكالوريوس هندسة البرمجيات', school: 'جامعة الزيتونة الأردنية', status: 'قيد الدراسة' },
      ],
      courses: [
        { title: 'دورة .NET Full Stack Development', status: 'قيد التعلم' },
        { title: 'دورة Angular Framework & TypeScript', status: 'قيد التعلم' },
        { title: 'دورة تصميم واجهات المستخدم UI/UX', status: 'مكتملة' },
      ],
    },
  };

  const currentCv = cvData[cvLang] || cvData.en;

  const handleCopyContact = () => {
    navigator.clipboard.writeText('anastarayra12@gmail.com | 0796851497');
    addToast(cvLang === 'ar' ? 'تم نسخ معلومات التواصل!' : 'Contact info copied to clipboard!', 'info');
  };

  const handleDownload = () => {
    const textContent = `ANAS TARAYRA - CURRICULUM VITAE
----------------------------------------
Name: ${currentCv.name}
Role: ${currentCv.role}
Education: ${currentCv.university}
Location: ${currentCv.location}
Contact: ${currentCv.contact}

SUMMARY:
${currentCv.summary}

SKILLS & COMPETENCIES:
${currentCv.skills.map((s) => `- ${s.category}: ${s.items}`).join('\n')}

COURSES & CERTIFICATIONS:
${currentCv.courses.map((c) => `- ${c.title} (${c.status})`).join('\n')}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Anas_Tarayra_CV_${cvLang.toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast(cvLang === 'ar' ? 'جاري تحميل السيرة الذاتية...' : 'Downloading CV file...', 'success');
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Modal Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{currentCv.name}</h2>
              <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '1rem', marginTop: '4px', margin: 0 }}>
                {currentCv.role}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setCvLang(cvLang === 'en' ? 'ar' : 'en')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                {cvLang === 'en' ? 'العربية' : 'English'}
              </button>

              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick info bar */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.875rem',
            }}
          >
            <div>
              <strong>{currentCv.university}</strong> — {currentCv.location}
            </div>
            <button
              onClick={handleCopyContact}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Copy size={14} />
              <span>{currentCv.contact}</span>
            </button>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>Executive Summary</span>
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {currentCv.summary}
            </p>
          </div>

          {/* Skills Breakdown */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>Skills & Competencies</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentCv.skills.map((skill, idx) => (
                <div key={idx} style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{skill.category}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{skill.items}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Education */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>Education & Certifications</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentCv.courses.map((course, idx) => (
                <div key={idx} style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{course.title}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button onClick={handleDownload} className="btn-primary">
              <Download size={18} />
              <span>Download CV (.txt)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
