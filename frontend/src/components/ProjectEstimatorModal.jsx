import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, Check, Clock, Sparkles, MessageCircle, Layers, Palette, Code2, Database, ShieldCheck, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProjectEstimatorModal = ({ isOpen, onClose, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  const [selectedProjectType, setSelectedProjectType] = useState('fullstack');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'database', 'uiux']);

  // Comprehensive Project Types (Full-Stack, UI/UX, Graphic Design, Backend, Mobile, E-Commerce)
  const projectTypes = [
    {
      id: 'fullstack',
      label: lang === 'ar' ? 'تطبيق كامل (Full-Stack .NET + React)' : 'Full-Stack (.NET + React/Angular)',
      minDays: 10,
      maxDays: 16,
      icon: Code2,
    },
    {
      id: 'uiux',
      label: lang === 'ar' ? 'تصميم واجهات وتجارب (UI/UX Figma System)' : 'UI/UX Design & Prototype (Figma)',
      minDays: 5,
      maxDays: 8,
      icon: Layers,
    },
    {
      id: 'branding',
      label: lang === 'ar' ? 'تصميم هوية بصرية وغرافيك (Branding & Graphic Design)' : 'Graphic Design & Brand Identity',
      minDays: 3,
      maxDays: 6,
      icon: Palette,
    },
    {
      id: 'api',
      label: lang === 'ar' ? 'واجهات خلفية وقواعد بيانات (.NET Web API)' : 'Backend Web API & Database (.NET Core)',
      minDays: 6,
      maxDays: 10,
      icon: Database,
    },
    {
      id: 'ecommerce',
      label: lang === 'ar' ? 'متجر إلكتروني وبوابة دفع (E-Commerce Portal)' : 'E-Commerce Platform & Checkout',
      minDays: 12,
      maxDays: 18,
      icon: Cpu,
    },
  ];

  // Comprehensive Features List
  const featureOptions = [
    {
      id: 'auth',
      label: lang === 'ar' ? 'نظام أمان وتنسيق صلاحيات (JWT Auth & Security)' : 'Advanced Auth & User Roles (JWT)',
      minDays: 2,
      maxDays: 3,
    },
    {
      id: 'database',
      label: lang === 'ar' ? 'قواعد بيانات سريعة (SQL Server / PostgreSQL)' : 'Relational Database Architecture',
      minDays: 2,
      maxDays: 4,
    },
    {
      id: 'uiux',
      label: lang === 'ar' ? 'تصميم واجهات احترافي ومخصص (Custom UI/UX)' : 'Custom Modern Glassmorphism UI',
      minDays: 3,
      maxDays: 5,
    },
    {
      id: 'ai',
      label: lang === 'ar' ? 'تكامل الذكاء الاصطناعي والشات بوت (AI Assistance)' : 'AI Integration & Chatbot Assistant',
      minDays: 3,
      maxDays: 6,
    },
    {
      id: 'branding',
      label: lang === 'ar' ? 'تصميم شعار ودليل هوية بصري (Logo & Graphic Pack)' : 'Logo Design & Brand Guidelines',
      minDays: 2,
      maxDays: 4,
    },
    {
      id: 'multilang',
      label: lang === 'ar' ? 'دعم اللغات والوضع الداكن/النهاري (Multi-Lang & Dark Mode)' : 'Multi-Language RTL & Dark Mode',
      minDays: 1,
      maxDays: 3,
    },
    {
      id: 'dashboard',
      label: lang === 'ar' ? 'لوحة تحكم وتنقيب بيانات (Admin Dashboard)' : 'Admin Management Dashboard',
      minDays: 4,
      maxDays: 7,
    },
    {
      id: 'seo',
      label: lang === 'ar' ? 'تهيئة محركات البحث والأداء الفائق (SEO & High Performance)' : 'SEO & Performance Optimization',
      minDays: 1,
      maxDays: 2,
    },
  ];

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate Range
  const selectedTypeObj = projectTypes.find((p) => p.id === selectedProjectType) || projectTypes[0];
  let totalMin = selectedTypeObj.minDays;
  let totalMax = selectedTypeObj.maxDays;

  selectedFeatures.forEach((fId) => {
    const fObj = featureOptions.find((opt) => opt.id === fId);
    if (fObj) {
      totalMin += fObj.minDays;
      totalMax += fObj.maxDays;
    }
  });

  const handleSendBrief = () => {
    const pLabel = selectedTypeObj.label;
    const fLabels = selectedFeatures
      .map((fId) => featureOptions.find((opt) => opt.id === fId)?.label)
      .join('\n• ');

    const msg = `مرحباً أنس الطرايرة 👋\nأود الاستفسار عن تفاصيل مشروع جديد:\n\n📌 نوع المشروع: ${pLabel}\n\n🛠️ المزايا المطلوبة:\n• ${fLabels}\n\n⏱️ المدة التقديرية لإنجاز العمل: بين ${totalMin} إلى ${totalMax} يوم عمل.`;

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
    if (onWhatsAppSent) {
      setTimeout(() => {
        onWhatsAppSent();
      }, 400);
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
                backgroundColor: 'rgba(59, 130, 246, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <Calculator size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {lang === 'ar' ? 'حاسبة موعد المشروع التقديري' : 'Comprehensive Project Scope Estimator'}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {lang === 'ar' ? 'اختر مجالات ونطاق مشروعك للحصول على الجدول الزمني المتوقع' : 'Select domain, UI/UX & features for custom delivery roadmap'}
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

            {/* Scrollable Content Body */}
            <div style={{ padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Step 1: Project Domain & Type */}
              <div>
                <label style={{ fontSize: '0.95rem', fontWeight: 800, display: 'block', marginBottom: '14px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? '1. اختر مجال ونوع المشروع:' : '1. Select Project Domain & Type:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {projectTypes.map((pt) => {
                    const IconComp = pt.icon;
                    const isSelected = selectedProjectType === pt.id;
                    return (
                      <div
                        key={pt.id}
                        onClick={() => setSelectedProjectType(pt.id)}
                        style={{
                          padding: '16px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-primary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <IconComp size={20} style={{ color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700 }}>
                            {pt.minDays}-{pt.maxDays} {lang === 'ar' ? 'أيام' : 'days'}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.3, color: 'var(--text-primary)' }}>
                          {pt.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Comprehensive Features */}
              <div>
                <label style={{ fontSize: '0.95rem', fontWeight: 800, display: 'block', marginBottom: '14px', color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? '2. المزايا والمتطلبات الإضافية (اختر ما يناسبك):' : '2. Desired Additional Features & Scope:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {featureOptions.map((opt) => {
                    const isSelected = selectedFeatures.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleFeature(opt.id)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '14px',
                          border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                          {opt.label}
                        </span>
                        <div
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '6px',
                            backgroundColor: isSelected ? 'var(--accent-blue)' : 'transparent',
                            border: isSelected ? 'none' : '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                            flexShrink: 0,
                            marginLeft: '8px',
                          }}
                        >
                          {isSelected && <Check size={14} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Result Summary Card & WhatsApp Action */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
                  border: '1.5px solid rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '6px' }}>
                    {lang === 'ar' ? 'المدة التقديرية المتوقعة لإنجاز العمل' : 'Estimated Delivery Timeline Range'}
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={26} style={{ color: 'var(--accent-blue)' }} />
                    <span>
                      {lang === 'ar' ? `بين ${totalMin} إلى ${totalMax} يوم عمل` : `Between ${totalMin} to ${totalMax} working days`}
                    </span>
                  </div>
                </div>

                {/* Ultra-Stunning WhatsApp Action Button */}
                <motion.button
                  onClick={handleSendBrief}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    padding: '14px 26px',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <MessageCircle size={22} />
                  <span>{lang === 'ar' ? 'إرسال الملخص للمطور عبر واتساب' : 'Send Brief to Anas via WhatsApp'}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
