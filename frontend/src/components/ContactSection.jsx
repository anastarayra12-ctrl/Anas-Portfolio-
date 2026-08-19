import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import useChatFormStore from '../store/useChatFormStore';
import { ConstellationBackground } from './ConstellationBackground';
import { MagneticElement } from './MagneticElement';
import {
  Send,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Mail,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  Bot
} from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactSection = ({ onWhatsAppSent }) => {
  const { lang } = useLanguage();
  const { addToast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';

  const { step, answers, errorMsg, setStep, setAnswer, setErrorMsg, nextStep, prevStep, resetForm } = useChatFormStore();

  const [inputVal, setInputVal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "anastarayra12@gmail.com";
  const phoneNumber = "+962 7 9685 1497";

  useEffect(() => {
    if (step === 0) setInputVal(answers.name);
    else if (step === 1) setInputVal(answers.email);
    else if (step === 2) setInputVal(answers.message);
  }, [step, answers]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleStepSubmit = (e) => {
    if (e) e.preventDefault();

    if (step === 0) {
      if (!inputVal.trim()) {
        setErrorMsg(isRTL ? 'الرجاء إدخال اسمك أولاً' : 'Please enter your name first');
        return;
      }
      setAnswer('name', inputVal.trim());
      setInputVal('');
      nextStep();
    } else if (step === 1) {
      if (!validateEmail(inputVal.trim())) {
        setErrorMsg(isRTL ? 'الرجاء إدخال بريد إلكتروني صحيح (مثال: name@example.com)' : 'Please enter a valid email address');
        return;
      }
      setAnswer('email', inputVal.trim());
      setInputVal('');
      nextStep();
    } else if (step === 2) {
      if (!inputVal.trim()) {
        setErrorMsg(isRTL ? 'الرجاء كتابة تفاصيل مشروعك أو رسالتك' : 'Please write your message or project details');
        return;
      }
      setAnswer('message', inputVal.trim());
      nextStep();
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setStep(4);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        setTimeout(() => {
          setSubmitting(false);
          setStep(5);
          addToast(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!', 'success');
        }, 1200);
        return;
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio Message from ${answers.name}`,
          from_name: answers.name,
          email: answers.email,
          message: answers.message
        }),
      });
      const data = await res.json();

      setSubmitting(false);
      if (res.ok && data.success) {
        setStep(5);
        addToast(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!', 'success');
      } else {
        setStep(3);
        setErrorMsg(isRTL ? 'حدث خطأ أثناء الإرسال، حاول مجدداً' : 'Failed to send message, please try again');
      }
    } catch (err) {
      setSubmitting(false);
      setStep(3);
      setErrorMsg(isRTL ? 'تأكد من اتصالك بالإنترنت' : 'Network Error');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    addToast(isRTL ? 'تم نسخ البريد الإلكتروني!' : 'Email copied to clipboard!', 'info');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const formatWhatsAppMessage = (name, email, message) => {
    if (isRTL) {
      return (
        `مرحباً أنس 👋\n\n` +
        `أنا *${name}*، حابّ أتواصل معك.\n\n` +
        `📩 *بيانات التواصل:*\n` +
        `• *البريد الإلكتروني:* ${email}\n\n` +
        `📌 *الرسالة:*\n` +
        `"${message}"\n\n` +
        `يسعدني التواصل معك قريباً! ✨`
      );
    } else {
      return (
        `Hello Anas 👋\n\n` +
        `I am *${name}*, reaching out to connect with you.\n\n` +
        `📩 *Contact Details:*\n` +
        `• *Email:* ${email}\n\n` +
        `📌 *Message:*\n` +
        `"${message}"\n\n` +
        `Looking forward to connecting with you! ✨`
      );
    }
  };

  const handleWhatsAppSubmit = () => {
    const text = formatWhatsAppMessage(answers.name, answers.email, answers.message);
    const waUrl = `https://wa.me/962796851497?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    if (onWhatsAppSent) onWhatsAppSent();

    handleFinalSubmit();
  };

  const bubbleVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  };

  return (
    <section id="contact" style={{ position: 'relative', borderTop: '1px solid var(--border-color)', paddingTop: '90px', paddingBottom: '110px', overflow: 'hidden' }}>
      
      {/* Layer 1: Constellation 2D Canvas Background */}
      <ConstellationBackground />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1040px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: '44px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{isRTL ? 'تواصل معي مباشرة' : 'Get in Touch'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {isRTL ? 'لنتحدث عن مشروعك القادم' : "Let's Talk About Your Project"}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            {isRTL 
              ? 'تواصل عبر بطاقات التواصل المباشرة أو المحادثة التفاعلية الفورية.'
              : 'Connect via direct contact cards or instant interactive live chat.'}
          </p>
        </motion.div>

        {/* Swapped 2-Column Grid (Column 1: Ordered Contact Cards / Column 2: Chat Window) */}
        <div className="contact-dual-grid" style={{ gridTemplateColumns: '1fr 1.25fr' }}>
          
          {/* Ordered Modern Contact Cards (Email -> Phone -> LinkedIn -> GitHub) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Card 1: البريد الإلكتروني (Email) */}
            <MagneticElement strength={0.15} style={{ width: '100%' }}>
              <div
                className="glass-card"
                onClick={handleCopyEmail}
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block' }}>
                      {isRTL ? 'البريد الإلكتروني (Email)' : 'Email Address'}
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {emailAddress}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: copiedEmail ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: copiedEmail ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                    color: copiedEmail ? 'var(--accent-green)' : 'var(--text-secondary)',
                    borderRadius: '10px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </MagneticElement>

            {/* Card 2: الرقم / واتساب (Phone & WhatsApp) */}
            <MagneticElement strength={0.15} style={{ width: '100%' }}>
              <a
                href="https://wa.me/962796851497"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsAppSent && onWhatsAppSent()}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 300ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {isRTL ? 'الرقم / واتساب' : 'Phone / WhatsApp'}
                        </span>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', backgroundColor: 'rgba(37, 211, 102, 0.18)', color: '#25D366', fontWeight: 700 }}>
                          {isRTL ? 'مباشر' : 'Direct'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {phoneNumber}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={18} style={{ color: '#25D366' }} />
                </div>
              </a>
            </MagneticElement>

            {/* Card 3: لينكدإن (LinkedIn) */}
            <MagneticElement strength={0.15} style={{ width: '100%' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 300ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LinkedinIcon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          LinkedIn
                        </span>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', backgroundColor: 'rgba(6, 182, 212, 0.18)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                          {isRTL ? 'تواصل' : 'Connect'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Anas Al-Tarayrah
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </a>
            </MagneticElement>

            {/* Card 4: قيتهب (GitHub) */}
            <MagneticElement strength={0.15} style={{ width: '100%' }}>
              <a
                href="https://github.com/anastarayra12-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 300ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <GithubIcon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          GitHub
                        </span>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', backgroundColor: 'rgba(34, 197, 94, 0.18)', color: '#22C55E', fontWeight: 700 }}>
                          {isRTL ? 'المشاريع' : 'Profile'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        @anastarayra12-ctrl
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </a>
            </MagneticElement>
          </motion.div>

          {/* Glassmorphism Chat Interface (Now on the Right / Opposite side) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="chat-window" style={{ maxWidth: '100%' }}>
              
              {/* Chat Top Bar Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Anas Assistant</span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {isRTL ? 'مساعد تفاعلي مباشر' : 'Live Interactive Assistant'}
                    </span>
                  </div>
                </div>

                {step < 4 && (
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '4px 12px', borderRadius: '100px' }}>
                    {isRTL ? `الخطوة ${step + 1} من 3` : `Step ${step + 1} of 3`}
                  </div>
                )}
              </div>

              {/* Chat Messages Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  
                  {/* Step 0: Name */}
                  {step === 0 && (
                    <motion.div key="step-0" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="chat-bubble-bot">
                        👋 {isRTL ? 'أهلاً بك! أنا أنس الطرايرة، ما هو اسمك الكريم؟' : "Welcome! I'm Anas Al-Tarayrah, what's your name?"}
                      </div>

                      <form onSubmit={handleStepSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                        <input
                          type="text"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder={isRTL ? 'اكتب اسمك هنا...' : 'Type your name...'}
                          className="chat-underline-input"
                          autoFocus
                        />
                        <MagneticElement strength={0.2}>
                          <button
                            type="submit"
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--accent-blue)',
                              color: '#FFFFFF',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 15px var(--accent-blue-glow)',
                              flexShrink: 0,
                            }}
                          >
                            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                          </button>
                        </MagneticElement>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 1: Email */}
                  {step === 1 && (
                    <motion.div key="step-1" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="chat-bubble-user">
                        {answers.name}
                      </div>

                      <div className="chat-bubble-bot">
                        {isRTL ? `أهلاً وسهلاً بك يا ${answers.name}! 🤝 ما هو بريدك الإلكتروني لنتمكن من التواصل؟` : `Great to meet you ${answers.name}! 🤝 What is your email address?`}
                      </div>

                      <form onSubmit={handleStepSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                        <input
                          type="email"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder="name@example.com"
                          className="chat-underline-input"
                          autoFocus
                        />
                        <MagneticElement strength={0.2}>
                          <button
                            type="submit"
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--accent-blue)',
                              color: '#FFFFFF',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 15px var(--accent-blue-glow)',
                              flexShrink: 0,
                            }}
                          >
                            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                          </button>
                        </MagneticElement>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 2: Message */}
                  {step === 2 && (
                    <motion.div key="step-2" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="chat-bubble-user">
                        {answers.email}
                      </div>

                      <div className="chat-bubble-bot">
                        {isRTL ? 'ممتاز! احكيلي عن تفاصيل مشروعك أو استفسارك؟ 💡' : 'Awesome! Tell me about your project details or inquiry 💡'}
                      </div>

                      <form onSubmit={handleStepSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
                        <textarea
                          rows={3}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder={isRTL ? 'اكتب تفاصيل مشروعك أو رسالتك هنا...' : 'Write your project details or message here...'}
                          className="chat-underline-input"
                          style={{ resize: 'vertical' }}
                          autoFocus
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                          <MagneticElement strength={0.2}>
                            <button
                              type="submit"
                              className="btn-primary"
                              style={{ padding: '10px 22px', fontSize: '0.92rem' }}
                            >
                              <span>{isRTL ? 'مراجعة الرسالة' : 'Review Message'}</span>
                              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                            </button>
                          </MagneticElement>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 3: Review & Confirm */}
                  {step === 3 && (
                    <motion.div key="step-3" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="chat-bubble-bot">
                        {isRTL 
                          ? `تمام يا ${answers.name}! سيتم إرسال تفاصيل مشروعك من بريدك (${answers.email}). هل تؤكد الإرسال؟`
                          : `All set ${answers.name}! Your message will be sent via (${answers.email}). Do you confirm?`}
                      </div>

                      <div style={{ padding: '16px 20px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        <div style={{ fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '4px' }}>
                          {answers.name} ({answers.email})
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          "{answers.message}"
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={prevStep}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '12px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                          }}
                        >
                          <Edit2 size={15} />
                          <span>{isRTL ? 'تعديل' : 'Edit'}</span>
                        </button>

                        <MagneticElement strength={0.2}>
                          <button
                            onClick={handleWhatsAppSubmit}
                            style={{
                              backgroundColor: '#25D366',
                              color: '#FFFFFF',
                              padding: '10px 20px',
                              borderRadius: '12px',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                            }}
                          >
                            <MessageSquare size={17} />
                            <span>{isRTL ? 'إرسال عبر WhatsApp 💬' : 'Send via WhatsApp 💬'}</span>
                          </button>
                        </MagneticElement>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Submitting Typing Indicator */}
                  {step === 4 && (
                    <motion.div key="step-4" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', gap: '16px' }}>
                      <div className="chat-bubble-bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{isRTL ? 'جاري إرسال رسالتك' : 'Sending your message'}</span>
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Success State */}
                  {step === 5 && (
                    <motion.div key="step-5" {...bubbleVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0', gap: '16px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={32} />
                      </div>

                      <div className="chat-bubble-bot" style={{ alignSelf: 'center', textAlign: 'center' }}>
                        🎉 {isRTL 
                          ? 'تم إرسال رسالتك بنجاح! سأطلع على التفاصيل وأرد عليك خلال 24 ساعة عادةً.'
                          : 'Your message has been sent successfully! I will review it and reply within 24 hours.'}
                      </div>

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                        <a
                          href={`https://wa.me/962796851497?text=${encodeURIComponent(formatWhatsAppMessage(answers.name, answers.email, answers.message))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                          }}
                        >
                          <MessageSquare size={16} />
                          <span>{isRTL ? 'متابعة عبر WhatsApp 💬' : 'Follow up on WhatsApp 💬'}</span>
                        </a>

                        <button
                          onClick={resetForm}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 18px',
                            borderRadius: '30px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                          }}
                        >
                          <RefreshCw size={15} />
                          <span>{isRTL ? 'رسالة جديدة' : 'New Message'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {errorMsg && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontSize: '0.85rem', fontWeight: 600, marginTop: '10px' }}>
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
