import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

// 3D Tilt Card Component
const TiltCard = ({ children, className, style, onClick }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className={`glass-card cursor-pointer group relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Dummy projects for the bento grid
  const projects = [
    {
      id: 1,
      title: 'Ultimate Vibe Portfolio V2',
      category: 'fullstack',
      slug: 'portfolio-v2',
      colSpan: 'col-span-1 md:col-span-2',
      rowSpan: 'row-span-2',
      bgColor: 'bg-gradient-to-br from-[#042C53] to-[#185FA5]',
      image: null
    },
    {
      id: 2,
      title: 'E-Commerce Dashboard',
      category: 'uiux',
      slug: 'ecommerce',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
      bgColor: 'bg-gradient-to-br from-[#18181B] to-[#27272A]',
      image: null
    },
    {
      id: 3,
      title: 'Real-time Chat App',
      category: 'fullstack',
      slug: 'chat-app',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
      bgColor: 'bg-gradient-to-br from-[#27272A] to-[#042C53]',
      image: null
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  // In a real app, this would use a router navigation hook.
  // We'll simulate a custom event or a prop if we were passing it, but this component doesn't get navigateTo directly.
  // Let's dispatch a custom event that App.jsx can listen to, or we can just update the window location hash,
  // but since we built state routing in AppContent, we need to pass a context or dispatch an event.
  const handleProjectClick = (slug) => {
    const event = new CustomEvent('navigate-case-study', { detail: { slug } });
    window.dispatchEvent(event);
  };

  return (
    <section id="projects" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '16px' }}>
            <Sparkles size={16} />
            <span>Portfolio & Work</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '12px' }}>
            {lang === 'ar' ? 'المشاريع والأعمال' : 'Projects & Work'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'ar' ? 'معرض المشاريع البرمجية وتصاميم واجهات المستخدم.' : 'Showcase of software engineering projects and UI/UX designs.'}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '44px' }}>
          {[
            { key: 'all', label: lang === 'ar' ? 'جميع المشاريع' : 'All Projects' },
            { key: 'fullstack', label: 'Full Stack (.NET & Angular)' },
            { key: 'uiux', label: lang === 'ar' ? 'تصميم UI/UX' : 'UI/UX Design' },
            { key: 'graphic', label: lang === 'ar' ? 'تصميم Graphic' : 'Graphic Design' },
          ].map((tab) => (
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
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid / Coming Soon */}
        <div className="flex justify-center items-center py-24 px-4 bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)]">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              {lang === 'ar' ? 'سيتم إضافته قريباً 🚀' : 'Coming Soon 🚀'}
            </h3>
            <p className="text-[var(--text-secondary)] text-lg">
              {lang === 'ar' 
                ? 'أقوم حالياً بتجهيز وترتيب أفضل المشاريع لعرضها هنا بطريقة مميزة.'
                : 'I am currently preparing and curating my best projects to showcase here.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
