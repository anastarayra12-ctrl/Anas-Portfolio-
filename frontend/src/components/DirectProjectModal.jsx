import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Zap, Code2, Layers, Palette, Database, Cpu, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DirectProjectModal = ({ isOpen, onClose, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  const [projectType, setProjectType] = useState('fullstack');
  const [details, setDetails] = useState('');
  const [timeline, setTimeline] = useState('standard');
  const [clientName, setClientName] = useState('');

  const projectTypes = [
    { id: 'fullstack', label: lang === 'ar' ? 'تطبيق Full-Stack (.NET & Angular)' : 'Full-Stack App (.NET & Angular)', icon: Code2 },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات وتجارب (UI/UX Figma)' : 'UI/UX Design System', icon: Layers },
    { id: 'branding', label: lang === 'ar' ? 'تصميم هوية وجرافيك (Branding)' : 'Graphic & Brand Identity', icon: Palette },
    { id: 'api', label: lang === 'ar' ? 'واجهات خلفية (.NET Web API & SQL)' : 'Backend REST API & DB', icon: Database },
    { id: 'ecommerce', label: lang === 'ar' ? 'متجر إلكتروني وبوابة دفع' : 'E-Commerce Platform', icon: Cpu },
    { id: 'custom', label: lang === 'ar' ? 'مشروع مخصص / آخر' : 'Custom Special Project', icon: Zap },
  ];

  const timelines = [
    { id: 'urgent', label: lang === 'ar' ? '⚡ عاجل (خلال أيام قليلة)' : '⚡ Urgent (Few Days)' },
    { id: 'standard', label: lang === 'ar' ? '⏱️ قياسي (من أسبوع لأسابيع)' : '⏱️ Standard (1-2 Weeks)' },
    { id: 'flexible', label: lang === 'ar' ? '📅 مرن (حسب ما يراه المطور)' : '📅 Flexible Timeline' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const typeLabel = projectTypes.find((p) => p.id === projectType)?.label;
    const timeLabel = timelines.find((t) => t.id === timeline)?.label;

    const msg = `مرحباً أنس الطرايرة 👋
أود بدء وتأكيد العمل معك بخصوص مشروع جديد:

📌 اسم العميل / الجهة: ${clientName || 'عميل مهتم'}
🛠️ نوع وتخصص المشروع: ${typeLabel}
⏱️ الإطار الزمني المطلوب: ${timeLabel}

📝 التفاصيل والمتطلبات الخاصة:
${details || 'لا يوجد تفاصيل إضافية مكتوبة.'}

بانتظار ردك للبدء مباشرة وتحديد أولويات التنفيذ!`;

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
    if (onWhatsAppSent) {
      setTimeout(() => onWhatsAppSent(), 400);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 95vw)',
              maxHeight: '90vh',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '22px 28px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <Zap size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {lang === 'ar' ? 'بدء وتأكيد مشروع جديد المباشر' : 'Direct Project Order & Confirmation'}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {lang === 'ar' ? 'حدد متطلبات واحتياجات مشروعك للبدء الفوري مع أنس' : 'Specify your exact requirements to start directly with Anas'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} style={{ padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Client Name */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? 'الاسم أو الشركة / الجهة:' : 'Your Name or Organization:'}
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل اسمك الكريم...' : 'Enter your name...'}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Step 1: Select Project Type */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? '1. اختر نوع وتخصص المشروع:' : '1. Select Project Type:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {projectTypes.map((pt) => {
                    const IconComp = pt.icon;
                    const isSelected = projectType === pt.id;
                    return (
                      <div
                        key={pt.id}
                        onClick={() => setProjectType(pt.id)}
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <IconComp size={18} style={{ color: isSelected ? 'var(--accent-green)' : 'var(--text-secondary)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {pt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Detailed Text Requirements */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? '2. ما هي المتطلبات والتفاصيل المطلوبة بالضبط؟' : '2. Describe Your Exact Requirements:'}
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'اكتب هنا ما تريده في مشروعك (مثال: أود موقع إلكتروني يتكون من 4 صفحات مع لوحة تحكم وتصميم هادي باللغتين...)'
                      : 'Write your project details and specific requirements here...'
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Step 3: Preferred Timeline */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? '3. الإطار الزمني المفضل للتنفيذ:' : '3. Preferred Timeline:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {timelines.map((tm) => {
                    const isSelected = timeline === tm.id;
                    return (
                      <div
                        key={tm.id}
                        onClick={() => setTimeline(tm.id)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid var(--accent-green)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-primary)',
                          cursor: 'pointer',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          textAlign: 'center',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {tm.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                  marginTop: '10px',
                }}
              >
                <MessageSquare size={20} />
                <span>{lang === 'ar' ? 'تأكيد وإرسال تفاصيل المشروع عبر واتساب' : 'Confirm & Send Details via WhatsApp'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
