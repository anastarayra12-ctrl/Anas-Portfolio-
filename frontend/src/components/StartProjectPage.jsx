import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, CheckCircle2, MessageCircle, FileText, 
  User, CreditCard, AlignLeft, Calendar, LayoutTemplate, 
  Code, PenTool, CheckSquare, ArrowLeft 
} from 'lucide-react';

export const StartProjectPage = ({ onBack, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState('web');

  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    projectType: 'web',
    features: [],
    budget: '',
    deadline: '',
    description: ''
  });

  const termOptions = [
    { id: 'web', title: lang === 'ar' ? 'شروط تطوير الويب والبرمجة' : 'Web Dev Terms', icon: <Code size={20} />, file: '/web_terms.pdf' },
    { id: 'design', title: lang === 'ar' ? 'شروط تصميم واجهات UI/UX' : 'UI/UX Terms', icon: <PenTool size={20} />, file: '/design_terms.pdf' },
    { id: 'consulting', title: lang === 'ar' ? 'شروط الاستشارات البرمجية' : 'Consulting Terms', icon: <Briefcase size={20} />, file: '/consulting_terms.pdf' },
  ];

  const projectTypes = [
    { id: 'web', label: lang === 'ar' ? 'تطبيق ويب متكامل (Full-Stack)' : 'Full-Stack Web App' },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات وتجربة مستخدم (UI/UX)' : 'UI/UX Design' },
    { id: 'api', label: lang === 'ar' ? 'تطوير واجهات خلفية (Backend/API)' : 'Backend API Development' },
    { id: 'ecommerce', label: lang === 'ar' ? 'متجر إلكتروني' : 'E-Commerce Store' },
    { id: 'landing', label: lang === 'ar' ? 'صفحة هبوط (Landing Page)' : 'Landing Page' },
    { id: 'other', label: lang === 'ar' ? 'أخرى (يرجى التوضيح)' : 'Other (Please specify)' },
  ];

  const featureOptions = [
    { id: 'auth', label: lang === 'ar' ? 'نظام تسجيل دخول وصلاحيات' : 'Authentication & Roles' },
    { id: 'db', label: lang === 'ar' ? 'قواعد بيانات متقدمة' : 'Advanced Database' },
    { id: 'payment', label: lang === 'ar' ? 'بوابات الدفع الإلكتروني' : 'Payment Gateways' },
    { id: 'dashboard', label: lang === 'ar' ? 'لوحة تحكم للإدارة' : 'Admin Dashboard' },
    { id: 'multilang', label: lang === 'ar' ? 'دعم لغات متعددة' : 'Multi-Language' },
    { id: 'ai', label: lang === 'ar' ? 'تكامل مع الذكاء الاصطناعي' : 'AI Integration' },
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

  const isFormValid = formData.clientName.trim() !== '' && formData.projectName.trim() !== '' && termsAccepted;

  const handleSubmit = () => {
    if (!isFormValid) return;

    const pLabel = projectTypes.find((p) => p.id === formData.projectType)?.label || '';
    const fLabels = formData.features
      .map((fId) => featureOptions.find((opt) => opt.id === fId)?.label)
      .join('\n• ');

    const msg = `مرحباً أنس الطرايرة 👋
لقد قرأت شروط العمل وأوافق عليها تماماً.
أود البدء بمشروع جديد وتفاصيله كالتالي:

👤 معلومات العميل:
- الاسم: ${formData.clientName}

📌 معلومات المشروع:
- اسم المشروع: ${formData.projectName}
- التصنيف: ${pLabel}

🛠️ المزايا المطلوبة:
${fLabels ? '• ' + fLabels : 'لا يوجد تفضيلات محددة'}

💰 الميزانية المتوقعة: ${formData.budget || 'لم يتم التحديد'}
⏱️ موعد التسليم المطلوب: ${formData.deadline || 'غير محدد'}

📝 شرح وتفاصيل إضافية:
${formData.description || 'لا يوجد'}
`;

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(msg)}`, '_blank');
    if (onWhatsAppSent) onWhatsAppSent();
    onBack();
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <button 
            onClick={onBack}
            style={{ 
              background: 'transparent', border: '1px solid var(--border-color)', 
              color: 'var(--text-secondary)', padding: '10px 20px', 
              borderRadius: '30px', cursor: 'pointer', display: 'inline-flex', 
              alignItems: 'center', gap: '8px', marginBottom: '24px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 900, 
            marginBottom: '16px',
            background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {lang === 'ar' ? 'لنبدأ العمل على مشروعك' : 'Let\'s Build Your Project'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'ar' 
              ? 'أهلاً بك في منصة طلب المشاريع المباشرة. يرجى قراءة الشروط المتعلقة بنوع مشروعك، ثم تعبئة التفاصيل بدقة لضمان أفضل تجربة عمل احترافية.'
              : 'Welcome to the project intake platform. Please read the terms related to your project type, then fill in the details accurately.'}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* STEP 1: Terms and Conditions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card" 
            style={{ padding: '40px', borderRadius: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' 
              }}>1</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'شروط وقواعد العمل' : 'Terms & Conditions'}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {lang === 'ar' ? 'اختر تصنيف مشروعك لقراءة الشروط الخاصة به:' : 'Select your project type to read its terms:'}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {termOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTerms(opt.id)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: selectedTerms === opt.id ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                    background: selectedTerms === opt.id ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-primary)',
                    color: selectedTerms === opt.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {opt.icon}
                  <span>{opt.title}</span>
                </button>
              ))}
            </div>

            <div style={{ 
              width: '100%', height: '400px', 
              border: '1px solid var(--border-color)', borderRadius: '16px', 
              overflow: 'hidden', marginBottom: '24px', background: 'var(--bg-primary)' 
            }}>
              <iframe 
                src={termOptions.find(t => t.id === selectedTerms)?.file} 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="Terms Document"
              >
                <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  {lang === 'ar' ? 'تعذر عرض ملف PDF. يرجى التأكد من إضافة الملفات إلى المجلد الصحيح.' : 'Unable to display PDF. Please ensure files are added.'}
                </p>
              </iframe>
            </div>

            <label style={{ 
              display: 'flex', alignItems: 'center', gap: '14px', 
              padding: '20px', borderRadius: '16px', cursor: 'pointer',
              background: termsAccepted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0,0,0,0.2)',
              border: termsAccepted ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                width: '24px', height: '24px', borderRadius: '6px', 
                border: termsAccepted ? 'none' : '2px solid var(--text-secondary)',
                background: termsAccepted ? 'var(--accent-green)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {termsAccepted && <CheckSquare size={16} color="#fff" />}
              </div>
              <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={(e) => setTermsAccepted(e.target.checked)} 
                style={{ display: 'none' }} 
              />
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'لقد قرأت قواعد وشروط العمل الموضحة أعلاه وأوافق عليها تماماً.' : 'I have read and fully agree to the terms and conditions above.'}
              </span>
            </label>
          </motion.div>

          {/* STEP 2: Project Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card" 
            style={{ padding: '40px', borderRadius: '24px', opacity: termsAccepted ? 1 : 0.5, pointerEvents: termsAccepted ? 'auto' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' 
              }}>2</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              
              {/* Client Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <User size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'اسم العميل / الشركة *' : 'Client / Company Name *'}
                </label>
                <input 
                  type="text" name="clientName" value={formData.clientName} onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'أدخل اسمك الكريم...' : 'Enter your name...'}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Project Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <LayoutTemplate size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'اسم المشروع *' : 'Project Name *'}
                </label>
                <input 
                  type="text" name="projectName" value={formData.projectName} onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'مثال: منصة تعليمية، متجر إلكتروني...' : 'e.g. Educational Platform...'}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Project Type */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <FileText size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'التصنيف العام للمشروع *' : 'Project Category *'}
                </label>
                <select 
                  name="projectType" value={formData.projectType} onChange={handleInputChange}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', cursor: 'pointer' }}
                >
                  {projectTypes.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <CreditCard size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'الميزانية المتوقعة' : 'Estimated Budget'}
                </label>
                <input 
                  type="text" name="budget" value={formData.budget} onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'مثال: 1000$ - 2000$' : 'e.g. $1000 - $2000'}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Deadline */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <Calendar size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'الموعد المطلوب للتسليم' : 'Desired Deadline'}
                </label>
                <input 
                  type="text" name="deadline" value={formData.deadline} onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'مثال: خلال شهرين' : 'e.g. Within 2 months'}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Features */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? 'مزايا أساسية مطلوبة في المشروع (اختياري)' : 'Required Core Features (Optional)'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                  {featureOptions.map(opt => {
                    const isSelected = formData.features.includes(opt.id);
                    return (
                      <div 
                        key={opt.id} onClick={() => toggleFeature(opt.id)}
                        style={{
                          padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                          border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</span>
                        {isSelected && <CheckCircle2 size={18} color="var(--accent-blue)" />}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Description */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <AlignLeft size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
                  {lang === 'ar' ? 'شرح إضافي / تفاصيل المشروع الكاملة' : 'Full Project Details'}
                </label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'اكتب كل ما يخطر ببالك عن المشروع هنا...' : 'Write everything about your project here...'}
                  rows={6}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

            </div>

            {/* Submit Area */}
            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <motion.button
                onClick={handleSubmit}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                disabled={!isFormValid}
                style={{
                  background: isFormValid ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : 'var(--bg-primary)',
                  color: isFormValid ? '#fff' : 'var(--text-secondary)',
                  border: isFormValid ? 'none' : '1px solid var(--border-color)',
                  padding: '18px 40px',
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  fontFamily: 'inherit',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isFormValid ? '0 10px 30px rgba(37, 211, 102, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <MessageCircle size={24} />
                <span>{lang === 'ar' ? 'اعتماد وإرسال عبر واتساب' : 'Submit & Send via WhatsApp'}</span>
              </motion.button>
              
              {!isFormValid && (
                <p style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
                  {lang === 'ar' ? '* يرجى الموافقة على الشروط وإدخال الاسم واسم المشروع لتتمكن من الإرسال.' : '* Please agree to terms and enter your name and project name to submit.'}
                </p>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
