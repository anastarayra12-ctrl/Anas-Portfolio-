import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  User, Mail, Phone, LayoutTemplate, Briefcase, 
  FileText, Link as LinkIcon, CreditCard, Calendar, Target,
  CheckCircle2, ArrowLeft, ArrowRight, Send, AlertCircle, Edit2, PlayCircle, HelpCircle
} from 'lucide-react';

export const StartProjectPage = ({ onBack, onWhatsAppSent }) => {
  const { lang } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const contractRef = useRef(null);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    projectType: '',
    projectName: '',
    description: '',
    references: '',
    budget: '',
    timeline: '',
    stage: '', 
  });

  const projectTypes = [
    { id: 'web', label: lang === 'ar' ? 'موقع ويب' : 'Website' },
    { id: 'uiux', label: lang === 'ar' ? 'تصميم واجهات (UI/UX)' : 'UI/UX Design' },
    { id: 'fullstack', label: lang === 'ar' ? 'نظام ويب متكامل' : 'Full Stack System' },
    { id: 'graphic', label: lang === 'ar' ? 'تصميم جرافيك' : 'Graphic Design' },
    { id: 'other', label: lang === 'ar' ? 'أخرى' : 'Other' },
  ];

  const budgetOptions = [
    { id: '<500', label: lang === 'ar' ? 'أقل من 500$' : 'Under $500' },
    { id: '500-1000', label: lang === 'ar' ? '500$ - 1000$' : '$500 - $1000' },
    { id: '1000-3000', label: lang === 'ar' ? '1000$ - 3000$' : '$1000 - $3000' },
    { id: '>3000', label: lang === 'ar' ? 'أكثر من 3000$' : 'Above $3000' },
    { id: 'unknown', label: lang === 'ar' ? 'غير محدد بعد' : 'Not decided yet' },
  ];

  const timelineOptions = [
    { id: 'urgent', label: lang === 'ar' ? 'عاجل جداً' : 'Urgent' },
    { id: '1month', label: lang === 'ar' ? 'خلال شهر' : 'Within 1 month' },
    { id: '2-3months', label: lang === 'ar' ? 'خلال 2-3 شهور' : '2-3 months' },
    { id: 'flexible', label: lang === 'ar' ? 'مرن' : 'Flexible' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 6));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (targetStep) => {
    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Validations
  const validateEmail = (email) => {
    if (!email) return false;
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isStep1Valid = formData.clientName.trim() !== '' && validateEmail(formData.email) && formData.phone.trim() !== '';
  const isStep2Valid = formData.projectType !== '' && formData.projectName.trim() !== '';
  const isStep3Valid = formData.description.trim() !== '';
  const isStep4Valid = formData.budget !== '' && formData.timeline !== '';
  const isStep5Valid = formData.stage !== '';
  const isStep6Valid = true;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      if (contractRef.current) {
        const canvas = await html2canvas(contractRef.current, { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${lang === 'ar' ? 'طلب مشروع' : 'Project Request'} - ${formData.clientName} - ${new Date().toLocaleDateString('en-CA')}.pdf`);
      }
    } catch (error) {
      console.error("PDF Generation failed", error);
    }

    const pTypeLabel = projectTypes.find((p) => p.id === formData.projectType)?.label || formData.projectType;
    const budgetLabel = budgetOptions.find((p) => p.id === formData.budget)?.label || formData.budget;
    const timelineLabel = timelineOptions.find((p) => p.id === formData.timeline)?.label || formData.timeline;

    let waMessage = `🚀 *${lang === 'ar' ? 'طلب مشروع جديد' : 'New Project Request'}* 🚀\n\n👤 *${lang === 'ar' ? 'الاسم:' : 'Name:'}* ${formData.clientName}\n📧 *${lang === 'ar' ? 'الإيميل:' : 'Email:'}* ${formData.email}\n📱 *${lang === 'ar' ? 'الهاتف:' : 'Phone:'}* ${formData.phone}\n\n💼 *${lang === 'ar' ? 'نوع المشروع:' : 'Type:'}* ${pTypeLabel}\n🏷️ *${lang === 'ar' ? 'اسم/فكرة المشروع:' : 'Idea:'}* ${formData.projectName}\n\n📝 *${lang === 'ar' ? 'وصف المشروع:' : 'Description:'}*\n${formData.description}\n${formData.references ? `\n🔗 *${lang === 'ar' ? 'مراجع:' : 'References:'}*\n${formData.references}` : ''}\n\n💰 *${lang === 'ar' ? 'الميزانية التقريبية:' : 'Budget:'}* ${budgetLabel}\n⏳ *${lang === 'ar' ? 'الوقت المتوقع:' : 'Timeline:'}* ${timelineLabel}\n\n------------------------------------\n`;

    if (formData.stage === 'ready') {
      waMessage += lang === 'ar' 
        ? `✅ *جاهز أبدأ بالمشروع فعلياً، بانتظار ردك للتنسيق.*\n\n(سأقوم الآن بإرفاق ملف الـ PDF الذي تم تحميله على جهازي في هذه المحادثة)` 
        : `✅ *Ready to start the project, awaiting your reply.*\n\n(I will now attach the PDF that was downloaded to my device)`;
    } else {
      waMessage += lang === 'ar' 
        ? `📩 *هاد مجرد استفسار مبدئي، بحب أعرف تفاصيل أكتر.*\n\n(سأقوم الآن بإرفاق ملف الـ PDF الذي تم تحميله على جهازي في هذه المحادثة)` 
        : `📩 *This is just an initial inquiry, I'd like more details.*\n\n(I will now attach the PDF that was downloaded to my device)`;
    }

    window.open(`https://wa.me/962796851497?text=${encodeURIComponent(waMessage)}`, '_blank');
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    if (onWhatsAppSent) onWhatsAppSent();
    onBack();
  };

  const pageVariants = {
    initial: (dir) => ({ opacity: 0, x: dir === 1 ? 40 : -40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: (dir) => ({ opacity: 0, x: dir === 1 ? -40 : 40, transition: { duration: 0.2 } })
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Top Header & Progress */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <button 
              onClick={onBack}
              style={{ 
                background: 'transparent', border: '1px solid var(--border-color)', 
                color: 'var(--text-secondary)', padding: '8px 16px', 
                borderRadius: '20px', cursor: 'pointer', display: 'inline-flex', 
                alignItems: 'center', gap: '8px', transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</span>
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {lang === 'ar' ? `الخطوة ${step} من 6` : `Step ${step} of 6`}
            </span>
          </div>

          <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div 
              initial={false}
              animate={{ width: `${(step / 6) * 100}%` }}
              style={{ height: '100%', background: 'var(--text-primary)' }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Wizard Steps Container */}
        <div style={{ position: 'relative', minHeight: '400px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'معلومات شخصية' : 'Personal Info'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'خلينا نتعرف عليك بالبداية.' : 'Let\'s get to know you first.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <User size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'الاسم...' : 'Name...'}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Mail size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      placeholder="example@domain.com"
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: !validateEmail(formData.email) && formData.email.length > 0 ? '1px solid #ef4444' : '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', direction: 'ltr' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Phone size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                    </label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                      placeholder="+962 7X XXX XXXX"
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', direction: 'ltr', textAlign: lang === 'ar' ? 'right' : 'left' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Project Type */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'نوع المشروع' : 'Project Type'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'بإيش ممكن أساعدك؟' : 'How can I help you?'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Briefcase size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'نوع الخدمة المطلوبة *' : 'Required Service *'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                      {projectTypes.map(p => (
                        <div key={p.id} onClick={() => setFormData({ ...formData, projectType: p.id })}
                          style={{
                            padding: '16px', borderRadius: '12px', border: formData.projectType === p.id ? '2px solid #1D4ED8' : '1px solid var(--border-color)',
                            background: formData.projectType === p.id ? '#1D4ED8' : 'var(--bg-primary)', cursor: 'pointer',
                            color: formData.projectType === p.id ? '#ffffff' : 'var(--text-primary)',
                            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem'
                          }}
                        >
                          {p.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <LayoutTemplate size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'اسم المشروع أو الفكرة المبدئية *' : 'Project Name / Idea *'}
                    </label>
                    <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'أدخل اسم مشروعك...' : 'Enter your project name...'}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'شرح تفصيلي للمشروع' : 'Project Details'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'احكيلي أكثر عن مشروعك.' : 'Tell me more about your project.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <FileText size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'وصف تفصيلي للمشروع *' : 'Detailed Description *'}
                    </label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? "احكيلي عن فكرة مشروعك، المشكلة اللي بيحلها، والمستخدمين المستهدفين..." : "Tell me about your idea, the problem it solves, target audience..."}
                      rows={5}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <LinkIcon size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'هل يوجد مراجع أو مشاريع مشابهة يعجبك شكلها؟ (اختياري)' : 'Any references or similar projects you like? (Optional)'}
                    </label>
                    <textarea name="references" value={formData.references} onChange={handleInputChange}
                      placeholder={lang === 'ar' ? "ضع روابط لمواقع، تطبيقات، أو أفكار تعجبك وتود بناء شيء مشابه لها." : "Drop links to websites or apps you like..."}
                      rows={3}
                      style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Budget & Timeline */}
            {step === 4 && (
              <motion.div key="step4" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'الميزانية والوقت' : 'Budget & Timeline'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'تحديد الميزانية بيساعدني أقترح عليك أفضل الحلول اللي بتناسبك.' : 'Defining budget helps me suggest the best solutions.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <CreditCard size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'نطاق الميزانية التقريبي *' : 'Approximate Budget Range *'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                      {budgetOptions.map(p => (
                        <div key={p.id} onClick={() => setFormData({ ...formData, budget: p.id })}
                          style={{
                            padding: '16px 12px', borderRadius: '12px', border: formData.budget === p.id ? '2px solid #1D4ED8' : '1px solid var(--border-color)',
                            background: formData.budget === p.id ? '#1D4ED8' : 'var(--bg-primary)', cursor: 'pointer',
                            color: formData.budget === p.id ? '#ffffff' : 'var(--text-primary)',
                            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem'
                          }}
                        >
                          {p.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Calendar size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {lang === 'ar' ? 'الوقت المتوقع للتسليم *' : 'Expected Timeline *'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                      {timelineOptions.map(p => (
                        <div key={p.id} onClick={() => setFormData({ ...formData, timeline: p.id })}
                          style={{
                            padding: '16px 12px', borderRadius: '12px', border: formData.timeline === p.id ? '2px solid #1D4ED8' : '1px solid var(--border-color)',
                            background: formData.timeline === p.id ? '#1D4ED8' : 'var(--bg-primary)', cursor: 'pointer',
                            color: formData.timeline === p.id ? '#ffffff' : 'var(--text-primary)',
                            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem'
                          }}
                        >
                          {p.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Stage */}
            {step === 5 && (
              <motion.div key="step5" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'مرحلة المشروع' : 'Project Stage'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'أين أنت الآن في قرار بناء مشروعك؟' : 'Where are you currently at in your decision making?'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div 
                    onClick={() => setFormData({ ...formData, stage: 'ready' })}
                    style={{
                      padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease',
                      border: formData.stage === 'ready' ? '2px solid #1D4ED8' : '1px solid var(--border-color)',
                      background: formData.stage === 'ready' ? '#1D4ED8' : 'var(--bg-primary)',
                      color: formData.stage === 'ready' ? '#ffffff' : 'var(--text-primary)',
                      display: 'flex', alignItems: 'center', gap: '20px'
                    }}
                  >
                    <PlayCircle size={36} opacity={0.8} />
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                        {lang === 'ar' ? 'جاهز أبدأ بالمشروع فعلياً' : 'Ready to Start'}
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8 }}>
                        {lang === 'ar' ? 'عندي الميزانية والوقت وبدي نبدأ شغل بأقرب فرصة.' : 'I have the budget and time, let\'s start ASAP.'}
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData({ ...formData, stage: 'inquiry' })}
                    style={{
                      padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease',
                      border: formData.stage === 'inquiry' ? '2px solid #1D4ED8' : '1px solid var(--border-color)',
                      background: formData.stage === 'inquiry' ? '#1D4ED8' : 'var(--bg-primary)',
                      color: formData.stage === 'inquiry' ? '#ffffff' : 'var(--text-primary)',
                      display: 'flex', alignItems: 'center', gap: '20px'
                    }}
                  >
                    <HelpCircle size={36} opacity={0.8} />
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                        {lang === 'ar' ? 'مجرد استفسار حالياً، بدي أعرف أكتر' : 'Just an Inquiry'}
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8 }}>
                        {lang === 'ar' ? 'بدي أعرف التكلفة التقريبية وتفاصيل قبل ما أقرر.' : 'I want to know rough estimates before deciding.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Review & Submit */}
            {step === 6 && (
              <motion.div key="step6" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="glass-card" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {lang === 'ar' ? 'المراجعة والإرسال' : 'Review & Send'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                  {lang === 'ar' ? 'تأكد من البيانات قبل إرسال الطلب.' : 'Verify your details before sending the request.'}
                </p>

                <div style={{ background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', marginBottom: '32px', direction: lang === 'ar' ? 'rtl' : 'ltr', overflow: 'hidden' }}>
                  
                  {/* Summary Block 1 */}
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>{lang === 'ar' ? 'المعلومات الشخصية' : 'Personal Info'}</h4>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.clientName}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{formData.email} • {formData.phone}</div>
                    </div>
                    <button onClick={() => goToStep(1)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Edit2 size={14} /> <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                    </button>
                  </div>

                  {/* Summary Block 2 */}
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>{lang === 'ar' ? 'المشروع' : 'Project'}</h4>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.projectName}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{projectTypes.find(p => p.id === formData.projectType)?.label}</div>
                    </div>
                    <button onClick={() => goToStep(2)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Edit2 size={14} /> <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                    </button>
                  </div>

                  {/* Summary Block 3 */}
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>{lang === 'ar' ? 'الميزانية والوقت' : 'Budget & Timeline'}</h4>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{budgetOptions.find(p => p.id === formData.budget)?.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{timelineOptions.find(p => p.id === formData.timeline)?.label}</div>
                    </div>
                    <button onClick={() => goToStep(4)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Edit2 size={14} /> <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                    </button>
                  </div>

                </div>

                {formData.stage === 'ready' && (
                  <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <FileText size={16} />
                    <span>{lang === 'ar' ? 'سيتم تحميل ملف PDF بطلبك، الرجاء إرفاقه برسالة الواتساب قبل الإرسال.' : 'A PDF will download, please attach it to the WhatsApp message.'}</span>
                  </div>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  style={{
                    background: isSubmitting ? 'var(--bg-secondary)' : 'var(--text-primary)',
                    color: isSubmitting ? 'var(--text-secondary)' : 'var(--bg-primary)',
                    border: 'none',
                    padding: '18px 48px',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '100%'
                  }}
                >
                  <Send size={20} />
                  <span>{isSubmitting ? (lang === 'ar' ? 'جاري التحضير...' : 'Processing...') : (lang === 'ar' ? 'إرسال الطلب' : 'Send Request')}</span>
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Navigation Buttons */}
        {step < 6 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px' }}>
            <button
              onClick={prevStep}
              style={{
                padding: '12px 24px', borderRadius: '12px', background: 'transparent',
                color: 'var(--text-primary)', border: '1px solid var(--border-color)',
                cursor: step > 1 ? 'pointer' : 'default', opacity: step > 1 ? 1 : 0, pointerEvents: step > 1 ? 'auto' : 'none',
                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s'
              }}
            >
              <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
            </button>

            <button
              onClick={nextStep}
              disabled={
                (step === 1 && !isStep1Valid) || 
                (step === 2 && !isStep2Valid) || 
                (step === 3 && !isStep3Valid) ||
                (step === 4 && !isStep4Valid) ||
                (step === 5 && !isStep5Valid)
              }
              style={{
                padding: '12px 32px', borderRadius: '12px',
                background: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid) || (step === 5 && isStep5Valid)) ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid) || (step === 5 && isStep5Valid)) ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: 'none', 
                cursor: ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid) || (step === 5 && isStep5Valid)) ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, transition: 'all 0.2s'
              }}
            >
              <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: 'var(--bg-primary)', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', border: '1px solid var(--border-color)' }}
            >
              <CheckCircle2 size={64} style={{ color: 'var(--accent-green)', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
                {lang === 'ar' ? 'تم تحضير طلبك بنجاح!' : 'Request Prepared!'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '16px' }}>
                {lang === 'ar' 
                  ? 'تم تحميل ملف PDF بمعلومات مشروعك، وتم فتح الواتساب برسالة جاهزة، فقط قم بإرسالها.'
                  : 'A PDF with your details has been downloaded, and WhatsApp has been opened with a ready message.'}
              </p>
              {formData.stage === 'ready' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', padding: '12px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '24px' }}>
                  {lang === 'ar' ? '⚠️ ولا تنسَ إرفاق ملف الـ PDF قبل الإرسال.' : '⚠️ Don\'t forget to attach the PDF before sending.'}
                </div>
              )}
              <button onClick={closeConfirmation} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden PDF Contract Template */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', zIndex: -1000 }}>
        <div ref={contractRef} style={{
          width: '794px', 
          minHeight: '1123px', // A4 aspect ratio height
          backgroundColor: '#ffffff', 
          color: '#1a1a1a', 
          padding: '60px 70px', 
          fontFamily: 'Arial, sans-serif',
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          textAlign: lang === 'ar' ? 'right' : 'left',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ borderBottom: '3px solid #1D4ED8', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900', color: '#1D4ED8' }}>
                {lang === 'ar' ? 'وثيقة طلب مشروع' : 'Project Request Document'}
              </h1>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#555' }}>
                {lang === 'ar' ? 'رقم الطلب: ' : 'Ref No: '} #{Math.floor(Math.random() * 90000) + 10000}
                <br/>
                {lang === 'ar' ? 'تاريخ الإصدار: ' : 'Date: '} {new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
              </p>
            </div>
            <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111' }}>
                {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Tarayra'}
              </h2>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                Full-Stack Developer<br/>
                Phone: +962 79 685 1497
              </p>
            </div>
          </div>

          {/* Section 1: Client Info */}
          <div style={{ marginBottom: '40px' }}>
             <h3 style={{ fontSize: '18px', color: '#1D4ED8', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '20px', fontWeight: 800 }}>
                {lang === 'ar' ? 'معلومات العميل الأساسية' : 'Client Information'}
             </h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '15px' }}>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'الاسم:' : 'Name:'}</strong> <span style={{color:'#444'}}>{formData.clientName}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'الإيميل:' : 'Email:'}</strong> <span style={{color:'#444'}}>{formData.email}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone / WhatsApp:'}</strong> <span style={{color:'#444'}}>{formData.phone}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'حالة الطلب:' : 'Request Stage:'}</strong> <span style={{color: formData.stage === 'ready' ? '#10B981' : '#F59E0B', fontWeight: 'bold'}}>
                 {formData.stage === 'ready' ? (lang === 'ar' ? 'جاهز للبدء فعلياً' : 'Ready to Start') : (lang === 'ar' ? 'مجرد استفسار مبدئي' : 'Initial Inquiry')}
               </span></div>
             </div>
          </div>

          {/* Section 2: Project Scope */}
          <div style={{ marginBottom: '40px' }}>
             <h3 style={{ fontSize: '18px', color: '#1D4ED8', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '20px', fontWeight: 800 }}>
                {lang === 'ar' ? 'نطاق المشروع والتفاصيل' : 'Project Scope & Details'}
             </h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '15px', marginBottom: '25px' }}>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'اسم المشروع / الفكرة:' : 'Project Name:'}</strong> <span style={{color:'#444'}}>{formData.projectName}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'الخدمة المطلوبة:' : 'Service:'}</strong> <span style={{color:'#444'}}>{projectTypes.find(p => p.id === formData.projectType)?.label}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'الميزانية المتوقعة:' : 'Budget:'}</strong> <span style={{color:'#444'}}>{budgetOptions.find(p => p.id === formData.budget)?.label}</span></div>
               <div><strong style={{ color: '#111' }}>{lang === 'ar' ? 'الوقت المتوقع للتسليم:' : 'Timeline:'}</strong> <span style={{color:'#444'}}>{timelineOptions.find(p => p.id === formData.timeline)?.label}</span></div>
             </div>
             
             <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: formData.references ? '20px' : '0' }}>
               <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#334155', fontWeight: 800 }}>{lang === 'ar' ? 'الوصف التفصيلي:' : 'Detailed Description:'}</h4>
               <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8, color: '#475569', whiteSpace: 'pre-wrap' }}>
                 {formData.description}
               </p>
             </div>
             
             {formData.references && (
               <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                 <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#334155', fontWeight: 800 }}>{lang === 'ar' ? 'المراجع والمشاريع المشابهة:' : 'References:'}</h4>
                 <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8, color: '#475569', whiteSpace: 'pre-wrap' }}>
                   {formData.references}
                 </p>
               </div>
             )}
          </div>

          {/* Section 3: Terms & Conditions */}
          <div style={{ marginBottom: '30px' }}>
             <h3 style={{ fontSize: '18px', color: '#1D4ED8', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '15px', fontWeight: 800 }}>
                {lang === 'ar' ? 'الشروط والأحكام القياسية (Terms & Conditions)' : 'Standard Terms & Conditions'}
             </h3>
             <ul style={{ margin: 0, paddingLeft: lang === 'ar' ? '0' : '20px', paddingRight: lang === 'ar' ? '20px' : '0', fontSize: '12px', lineHeight: 1.8, color: '#444' }}>
               <li style={{ marginBottom: '6px' }}><strong>{lang === 'ar' ? 'مراحل الدفع:' : 'Payment Terms:'}</strong> {lang === 'ar' ? 'يتم سداد 25% كدفعة مقدمة لجدولة وبدء العمل، و 75% المتبقية تُسدد عند تسليم المشروع النهائي والموافقة عليه.' : 'A 25% upfront payment is required to commence work. The remaining 75% is due upon final delivery.'}</li>
               <li style={{ marginBottom: '6px' }}><strong>{lang === 'ar' ? 'سياسة الإلغاء:' : 'Cancellation Policy:'}</strong> {lang === 'ar' ? 'لا يحق للعميل الإلغاء أو استرداد الدفعة المقدمة بعد تسليم النسخة المبدئية (Draft) للمشروع، وذلك ضماناً للجهد والوقت المبذول.' : 'No cancellation or refund of the upfront payment is allowed after the initial draft is delivered.'}</li>
               <li style={{ marginBottom: '6px' }}><strong>{lang === 'ar' ? 'نطاق التعديلات:' : 'Revisions & Scope:'}</strong> {lang === 'ar' ? 'يحق للعميل طلب تعديلات ضمن النطاق المتفق عليه بالوثيقة. الميزات الجذرية الإضافية خارج النطاق تخضع لتقييم وتكلفة منفصلة.' : 'Revisions are allowed within the agreed scope. Radical features outside this scope will incur extra costs.'}</li>
               <li style={{ marginBottom: '6px' }}><strong>{lang === 'ar' ? 'المحتوى:' : 'Content Responsibility:'}</strong> {lang === 'ar' ? 'يلتزم العميل بتوفير كافة النصوص، الصور، والشعارات المطلوبة للمشروع في الوقت المحدد لتجنب تأخير التسليم.' : 'The client is responsible for providing all content (text, images, logos) timely to avoid delays.'}</li>
               <li style={{ marginBottom: '6px' }}><strong>{lang === 'ar' ? 'الجدول الزمني:' : 'Timeline:'}</strong> {lang === 'ar' ? 'يبدأ احتساب وقت التسليم المتوقع فور استلام الدفعة المقدمة وتوفر جميع متطلبات المشروع الأساسية من العميل.' : 'The timeline starts immediately after the upfront payment is received and all project requirements are provided.'}</li>
             </ul>
          </div>

          {/* Spacer to push footer down */}
          <div style={{ flexGrow: 1 }}></div>

          {/* Footer / Signature block */}
          <div style={{ paddingTop: '30px', borderTop: '2px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
             <div>
               <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b' }}>{lang === 'ar' ? 'توقيع العميل (إلكتروني)' : 'Client Signature (Digital)'}</p>
               <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', fontFamily: 'serif', fontStyle: 'italic', color: '#0f172a' }}>{formData.clientName}</p>
             </div>
             <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
               <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b' }}>{lang === 'ar' ? 'توثيق النظام والمطابقة' : 'System Auth & Validation'}</p>
               <p style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', color: '#94a3b8', letterSpacing: '1px' }}>
                 {Date.now().toString(16).toUpperCase()}-{Math.floor(Math.random() * 9000)}
               </p>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
