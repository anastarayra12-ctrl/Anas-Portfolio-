import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Sparkles, X, MessageSquare, Rocket, ShieldCheck, Heart } from 'lucide-react';

export const WhatsAppSuccessModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 11000,
          backgroundColor: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(14px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(560px, 92vw)',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid rgba(37, 211, 102, 0.4)',
            borderRadius: '28px',
            boxShadow: '0 30px 90px rgba(37, 211, 102, 0.25)',
            overflow: 'hidden',
            textAlign: 'center',
            position: 'relative',
            padding: '36px 28px 32px 28px',
          }}
        >
          {/* Top Decorative Banner */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #25D366 0%, #3B82F6 50%, #EC4899 100%)',
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: lang === 'ar' ? 'auto' : '18px',
              left: lang === 'ar' ? '18px' : 'auto',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          {/* Glowing Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 12px 30px rgba(37, 211, 102, 0.4)',
            }}
          >
            <Rocket size={42} />
          </motion.div>

          {/* Heading */}
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '12px', color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {lang === 'ar' ? 'شكراً لاختيارك العمل والتصميم مع أنس الطرايرة! 🎉' : 'Thank You for Choosing to Build & Design with Anas! 🎉'}
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '26px' }}>
            {lang === 'ar'
              ? 'تم تجهيز وتوجيه تفاصيل مشروعك إلى الواتساب بنجاح. يسعدني جداً تواصلك وسأقوم بالرد عليك ومراجعة كافة المتطلبات في أسرع وقت ممكن!'
              : 'Your project brief was successfully sent via WhatsApp. I am excited to collaborate with you and will review your specifications right away!'}
          </p>

          {/* Marketing Perks Checklist */}
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <CheckCircle2 size={20} style={{ color: '#25D366', flexShrink: 0 }} />
              <span>{lang === 'ar' ? 'استجابة فورية واستشارة برمجية وتصميمية شاملة' : 'Fast response & comprehensive technical consultation'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <Sparkles size={20} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
              <span>{lang === 'ar' ? 'تصميم واجهات وتجارب مستخدم مخصصة تعكس هويتك' : 'Custom UI/UX design systems tailored to your brand'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <ShieldCheck size={20} style={{ color: '#818CF8', flexShrink: 0 }} />
              <span>{lang === 'ar' ? 'كود برمتجه أمني عالي الأداء مع تسليم في الوقت المحدد' : 'High performance, secure code architecture & on-time delivery'}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              width: '100%',
              padding: '15px 28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #25D366 0%, #10B981 100%)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(37, 211, 102, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Heart size={18} />
            <span>{lang === 'ar' ? 'رائع، أتطلع لبدء العمل معاً!' : 'Awesome, Looking Forward to Starting!'}</span>
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
