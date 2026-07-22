import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { AnasLogo } from './AnasLogo';
import { AmmanClock } from './AmmanClock';
import { Mail, Phone, MapPin, Calculator, Zap, MessageSquare, ArrowUp, CheckCircle2, Heart } from 'lucide-react';

export const FooterSection = ({ onOpenEstimator, onOpenDirectModal }) => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects || (lang === 'ar' ? 'المشاريع' : 'Projects') },
    { href: '#courses', label: t.nav.services || (lang === 'ar' ? 'الخدمات' : 'Services') },
    { href: '#contact', label: t.nav.contact },
  ];

  const servicesList = [
    lang === 'ar' ? 'تطوير تطبيقات Full-Stack (.NET & Angular)' : 'Full-Stack (.NET & Angular) Development',
    lang === 'ar' ? 'تصميم واجهات وتجارب المستخدم (UI/UX Figma)' : 'UI/UX Design & Figma Systems',
    lang === 'ar' ? 'تصميم الهويات البصرية والشعارات (Branding)' : 'Graphic Design & Brand Identity',
    lang === 'ar' ? 'بناء واجهات خلفية وقواعد بيانات (APIs & SQL)' : 'RESTful Web APIs & SQL Server',
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '70px',
        paddingBottom: '32px',
        position: 'relative',
        transition: 'background-color 250ms ease',
      }}
    >
      <div className="container">
        {/* Main Footer Multi-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Brand & Personal Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <a href="#home" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <AnasLogo size="md" />
            </a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {lang === 'ar'
                ? 'طالب هندسة برمجيات في جامعة الزيتونة الأردنية ومطور Full-Stack (.NET & Angular) ومصمم واجهات UI/UX وجرافيك متمرس.'
                : 'Software Engineering student at Alzaytoonah University, Full-Stack .NET & Angular Developer, and UI/UX & Graphic Designer.'}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', backgroundColor: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 700, width: 'fit-content' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
              <span>{lang === 'ar' ? 'متاح للعمل على المشاريع' : 'Available for Projects'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-blue)', width: 'fit-content', paddingBottom: '4px' }}>
              {lang === 'ar' ? 'روابط التنقل السريعة' : 'Quick Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'color 200ms ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    <span>›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Capabilities */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-green)', width: 'fit-content', paddingBottom: '4px' }}>
              {lang === 'ar' ? 'تخصصات وخدمات المطور' : 'Services & Solutions'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {servicesList.map((srv, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Action Buttons */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-blue)', width: 'fit-content', paddingBottom: '4px' }}>
              {lang === 'ar' ? 'التواصل والطلبات السريعة' : 'Direct Actions & Contact'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-blue)' }} />
                <span>{lang === 'ar' ? 'عمان، الأردن (Amman, Jordan)' : 'Amman, Jordan'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--accent-blue)' }} />
                <a href="mailto:anastarayra11@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700 }}>
                  anastarayra11@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--accent-green)' }} />
                <a href="https://wa.me/962796851497" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontWeight: 800 }}>
                  +962 7 9685 1497
                </a>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={onOpenEstimator}
                className="btn-primary"
                style={{ padding: '10px 16px', fontSize: '0.85rem', justifyContent: 'center', borderRadius: '10px' }}
              >
                <Calculator size={16} />
                <span>{lang === 'ar' ? 'حساب موعد المشروع' : 'Calculate Scope'}</span>
              </button>

              <button
                onClick={onOpenDirectModal}
                style={{
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={16} />
                <span>{lang === 'ar' ? 'بدء وتأكيد مشروع مباشر' : 'Start Project Directly'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div>
            © {new Date().getFullYear()}{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'أنس الطرايرة (Anas Al-Tarayrah)' : 'Anas Al-Tarayrah'}
            </strong>
            . {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <AmmanClock />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href="https://wa.me/962796851497"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', transition: 'color 200ms ease' }}
                title="WhatsApp"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
