import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, Check, MessageCircle, FileText, User, CreditCard, AlignLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProjectEstimatorModal = ({ isOpen, onClose, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  
  // State for Stepper
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    projectType: 'fullstack',
    features: [],
    budget: '',
    description: ''
  });

  // Project Types
  const projectTypes = [
    { id: 'fullstack', label: lang === 'ar' ? 'تطبيق كامل (Full-Stack .NET + React)' : 'Full-Stack App (.NET + React/Angular)' },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات وتجارب (UI/UX Figma)' : 'UI/UX Design & Prototype' },
    { id: 'branding', label: lang === 'ar' ? 'تصميم هوية بصرية (Branding)' : 'Graphic Design & Brand Identity' },
    { id: 'api', label: lang === 'ar' ? 'واجهات خلفية وقواعد بيانات (.NET Web API)' : 'Backend Web API & Database' },
    { id: 'ecommerce', label: lang === 'ar' ? 'متجر إلكتروني (E-Commerce)' : 'E-Commerce Platform' },
  ];

  // Features
  const featureOptions = [
    { id: 'auth', label: lang === 'ar' ? 'نظام أمان وصلاحيات (Auth)' : 'Auth & Security' },
    { id: 'database', label: lang === 'ar' ? 'قواعد بيانات متقدمة' : 'Advanced Database' },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات مخصص' : 'Custom UI Design' },
    { id: 'ai', label: lang === 'ar' ? 'تكامل الذكاء الاصطناعي' : 'AI Integration' },
    { id: 'multilang', label: lang === 'ar' ? 'دعم لغات متعددة' : 'Multi-Language Support' },
    { id: 'dashboard', label: lang === 'ar' ? 'لوحة تحكم (Admin Panel)' : 'Admin Dashboard' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (id) => {
    if (formData.features.includes(id)) {
      setFormData((prev) => ({ ...prev, features: prev.features.filter((f) => f !== id) }));
    } else {
      setFormData((prev) => ({ ...prev, features: [...prev.features, id] }));
    }
  };

  const handleSendBrief = () => {
    const pLabel = projectTypes.find((p) => p.id === formData.projectType)?.label || '';
    const fLabels = formData.features
      .map((fId) => featureOptions.find((opt) => opt.id === fId)?.label)
      .join('\n• ');

    const msg = `مرحباً أنس الطرايرة 👋\nلقد قرأت الشروط والقواعد وأوافق عليها.\nأود الاستفسار عن تفاصيل مشروع جديد:\n\n👤 الاسم: ${formData.clientName}\n📌 نوع المشروع: ${pLabel}\n\n🛠️ المزايا المطلوبة:\n${fLabels ? '• ' + fLabels : 'لا يوجد مزايا إضافية محددة'}\n\n💰 الميزانية المتوقعة: ${formData.budget || 'غير محدد'}\n\n📝 تفاصيل المشروع:\n${formData.description || 'لا يوجد تفاصيل إضافية'}`;

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
    // Reset state for next time
    setTimeout(() => {
      setStep(1);
      setTermsAccepted(false);
      setFormData({ clientName: '', projectType: 'fullstack', features: [], budget: '', description: '' });
      if (onWhatsAppSent) onWhatsAppSent();
    }, 400);
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
                    {lang === 'ar' ? 'بدء مشروع جديد' : 'Start a New Project'}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {lang === 'ar' ? `الخطوة ${step} من 2` : `Step ${step} of 2`}
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

            {/* Content Body */}
            <div style={{ padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
              
              {/* STEP 1: Terms and Conditions */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {lang === 'ar' ? 'شروط وقواعد العمل' : 'Terms & Conditions'}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {lang === 'ar' ? 'يرجى قراءة الشروط والقواعد أدناه والموافقة عليها قبل المتابعة لإرسال طلب المشروع.' : 'Please read and agree to the terms below before proceeding.'}
                    </p>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                  }}>
                    {/* Embedded PDF - User needs to place terms.pdf in public folder */}
                    <iframe src="/terms.pdf" style={{ width: '100%', height: '100%', border: 'none' }} title="Terms and Conditions PDF">
                      <p style={{ padding: '20px', textAlign: 'center' }}>{lang === 'ar' ? 'لا يمكن عرض ملف PDF. الرجاء تحميل الملف:' : 'PDF cannot be displayed. Please download:'} <a href="/terms.pdf">terms.pdf</a></p>
                    </iframe>
                  </div>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '16px',
                    backgroundColor: termsAccepted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-primary)',
                    border: termsAccepted ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {lang === 'ar' ? 'لقد قرأت الشروط والقواعد وأوافق عليها تماماً.' : 'I have read and fully agree to the terms and conditions.'}
                    </span>
                  </label>

                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!termsAccepted}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        background: termsAccepted ? 'var(--accent-blue)' : 'var(--bg-primary)',
                        color: termsAccepted ? '#FFFFFF' : 'var(--text-secondary)',
                        border: termsAccepted ? 'none' : '1px solid var(--border-color)',
                        cursor: termsAccepted ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
                      <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Comprehensive Form */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    
                    {/* Name */}
                    <div>
                      <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        <User size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'الاسم الكريم' : 'Your Name'}
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder={lang === 'ar' ? 'أدخل اسمك...' : 'Enter your name...'}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        <FileText size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'نوع المشروع' : 'Project Type'}
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: '0.95rem',
                          cursor: 'pointer'
                        }}
                      >
                        {projectTypes.map(pt => (
                          <option key={pt.id} value={pt.id}>{pt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Features */}
                    <div>
                      <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        {lang === 'ar' ? 'المزايا الإضافية' : 'Additional Features'}
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                        {featureOptions.map((opt) => {
                          const isSelected = formData.features.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => toggleFeature(opt.id)}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</span>
                              {isSelected && <Check size={14} color="var(--accent-blue)" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        <CreditCard size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'الميزانية المتوقعة (اختياري)' : 'Estimated Budget (Optional)'}
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder={lang === 'ar' ? 'مثال: 500$ - 1000$' : 'e.g., $500 - $1000'}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        <AlignLeft size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'تفاصيل إضافية للمشروع' : 'Project Details'}
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder={lang === 'ar' ? 'اكتب تفاصيل أو فكرة مشروعك هنا...' : 'Describe your project idea here...'}
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: '0.95rem',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                  </div>

                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600,
                      }}
                    >
                      <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                      <span>{lang === 'ar' ? 'رجوع' : 'Back'}</span>
                    </button>

                    <motion.button
                      onClick={handleSendBrief}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={!formData.clientName || !formData.projectType}
                      style={{
                        background: (!formData.clientName) ? 'var(--bg-primary)' : 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                        color: (!formData.clientName) ? 'var(--text-secondary)' : '#FFFFFF',
                        border: (!formData.clientName) ? '1px solid var(--border-color)' : 'none',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        padding: '14px 26px',
                        borderRadius: '12px',
                        cursor: (!formData.clientName) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: (!formData.clientName) ? 'none' : '0 8px 25px rgba(37, 211, 102, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <MessageCircle size={20} />
                      <span>{lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp'}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
