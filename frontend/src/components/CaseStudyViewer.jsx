import React, { useState, Suspense, lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useProjectsStore } from '../store/useProjectsStore';
import { ArrowLeft, ArrowRight, Clock, UserCheck, Wrench, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const LaptopMockup3D = lazy(() => import('./LaptopMockup3D'));

export const CaseStudyViewer = ({ slug, onBack }) => {
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';
  const { getProjectBySlug, getAdjacentProjects } = useProjectsStore();
  const [loadedImages, setLoadedImages] = useState({});

  const project = getProjectBySlug(slug);
  const { prev: prevProject, next: nextProject } = getAdjacentProjects(slug);

  const handleImageLoad = (idx) => {
    setLoadedImages((p) => ({ ...p, [idx]: true }));
  };

  const handleNavigateSlug = (targetSlug) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const event = new CustomEvent('navigate-case-study', { detail: { slug: targetSlug } });
    window.dispatchEvent(event);
  };

  if (!project) return null;

  const projectTitle = typeof project.title === 'object' ? project.title[lang] || project.title.en : project.title;
  const projectRole = typeof project.role === 'object' ? project.role[lang] || project.role.en : project.role;
  const projectDuration = typeof project.duration === 'object' ? project.duration[lang] || project.duration.en : project.duration;
  const projectProblem = typeof project.problem === 'object' ? project.problem[lang] || project.problem.en : project.problem;

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '40px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Navigation Back Button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="btn-outline"
          style={{ marginBottom: '32px', padding: '10px 20px', fontSize: '0.9rem' }}
        >
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          <span>{isRTL ? 'العودة لجميع المشاريع' : 'Back to Projects'}</span>
        </motion.button>

        {/* 1. Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="tech-pill">{tag}</span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.2 }}>
            {projectTitle}
          </h1>

          {/* Large Main Hero Image + 3D Overlay */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '380px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
            <img
              src={project.image}
              alt={projectTitle}
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            />
            
            {/* 3D Decorative Canvas Layer (Loaded via Suspense) */}
            <div style={{ position: 'absolute', bottom: '10px', right: isRTL ? 'auto' : '10px', left: isRTL ? '10px' : 'auto', width: '260px', opacity: 0.85, pointerEvents: 'none' }}>
              <Suspense fallback={<div className="skeleton" style={{ width: '100%', height: '140px' }} />}>
                <LaptopMockup3D />
              </Suspense>
            </div>
          </div>
        </motion.div>

        {/* 2. Overview Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            padding: '24px 32px',
            borderRadius: '20px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            marginBottom: '56px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <UserCheck size={16} />
              <span>{isRTL ? 'الدور (Role)' : 'Role'}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{projectRole}</div>
          </div>

          <div style={{ borderLeft: isRTL ? 'none' : '1px solid var(--border-color)', borderRight: isRTL ? '1px solid var(--border-color)' : 'none', paddingLeft: isRTL ? 0 : '24px', paddingRight: isRTL ? '24px' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <Clock size={16} />
              <span>{isRTL ? 'المدة (Duration)' : 'Duration'}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{projectDuration}</div>
          </div>

          <div style={{ borderLeft: isRTL ? 'none' : '1px solid var(--border-color)', borderRight: isRTL ? '1px solid var(--border-color)' : 'none', paddingLeft: isRTL ? 0 : '24px', paddingRight: isRTL ? '24px' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <Wrench size={16} />
              <span>{isRTL ? 'الأدوات (Tools)' : 'Tools Used'}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.tools.join(' • ')}</div>
          </div>
        </motion.div>

        {/* 3. Problem / Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: '56px' }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} style={{ color: 'var(--accent-blue)' }} />
            <span>{isRTL ? 'التحدي والمشكلة (Problem & Challenge)' : 'The Challenge'}</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '850px' }}>
            {projectProblem}
          </p>
        </motion.div>

        {/* 4. Process Section */}
        {project.process && project.process.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35 }}
            style={{ marginBottom: '56px' }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>
              {isRTL ? 'خطوات وسير العمل (Process & Workflow)' : 'Development Process'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {project.process.map((stepItem, idx) => {
                const stepTitle = typeof stepItem.title === 'object' ? stepItem.title[lang] || stepItem.title.en : stepItem.title;
                const stepDesc = typeof stepItem.desc === 'object' ? stepItem.desc[lang] || stepItem.desc.en : stepItem.desc;
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderTop: '3px solid var(--accent-blue)' }}
                  >
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>
                      {stepItem.step}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {stepTitle}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {stepDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 5. Solution Section Grid with Skeleton Placeholders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: '56px' }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>
            {isRTL ? 'الحل البرمجي والتصميم (Solution & Screenshots)' : 'The Solution'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {project.solutionScreenshots.map((imgSrc, idx) => (
              <div key={idx} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', minHeight: '300px' }}>
                {!loadedImages[idx] && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
                <img
                  loading="lazy"
                  src={imgSrc}
                  alt={`Screenshot ${idx + 1}`}
                  onLoad={() => handleImageLoad(idx)}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: loadedImages[idx] ? 1 : 0,
                    transition: 'opacity 300ms ease',
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* 6. Result Section */}
        {project.result && project.result.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35 }}
            style={{ marginBottom: '64px' }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>
              {isRTL ? 'النتائج والأداء (Results & Impact)' : 'Results & Impact'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {project.result.map((res, idx) => {
                const resLabel = typeof res.label === 'object' ? res.label[lang] || res.label.en : res.label;
                return (
                  <div key={idx} className="glass-card" style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '6px' }}>
                      {res.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {resLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 7. Bottom Project Navigation */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Previous Project Button */}
          <button
            onClick={() => handleNavigateSlug(prevProject.slug)}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              textAlign: isRTL ? 'right' : 'left',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            {isRTL ? <ChevronRight size={24} style={{ color: 'var(--accent-blue)' }} /> : <ChevronLeft size={24} style={{ color: 'var(--accent-blue)' }} />}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, uppercase: 'true' }}>
                {isRTL ? 'المشروع السابق' : 'Previous Project'}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {typeof prevProject.title === 'object' ? prevProject.title[lang] || prevProject.title.en : prevProject.title}
              </div>
            </div>
          </button>

          {/* Next Project Button */}
          <button
            onClick={() => handleNavigateSlug(nextProject.slug)}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              textAlign: isRTL ? 'left' : 'right',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, uppercase: 'true' }}>
                {isRTL ? 'المشروع التالي' : 'Next Project'}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {typeof nextProject.title === 'object' ? nextProject.title[lang] || nextProject.title.en : nextProject.title}
              </div>
            </div>
            {isRTL ? <ChevronLeft size={24} style={{ color: 'var(--accent-blue)' }} /> : <ChevronRight size={24} style={{ color: 'var(--accent-blue)' }} />}
          </button>
        </div>

      </div>
    </div>
  );
};
