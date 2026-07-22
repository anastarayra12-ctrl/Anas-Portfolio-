import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Code2, Palette, Layers, Database, Sparkles, Calculator, CheckCircle2, ArrowRight, Clock, Zap } from 'lucide-react';

export const CoursesSection = ({ onOpenEstimator, onOpenDirectModal }) => {
  const { lang } = useLanguage();

  const servicesList = [
    {
      id: 'fullstack',
      icon: Code2,
      title: lang === 'ar' ? 'تطوير تطبيقات ومواقع متكاملة (Full-Stack)' : 'Full-Stack Web App Development',
      badge: '.NET Core & Angular',
      description: lang === 'ar' ? 'بناء مواقع وتطبيقات رقمية متكاملة وعالية الأمان من الصفر باستخدام C# و .NET Core وقواعد بيانات SQL Server مع واجهات تفاعلية.' : 'End-to-end web apps with C#, ASP.NET Core Web APIs, SQL Server, and Angular frontends.',
      color: '#3B82F6',
    },
    {
      id: 'uiux',
      icon: Layers,
      title: lang === 'ar' ? 'تصميم واجهات وتجارب المستخدم (UI/UX)' : 'UI/UX Design & Prototyping',
      badge: 'Figma Design Tokens',
      description: lang === 'ar' ? 'تصميم واجهات مستخدم مخصصة في Figma تعزز تجربة المستخدم وتحول الأفكار إلى نماذج تفاعلية مذهلة.' : 'High-fidelity wireframes, interactive component systems, and dark-mode native design in Figma.',
      color: '#818CF8',
    },
    {
      id: 'graphic',
      icon: Palette,
      title: lang === 'ar' ? 'تصميم الجرافيك والهويات البصرية (Branding)' : 'Graphic Design & Brand Identity',
      badge: 'Photoshop & Branding',
      description: lang === 'ar' ? 'ابتكار الشعارات الهندسية، الهويات البصرية، والتصاميم المخصصة التي تمنح مشروعك حضوراً بصرياً فريداً.' : 'Professional logo design, visual branding manuals, typography, and graphic media.',
      color: '#EC4899',
    },
    {
      id: 'api',
      icon: Database,
      title: lang === 'ar' ? 'بناء واجهات برمجية وقواعد بيانات (APIs)' : 'RESTful APIs & Database Systems',
      badge: 'SQL Server Architecture',
      description: lang === 'ar' ? 'تصميم خوادم خلفية وقواعد بيانات سريعة تضمن استقرار ونمو نظامك الرقمي بدون تعقيد.' : 'Secure backend RESTful APIs, database schema architecture, and seamless system integrations.',
      color: '#10B981',
    },
  ];

  const whyChooseUs = [
    lang === 'ar' ? 'جمع احترافي بين هندسة البرمجيات والتصميم (Developer + Designer)' : 'Unique combo of Software Engineering & UI/UX Design',
    lang === 'ar' ? 'حساب دقيق للمواعيد وتسليم المشاريع في الوقت المحدد' : 'Accurate timeline calculation & guaranteed delivery',
    lang === 'ar' ? 'كود برمجي نظيف وآمن قابل للتوسع مستقبلاً' : 'Clean, scalable, and secure architecture',
  ];

  return (
    <section id="courses" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color 250ms ease' }}>
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'الخدمات والحلول المتاحة' : 'Services & Solutions'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {lang === 'ar' ? 'خدماتي الرقمية لمشروعك' : 'Digital Services & Solutions'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            {lang === 'ar' ? 'حلول هندسية وتصميمية متكاملة تحول أفكارك إلى واقع رقمي مبهر.' : 'Comprehensive engineering and UI/UX solutions to bring your vision to life.'}
          </p>
        </motion.div>

        {/* Tall Vertical Side-by-Side Services Grid requested by user */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px', marginBottom: '64px' }}>
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px',
                  borderTop: `4px solid ${service.color}`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: `${service.color}15`,
                        color: service.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={26} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', backgroundColor: 'var(--bg-primary)', color: service.color, border: '1px solid var(--border-color)' }}>
                      {service.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.35, color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ultra-Stunning Project Delivery Time Calculator CTA Box */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            padding: '44px 36px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
            border: '2px solid var(--accent-blue)',
            boxShadow: '0 24px 60px rgba(59, 130, 246, 0.18)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '14px' }}>
              <Clock size={16} />
              <span>{lang === 'ar' ? 'أداة تقدير الموعد التفاعلية' : 'Interactive Delivery Timeline Estimator'}</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25 }}>
              {lang === 'ar' ? 'احسب الوقت والمدّة المتوقعة لإنجاز مشروعك الآن' : 'Calculate Your Project Delivery Timeline'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {whyChooseUs.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', width: '100%' }}>
              {/* Button 1: Calculate Project Scope */}
              <motion.button
                onClick={onOpenEstimator}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{
                  padding: '16px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '16px',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                  textAlign: 'center',
                }}
              >
                <Calculator size={20} />
                <span>{lang === 'ar' ? 'حساب موعد المشروع' : 'Calculate Scope'}</span>
              </motion.button>

              {/* Button 2: Direct Project Confirmation & Detailed Specification Modal */}
              <motion.button
                onClick={onOpenDirectModal}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '16px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <Zap size={20} />
                <span>{lang === 'ar' ? 'بدء وتأكيد مشروع مباشر' : 'Start Project Directly'}</span>
              </motion.button>
            </div>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Clock size={14} style={{ color: 'var(--accent-green)' }} />
              <span>{lang === 'ar' ? 'استجابة فورية ومباشرة لحساب أو بدء مشروعك' : 'Instant calculation or direct project confirmation'}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


