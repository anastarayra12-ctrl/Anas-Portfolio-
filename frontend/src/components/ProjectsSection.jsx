import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

export const ProjectsSection = () => {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});
  const shouldReduceMotion = useReducedMotion();

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const projects = [
    {
      id: 1,
      title: 'Ultimate Vibe Portfolio',
      category: 'fullstack',
      slug: 'portfolio-v2',
      image: '/courses/vibe_coding.jpg',
      description: lang === 'ar' 
        ? 'تصميم وبناء موقع شخصي متكامل بأحدث التقنيات مع تأثيرات بصرية ثلاثية الأبعاد.' 
        : 'Design and build a complete personal portfolio using latest technologies with 3D visual effects.',
    },
    {
      id: 2,
      title: 'E-Commerce Dashboard',
      category: 'uiux',
      slug: 'ecommerce',
      image: '/courses/uiux_udemy.jpg',
      description: lang === 'ar' 
        ? 'لوحة تحكم احترافية لمتاجر التجارة الإلكترونية لإدارة المنتجات والمبيعات بفعالية.' 
        : 'Professional dashboard for e-commerce stores to manage products and sales efficiently.',
    },
    {
      id: 3,
      title: 'Real-time Chat App',
      category: 'fullstack',
      slug: 'chat-app',
      image: '/courses/fullstack_dotnet.jpg',
      description: lang === 'ar' 
        ? 'تطبيق محادثة فورية مع تشفير كامل للبيانات وتجربة مستخدم سلسة كالبرق.' 
        : 'Real-time chat application with end-to-end encryption and lightning fast UX.',
    },
    {
      id: 4,
      title: 'Fintech Mobile App',
      category: 'uiux',
      slug: 'fintech',
      image: '/courses/uiux_workshop.jpg',
      description: lang === 'ar' 
        ? 'تصميم واجهة مستخدم لتطبيق مالي مبتكر يسهل العمليات المصرفية.' 
        : 'UI design for an innovative financial application simplifying banking operations.',
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  const handleProjectClick = (slug) => {
    const event = new CustomEvent('navigate-case-study', { detail: { slug } });
    window.dispatchEvent(event);
  };

  const filterTabsList = [
    { key: 'all', label: lang === 'ar' ? 'جميع المشاريع' : 'All Projects' },
    { key: 'fullstack', label: 'Full Stack (.NET & Angular)' },
    { key: 'uiux', label: lang === 'ar' ? 'تصميم UI/UX' : 'UI/UX Design' },
    { key: 'graphic', label: lang === 'ar' ? 'تصميم Graphic' : 'Graphic Design' },
  ];

  return (
    <section id="projects" style={{ borderTop: '1px solid var(--border-color)', paddingBottom: '120px', paddingTop: '80px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'المشاريع والأعمال' : 'Portfolio & Work'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'المشاريع والأعمال' : 'Projects & Work'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
            {lang === 'ar' 
              ? 'معرض يضم أبرز المنظومات الرقمية والمشاريع البرمجية التي قمت بهندستها وتصميمها كـ Full-Stack Developer ومصمم UI/UX.'
              : 'Showcase of software applications and digital products engineered and designed with high performance and pixel-perfect UI/UX.'}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {filterTabsList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: selectedFilter === tab.key ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                backgroundColor: selectedFilter === tab.key ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                color: selectedFilter === tab.key ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px',
              }}
            >
              <Sparkles size={15} style={{ opacity: selectedFilter === tab.key ? 1 : 0.6 }} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Stacked Cards Container */}
        <div style={{ position: 'relative' }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                style={{
                  position: 'sticky',
                  top: `calc(100px + ${index * 30}px)`, 
                  marginBottom: index === filteredProjects.length - 1 ? '0' : '10vh', 
                  zIndex: index, 
                }}
              >
                <MagneticElement strength={0.15} style={{ width: '100%' }}>
                  <motion.div
                    onClick={() => handleProjectClick(project.slug)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      borderRadius: '28px',
                      minHeight: '380px',
                      padding: '36px',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 -15px 40px rgba(0,0,0,0.4)', 
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    {/* Image Skeleton placeholder until loaded */}
                    {!loadedImages[project.id] && (
                      <div className="skeleton" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
                    )}

                    {/* Real Image */}
                    <img
                      loading="lazy"
                      src={project.image}
                      alt={project.title}
                      onLoad={() => handleImageLoad(project.id)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        transition: 'opacity 300ms ease',
                        opacity: loadedImages[project.id] ? 1 : 0,
                      }}
                    />

                    {/* Dark Overlay Gradient for text readability */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(9, 9, 11, 0.92) 0%, rgba(9, 9, 11, 0.55) 50%, rgba(9, 9, 11, 0.25) 100%)',
                        zIndex: 2,
                      }}
                    />

                    {/* Top content: Category & Icon */}
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{
                        padding: '6px 16px',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backdropFilter: 'blur(8px)',
                      }}>
                        {project.category}
                      </div>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      }}>
                        <ArrowUpRight size={22} />
                      </div>
                    </div>

                    {/* Bottom content: Title & Description */}
                    <div style={{ position: 'relative', zIndex: 3, marginTop: 'auto', paddingTop: '40px' }}>
                      <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.2 }}>
                        {project.title}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}>
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </MagneticElement>
              </div>
            ))
          ) : (
            <motion.div 
              style={{ padding: '60px 24px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                {lang === 'ar' ? 'لا توجد مشاريع في هذا القسم حالياً.' : 'No projects in this category currently.'}
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
