import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, CheckCircle2, MessageCircle, FileText, 
  User, CreditCard, AlignLeft, Calendar, LayoutTemplate, 
  Code, PenTool, CheckSquare, ArrowLeft, ArrowRight,
  ShieldCheck, FileSignature, Clock
} from 'lucide-react';

// === Official Terms Content (Written by Anas) ===
const officialTerms = {
  ar: {
    development: {
      title: 'وثيقة شروط التطوير والبرمجة',
      icon: <Code size={24} />,
      content: `1. الدفعات المالية: يتم دفع 40% كدفعة أولى لبدء العمل، 30% بعد تسليم النسخة التجريبية (Beta)، و 30% عند التسليم النهائي للمشروع ونقره على السيرفر.\n2. الملكية الفكرية: تعود ملكية الكود المصدري (Source Code) بالكامل للعميل بعد تسديد الدفعة الأخيرة.\n3. الصيانة والدعم: يتضمن المشروع فترة دعم فني مجانية لمدة 30 يوماً من تاريخ التسليم النهائي لتصحيح أي أخطاء برمجية (Bugs). أي إضافات جديدة بعد التسليم تتطلب اتفاقاً مالياً جديداً.\n4. الاستضافة (Hosting): أسعار المشاريع لا تشمل تكاليف الاستضافة أو النطاق (Domain) ما لم يتم الاتفاق على غير ذلك.`
    },
    design: {
      title: 'وثيقة شروط التصميم (UI/UX)',
      icon: <PenTool size={24} />,
      content: `1. الدفعات المالية: يتم دفع 50% كدفعة أولى قبل البدء بالبحث ورسم النماذج (Wireframes)، و 50% بعد الموافقة النهائية وقبل تسليم الملفات المفتوحة.\n2. التعديلات: يحق للعميل طلب تعديلات جذرية مرتين (2) خلال مرحلة النماذج المبدئية. التعديلات الطفيفة (تغيير ألوان، نصوص) مسموحة حتى 3 مرات قبل التسليم النهائي.\n3. التسليم: يتم تسليم التصاميم النهائية عبر منصة Figma بصيغة تفاعلية (Prototype) قابلة للتصدير للبرمجة.\n4. الملكية: لا يحق للمصمم إعادة بيع واجهات العميل لأطراف أخرى، ويعتبر التصميم ملكية حصرية للعميل.`
    },
    communication: {
      title: 'قواعد التواصل وإدارة المشروع',
      icon: <ShieldCheck size={24} />,
      content: `1. أوقات العمل: أوقات العمل والتواصل الرسمية هي من الأحد إلى الخميس، من الساعة 10 صباحاً وحتى 6 مساءً (بتوقيت عمّان).\n2. آلية التواصل: يتم اعتماد (WhatsApp) للتحديثات السريعة، و (Google Meet / Zoom) للاجتماعات الطويلة ومراجعة النماذج.\n3. الالتزام بالوقت: أي تأخير من العميل في تسليم المحتوى المطلوب (صور، نصوص، ملفات) قد يؤدي إلى تأخير موعد التسليم النهائي للمشروع بنفس مقدار التأخير.\n4. الإلغاء: في حال قرر العميل إيقاف المشروع بعد البدء به، لا يتم استرداد الدفعة الأولى، حيث تعتبر تعويضاً عن الوقت والجهد المبذول في التخطيط والبدء.`
    }
  },
  en: {
    development: {
      title: 'Development & Programming Terms',
      icon: <Code size={24} />,
      content: `1. Payments: 40% upfront payment, 30% upon Beta delivery, and 30% upon final delivery and deployment.\n2. Intellectual Property: The full source code ownership transfers to the client after the final payment is cleared.\n3. Maintenance: The project includes 30 days of free technical support for bug fixing after final delivery. New features require a separate agreement.\n4. Hosting: Project quotes do not include hosting or domain costs unless explicitly agreed upon.`
    },
    design: {
      title: 'UI/UX Design Terms',
      icon: <PenTool size={24} />,
      content: `1. Payments: 50% upfront payment before wireframing, and 50% before delivering the final source files.\n2. Revisions: The client is entitled to 2 major revisions during the wireframe stage, and up to 3 minor revisions before final delivery.\n3. Delivery: Final designs are delivered via Figma as an interactive prototype ready for development.\n4. Ownership: The designer will not resell custom client interfaces. The design is the exclusive property of the client.`
    },
    communication: {
      title: 'Communication & Management Rules',
      icon: <ShieldCheck size={24} />,
      content: `1. Working Hours: Official communication hours are Sunday to Thursday, 10 AM to 6 PM (Amman Time).\n2. Communication Channels: WhatsApp for quick updates, and Google Meet/Zoom for detailed reviews.\n3. Deadlines: Any delay by the client in providing required assets (text, images) will correspondingly extend the final delivery deadline.\n4. Cancellation: If the client cancels the project after work has commenced, the upfront payment is non-refundable as compensation for initial planning and time spent.`
    }
  }
};

