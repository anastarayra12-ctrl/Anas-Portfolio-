import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FolderGit2, Sparkles } from 'lucide-react';

export const ProjectsSection = () => {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');

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

        {/* Projects Section Empty State requested by user (Vertical Stack Layout) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <div
            className="glass-card"
            style={{
              padding: '54px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              width: '100%',
              maxWidth: '720px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
              }}
            >
              <FolderGit2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'لا يوجد مشاريع مضافة حالياً' : 'No Projects Added Yet'}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
              {lang === 'ar' ? 'سيتم توثيق ورفع المشاريع والنماذج قريباً في هذا المعرض بشكل مرتب وتحت بعضها مباشرة.' : 'Projects showcase will be populated and published here soon.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
