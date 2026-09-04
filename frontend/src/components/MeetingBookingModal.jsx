import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Calendar, Clock, X, CheckCircle2, User, Mail, MessageSquare, Send } from 'lucide-react';

export const MeetingBookingModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !date) {
      addToast(lang === 'ar' ? 'الرجاء تعبئة الاسم والإيميل والتاريخ' : 'Please fill in Name, Email, and Date', 'error');
      return;
    }

    setSubmitted(true);
    addToast(lang === 'ar' ? 'تم طلب المكالمة بنجاح! سيتواصل معك أنس لتأكيد الموعد.' : 'Call requested! Anas will confirm the meeting.', 'success');
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
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(580px, 94vw)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: lang === 'ar' ? 'auto' : '20px',
                left: lang === 'ar' ? '20px' : 'auto',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                <Calendar size={16} />
                <span>{lang === 'ar' ? 'مكالمة استشارية 15 دقيقة' : '15-Min Direct Scope Call'}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                {lang === 'ar' ? 'احجز مكالمة مباشرة مع أنس' : 'Schedule a Call with Anas'}
              </h3>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--accent-green)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                  {lang === 'ar' ? 'تم استلام طلب الموعد!' : 'Meeting Request Received!'}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
                  {lang === 'ar'
                    ? `شكراً ${name}. ستصلك رسالة تأكيد على البريد (${email}) لموعد يوم ${date} الساعة ${time} بتوقيت عمان.`
                    : `Thanks ${name}. A confirmation email will be sent to ${email} for ${date} at ${time} Amman Time.`}
                </p>
                <button onClick={onClose} className="btn-primary" style={{ minWidth: '140px' }}>
                  {lang === 'ar' ? 'تم' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    {lang === 'ar' ? 'الاسم الكامل:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل اسمك...' : 'Enter your name...'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === 'ar' ? 'name@example.com' : 'name@example.com'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      {lang === 'ar' ? 'التاريخ المفضل:' : 'Preferred Date:'}
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      {lang === 'ar' ? 'الوقت (توقيت عمان +3):' : 'Time (Amman UTC+3):'}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    >
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                  <Send size={16} />
                  <span>{lang === 'ar' ? 'تأكيد طلب المكالمة' : 'Confirm Meeting Request'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
