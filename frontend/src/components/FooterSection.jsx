import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnasLogo } from './AnasLogo';
import { AmmanClock } from './AmmanClock';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';

export const FooterSection = () => {
  const { lang, t } = useLanguage();

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects || (lang === 'ar' ? 'المشاريع' : 'Projects') },
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
        backgroundColor: 'transparent',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '50px',
        paddingBottom: '28px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Column 1: Small Logo & Intro */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a href="#home" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <AnasLogo size={24} showText={true} />
            </a>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {lang === 'ar'
                ? 'طالب هندسة برمجيات ومطور Full-Stack (.NET & Angular) ومصمم واجهات UI/UX.'
                : 'Software Engineering student, Full-Stack .NET & Angular Developer, and UI/UX Designer.'}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '30px', backgroundColor: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', color: 'var(--accent-green)', fontSize: '0.78rem', fontWeight: 700, width: 'fit-content' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
              <span>{lang === 'ar' ? 'متاح للمشاريع' : 'Available for Work'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {lang === 'ar' ? 'روابط التنقل' : 'Quick Links'}
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
                      fontWeight: 500,
                      transition: 'color 200ms ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {lang === 'ar' ? 'الخدمات والتخصصات' : 'Services'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {servicesList.map((srv, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & QR Code */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {lang === 'ar' ? 'التواصل والكرت الرقمي' : 'Contact & vCard'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} style={{ color: 'var(--accent-blue)' }} />
                <span>{lang === 'ar' ? 'عمان، الأردن' : 'Amman, Jordan'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--accent-blue)' }} />
                <a href="mailto:anastarayra12@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>
                  anastarayra12@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: 'var(--accent-green)' }} />
                <a href="https://wa.me/962796851497" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontWeight: 700 }}>
                  +962 7 9685 1497
                </a>
              </div>

              {/* Dynamic vCard QR Code */}
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-color)', width: 'fit-content' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=${encodeURIComponent('BEGIN:VCARD\nVERSION:3.0\nN:Al-Tarayrah;Anas\nFN:Anas Al-Tarayrah\nTITLE:Full-Stack Developer & UI/UX Designer\nTEL;TYPE=CELL:+962796851497\nEMAIL:anastarayra12@gmail.com\nEND:VCARD')}&color=3b82f6&bgcolor=0b0b0b`}
                  alt="Anas vCard QR Code"
                  style={{ width: '56px', height: '56px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {lang === 'ar' ? 'امسح لحفظ جهة الاتصال' : 'Scan to Save vCard'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'اسم، هاتف، إيميل مباشرة لهاتفك' : 'Direct contact to phone'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Single Line Bottom Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div>
            © 2025 Anas Al-Tarayrah. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <AmmanClock />
            <a
              href="https://wa.me/962796851497"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              title="WhatsApp"
            >
              <MessageSquare size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