export const StartProjectPage = ({ onBack, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contractRef = useRef(null);

  const [termsAccepted, setTermsAccepted] = useState({
    development: false,
    design: false,
    communication: false,
  });

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    projectName: '',
    projectType: 'web',
    features: [],
    budget: '',
    deadline: '',
    description: ''
  });

  const projectTypes = [
    { id: 'web', label: lang === 'ar' ? 'تطبيق ويب متكامل (Full-Stack)' : 'Full-Stack Web App' },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات وتجربة مستخدم (UI/UX)' : 'UI/UX Design' },
    { id: 'api', label: lang === 'ar' ? 'تطوير واجهات خلفية (Backend/API)' : 'Backend API Development' },
    { id: 'ecommerce', label: lang === 'ar' ? 'متجر إلكتروني' : 'E-Commerce Store' },
    { id: 'landing', label: lang === 'ar' ? 'صفحة هبوط (Landing Page)' : 'Landing Page' },
    { id: 'other', label: lang === 'ar' ? 'أخرى' : 'Other' },
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

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStep1Valid = formData.clientName.trim() !== '' && formData.projectName.trim() !== '';
  const isStep2Valid = formData.projectType !== '';
  const isStep3Valid = true; // Optional fields
  const isStep4Valid = termsAccepted.development && termsAccepted.design && termsAccepted.communication;

  const handleSubmit = async () => {
    setIsGeneratingPdf(true);
    
    try {
      if (contractRef.current) {
        const canvas = await html2canvas(contractRef.current, { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Agreement_${formData.clientName || 'Client'}.pdf`);
      }
    } catch (error) {
      console.error("PDF Generation failed", error);
    }

    setIsGeneratingPdf(false);

    const pLabel = projectTypes.find((p) => p.id === formData.projectType)?.label || '';
    const fLabels = formData.features
      .map((fId) => featureOptions.find((opt) => opt.id === fId)?.label)
      .join('\n• ');

    let msg = '';
    
    if (lang === 'ar') {
      msg = `مرحباً أنس الطرايرة 👋
لقد قرأت جميع وثائق وشروط العمل ووافقت عليها وتم إصدار وثيقة رسمية بذلك.
سأقوم بإرفاق ملف الـ PDF الخاص بالاتفاقية في هذه المحادثة، وإليك نسخة نصية من موافقتي:

👤 معلومات العميل:
- الاسم: ${formData.clientName}
- الشركة: ${formData.companyName || 'لا يوجد'}

📌 معلومات المشروع:
- اسم المشروع: ${formData.projectName}
- التصنيف: ${pLabel}

💰 الميزانية المتوقعة: ${formData.budget || 'لم يتم التحديد'}
⏱️ موعد التسليم المطلوب: ${formData.deadline || 'غير محدد'}

🛠️ المزايا المطلوبة:
${fLabels ? '• ' + fLabels : 'لا يوجد تفضيلات محددة'}

📝 تفاصيل إضافية:
${formData.description || 'لا يوجد'}

-------------------------
⚖️ إقرار وشروط العمل المتفق عليها:
أقر أنا (${formData.clientName}) بموافقتي التامة على الشروط التالية:
1. ${termsObj.development.title}: موافق
2. ${termsObj.design.title}: موافق
3. ${termsObj.communication.title}: موافق
تاريخ الإقرار: ${new Date().toLocaleString('ar-EG')}
`;
    } else {
      msg = `Hello Anas Tarayra 👋
I have read and agreed to all the work terms and conditions, and an official document has been generated.
I will attach the PDF agreement to this chat, and here is a text copy of my agreement:

👤 Client Information:
- Name: ${formData.clientName}
- Company: ${formData.companyName || 'None'}

📌 Project Details:
- Project Name: ${formData.projectName}
- Category: ${pLabel}

💰 Expected Budget: ${formData.budget || 'Not specified'}
⏱️ Desired Deadline: ${formData.deadline || 'Not specified'}

🛠️ Required Features:
${fLabels ? '• ' + fLabels : 'No specific preferences'}

📝 Additional Details:
${formData.description || 'None'}

-------------------------
⚖️ Official Agreement & Terms:
I, (${formData.clientName}), hereby fully agree to the following terms:
1. ${termsObj.development.title}: Agreed
2. ${termsObj.design.title}: Agreed
3. ${termsObj.communication.title}: Agreed
Date of Agreement: ${new Date().toLocaleString('en-US')}
`;
    }

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(msg)}`, '_blank');
    if (onWhatsAppSent) onWhatsAppSent();
    onBack();
  };

  const pageVariants = {
    initial: (dir) => ({ opacity: 0, x: dir === 1 ? 50 : -50 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: (dir) => ({ opacity: 0, x: dir === 1 ? -50 : 50, transition: { duration: 0.3 } })
  };

  const termsObj = officialTerms[lang] || officialTerms.en;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Top Header & Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <button 
            onClick={onBack}
            style={{ 
              background: 'transparent', border: '1px solid var(--border-color)', 
              color: 'var(--text-secondary)', padding: '8px 16px', 
              borderRadius: '20px', cursor: 'pointer', display: 'inline-flex', 
              alignItems: 'center', gap: '8px', transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'ar' ? 'عودة' : 'Back'}</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: step >= i ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                  color: step >= i ? '#FFF' : 'var(--text-secondary)',
                  border: step >= i ? 'none' : '2px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1rem',
                  transition: 'all 0.4s ease',
                  boxShadow: step === i ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none'
                }}
              >
                {step > i ? <CheckCircle2 size={20} /> : i}
              </div>
            ))}
          </div>
          <div style={{ height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              initial={false}
              animate={{ width: `${((step - 1) / 4) * 100}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))' }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
            {step === 1 && (lang === 'ar' ? 'المعلومات الأساسية' : 'Basic Information')}
            {step === 2 && (lang === 'ar' ? 'نطاق المشروع المبدئي' : 'Initial Project Scope')}
            {step === 3 && (lang === 'ar' ? 'المتطلبات الإضافية' : 'Additional Requirements')}
            {step === 4 && (lang === 'ar' ? 'قواعد وشروط العمل الرسمية' : 'Official Terms & Rules')}
            {step === 5 && (lang === 'ar' ? 'مراجعة واعتماد' : 'Review & Submit')}
          </div>
        </div>

        {/* Wizard Steps Container */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit"
                className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}
              >
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {lang === 'ar' ? 'مرحباً بك! لنتعرف عليك' : 'Welcome! Let\'s get to know you'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    {lang === 'ar' ? 'دعنا نبدأ بأخذ بعض التفاصيل الأساسية عنك وعن مشروعك.' : 'Let\'s start by getting some basic details about you and your project.'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <User size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input 
                      type="text" name="clientName" value={formData.clientName} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'أدخل اسمك الكريم...' : 'Enter your name...'}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Briefcase size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'اسم الشركة أو المؤسسة (اختياري)' : 'Company Name (Optional)'}
                    </label>
                    <input 
                      type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'اسم شركتك...' : 'Your company...'}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <LayoutTemplate size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'عنوان أو اسم المشروع *' : 'Project Title *'}
                    </label>
                    <input 
                      type="text" name="projectName" value={formData.projectName} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'مثال: متجر الكتروني لبيع القهوة' : 'e.g. Coffee E-Commerce'}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Project Scope */}
            {step === 2 && (
              <motion.div
                key="step2" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit"
                className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}
              >
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {lang === 'ar' ? 'نطاق المشروع والميزانية' : 'Scope & Budget'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    {lang === 'ar' ? 'حدد نوع العمل الذي تحتاجه وتوقعاتك المالية.' : 'Define the type of work you need and your financial expectations.'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <FileText size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'نوع المشروع الأساسي *' : 'Main Project Type *'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                      {projectTypes.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => setFormData({ ...formData, projectType: p.id })}
                          style={{
                            padding: '16px', borderRadius: '14px', border: formData.projectType === p.id ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                            background: formData.projectType === p.id ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-primary)', cursor: 'pointer',
                            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 600
                          }}
                        >
                          <span style={{ color: formData.projectType === p.id ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <CreditCard size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'الميزانية المتوقعة' : 'Expected Budget'}
                      </label>
                      <input 
                        type="text" name="budget" value={formData.budget} onChange={handleInputChange}
                        placeholder={lang === 'ar' ? 'مثال: 500$ - 1500$' : 'e.g. $500 - $1500'}
                        style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <Calendar size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                        {lang === 'ar' ? 'الوقت المرغوب للتسليم' : 'Desired Deadline'}
                      </label>
                      <input 
                        type="text" name="deadline" value={formData.deadline} onChange={handleInputChange}
                        placeholder={lang === 'ar' ? 'مثال: خلال شهرين' : 'e.g. Within 2 months'}
                        style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Deep Dive */}
            {step === 3 && (
              <motion.div
                key="step3" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit"
                className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}
              >
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {lang === 'ar' ? 'المتطلبات الإضافية' : 'Additional Requirements'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    {lang === 'ar' ? 'هل هناك مزايا تقنية معينة تحتاجها؟ وما هي فكرة المشروع التفصيلية؟' : 'Any specific technical features? Please describe your idea in detail.'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {lang === 'ar' ? 'حدد المزايا التقنية الأساسية (اختياري)' : 'Select Core Technical Features (Optional)'}
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <AlignLeft size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-blue)', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'شرح تفصيلي للمشروع' : 'Detailed Project Description'}
                    </label>
                    <textarea 
                      name="description" value={formData.description} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'اشرح كل ما يخطر ببالك عن وظائف المشروع، الجمهور المستهدف، وأي ملاحظات أخرى...' : 'Describe everything about your project functionality, target audience, etc...'}
                      rows={6}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Official Terms */}
            {step === 4 && (
              <motion.div
                key="step4" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit"
                className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}
              >
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                  <FileSignature size={48} style={{ color: 'var(--accent-blue)', marginBottom: '16px', margin: '0 auto' }} />
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {lang === 'ar' ? 'المواثيق وشروط العمل' : 'Official Work Terms & Agreements'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                    {lang === 'ar' ? 'لضمان بيئة عمل احترافية تحفظ حقوق الجميع، يرجى قراءة الوثائق التالية والموافقة عليها. هذه الشروط تمثل اتفاقية العمل المبدئية بيننا.' : 'To ensure a professional environment that protects everyone\'s rights, please read and agree to the following documents.'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {Object.keys(termsObj).map((key) => {
                    const doc = termsObj[key];
                    const isAccepted = termsAccepted[key];
                    
                    return (
                      <div key={key} style={{ 
                        border: isAccepted ? '1px solid var(--accent-green)' : '1px solid var(--border-color)', 
                        borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-primary)',
                        transition: 'all 0.3s ease'
                      }}>
                        {/* Document Header */}
                        <div style={{ 
                          padding: '16px 20px', background: isAccepted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0,0,0,0.1)', 
                          borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px'
                        }}>
                          <div style={{ color: isAccepted ? 'var(--accent-green)' : 'var(--accent-blue)' }}>{doc.icon}</div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{doc.title}</h3>
                        </div>
                        
                        {/* Document Content */}
                        <div style={{ padding: '24px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                          {doc.content}
                        </div>

                        {/* Agreement Checkbox */}
                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <div style={{ 
                              width: '24px', height: '24px', borderRadius: '6px', 
                              border: isAccepted ? 'none' : '2px solid var(--text-secondary)',
                              background: isAccepted ? 'var(--accent-green)' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              {isAccepted && <CheckSquare size={16} color="#fff" />}
                            </div>
                            <input 
                              type="checkbox" 
                              checked={isAccepted} 
                              onChange={(e) => setTermsAccepted({ ...termsAccepted, [key]: e.target.checked })} 
                              style={{ display: 'none' }} 
                            />
                            <span style={{ fontWeight: 700, color: isAccepted ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                              {lang === 'ar' ? `قرأت وأوافق على ${doc.title}` : `I have read and agree to the ${doc.title}`}
                            </span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Review & Submit */}
            {step === 5 && (
              <motion.div
                key="step5" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit"
                className="glass-card" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' 
                }}>
                  <MessageCircle size={40} color="#25D366" />
                </div>
                
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {lang === 'ar' ? 'جاهزون للانطلاق!' : 'Ready to Launch!'}
                </h2>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                  {lang === 'ar' 
                    ? 'لقد قمنا بجمع جميع تفاصيل مشروعك وموافقتك على الشروط. اضغط على الزر أدناه لإرسال الملف الكامل لي عبر واتساب لنتواصل فوراً ونبدأ العمل.' 
                    : 'We have compiled all your project details and agreements. Click the button below to send the complete brief via WhatsApp so we can connect instantly.'}
                </p>

                <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    {lang === 'ar' ? 'ملخص سريع:' : 'Quick Summary:'}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <li><strong>{lang === 'ar' ? 'الاسم:' : 'Name:'}</strong> {formData.clientName}</li>
                    <li><strong>{lang === 'ar' ? 'المشروع:' : 'Project:'}</strong> {formData.projectName}</li>
                    <li><strong>{lang === 'ar' ? 'النوع:' : 'Type:'}</strong> {projectTypes.find(p => p.id === formData.projectType)?.label}</li>
                    <li><strong>{lang === 'ar' ? 'الشروط:' : 'Terms:'}</strong> <span style={{ color: 'var(--accent-green)' }}>{lang === 'ar' ? 'تمت الموافقة' : 'Approved'} ✓</span></li>
                  </ul>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isGeneratingPdf}
                  whileHover={{ scale: isGeneratingPdf ? 1 : 1.05 }}
                  whileTap={{ scale: isGeneratingPdf ? 1 : 0.95 }}
                  style={{
                    background: isGeneratingPdf ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: isGeneratingPdf ? 'var(--text-secondary)' : '#fff',
                    border: 'none',
                    padding: '20px 48px',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    cursor: isGeneratingPdf ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: isGeneratingPdf ? 'none' : '0 10px 30px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <MessageCircle size={28} />
                  <span>{isGeneratingPdf ? (lang === 'ar' ? 'جاري إصدار الوثيقة...' : 'Generating Contract...') : (lang === 'ar' ? 'توليد الوثيقة ومراسلتي واتساب' : 'Generate Contract & Message Me')}</span>
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
          <button
            onClick={prevStep}
            style={{
              padding: '12px 24px', borderRadius: '12px', background: 'var(--bg-primary)',
              color: 'var(--text-primary)', border: '1px solid var(--border-color)',
              cursor: step > 1 ? 'pointer' : 'default', opacity: step > 1 ? 1 : 0, pointerEvents: step > 1 ? 'auto' : 'none',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
          </button>

          {step < 5 && (
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && !isStep1Valid) || 
                (step === 2 && !isStep2Valid) || 
                (step === 4 && !isStep4Valid)
              }
              style={{
                padding: '12px 32px', borderRadius: '12px',
                background: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid)) ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                color: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid)) ? '#fff' : 'var(--text-secondary)',
                border: 'none', cursor: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid)) ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, transition: 'all 0.2s'
              }}
            >
              <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
              <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            </button>
          )}
        </div>

      </div>

      {/* Hidden PDF Contract Template */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', zIndex: -1000 }}>
        <div ref={contractRef} style={{
          width: '794px', 
          backgroundColor: '#ffffff', 
          color: '#000000', 
          padding: '60px', 
          fontFamily: 'Arial, sans-serif',
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          textAlign: lang === 'ar' ? 'right' : 'left'
        }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                {lang === 'ar' ? 'وثيقة اتفاقية عمل رسمية' : 'Official Work Agreement'}
              </h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
                {lang === 'ar' ? 'تاريخ الإصدار: ' : 'Issue Date: '} 
                {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
              </p>
            </div>
            <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1D4ED8' }}>
                {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Tarayra'}
              </h2>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>Anas Tarayra | Full-Stack Developer</p>
            </div>
          </div>

          {/* Client Details */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
              {lang === 'ar' ? 'بيانات الطرفين' : 'Parties Details'}
            </h3>
            <p><strong>{lang === 'ar' ? 'مقدم الخدمة (الطرف الأول):' : 'Service Provider (First Party):'}</strong> {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Tarayra'}</p>
            <p><strong>{lang === 'ar' ? 'العميل (الطرف الثاني):' : 'Client (Second Party):'}</strong> {formData.clientName} {formData.companyName ? `(${formData.companyName})` : ''}</p>
            <p><strong>{lang === 'ar' ? 'اسم المشروع:' : 'Project Name:'}</strong> {formData.projectName}</p>
          </div>

          {/* Terms Section */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
              {lang === 'ar' ? 'الشروط والأحكام المتفق عليها' : 'Agreed Terms and Conditions'}
            </h3>
            <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
              <h4 style={{ margin: '10px 0 5px 0' }}>{termsObj.development.title}</h4>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{termsObj.development.content}</p>
              
              <h4 style={{ margin: '15px 0 5px 0' }}>{termsObj.design.title}</h4>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{termsObj.design.content}</p>
              
              <h4 style={{ margin: '15px 0 5px 0' }}>{termsObj.communication.title}</h4>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{termsObj.communication.content}</p>
            </div>
          </div>

          {/* Digital Signature */}
          <div style={{ marginTop: '50px', backgroundColor: '#f9f9f9', padding: '20px', borderLeft: lang === 'ar' ? 'none' : '4px solid #10B981', borderRight: lang === 'ar' ? '4px solid #10B981' : 'none', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#10B981' }}>
              {lang === 'ar' ? 'إقرار إلكتروني وتوقيع رقمي' : 'Electronic Declaration & Digital Signature'}
            </h3>
            <p style={{ margin: '0 0 10px 0', fontSize: '13px' }}>
              {lang === 'ar' 
                ? <>أقر أنا <strong>{formData.clientName}</strong> بموجب هذا المستند الرقمي، بأنني قد قرأت كافة الشروط والمواثيق المذكورة أعلاه، وأوافق عليها موافقة تامة ونهائية للبدء بالعمل على مشروع (<strong>{formData.projectName}</strong>).</>
                : <>I, <strong>{formData.clientName}</strong>, hereby declare through this digital document that I have read all the terms and rules stated above, and I fully and finally agree to them to commence work on the project (<strong>{formData.projectName}</strong>).</>
              }
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#777' }}>
                  {lang === 'ar' ? 'توقيع العميل (مُصادق رقمياً):' : 'Client Signature (Digitally Authenticated):'}
                </p>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic' }}>{formData.clientName}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#777' }}>
                  {lang === 'ar' ? 'وقت وتاريخ المصادقة:' : 'Time and Date of Authentication:'}
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
