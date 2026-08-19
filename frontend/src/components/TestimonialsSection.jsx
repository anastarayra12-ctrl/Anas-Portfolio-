import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTestimonialsStore } from '../store/useTestimonialsStore';
import { Quote, ChevronLeft, ChevronRight, MessageSquareQuote, Sparkles } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

export const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const { testimonials } = useTestimonialsStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '80px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '14px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'آراء المشرفين والخبراء' : 'Testimonials & Reviews'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'ماذا يقول الآخرون عن عملي' : 'What People Say'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'ar' 
              ? 'انطباعات وتقييمات مهندسين ومعلمين أشرفوا على مشاريعي البرمجية وتصاميمي التفاعلية.'
              : 'Feedback from software leads and design mentors who supervised my technical projects.'}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          
          {/* Main Card Animated Container */}
          <div style={{ minHeight: '280px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: isRTL ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: isRTL ? 30 : -30 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <MagneticElement strength={0.15} style={{ width: '100%' }}>
                  <div
                    className="glass-card"
                    style={{
                      padding: '36px',
                      borderRadius: '24px',
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      position: 'relative',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Decorative Background Quote Icon */}
                    <div style={{ position: 'absolute', top: '24px', right: isRTL ? 'auto' : '28px', left: isRTL ? '28px' : 'auto', color: 'var(--accent-blue)', opacity: 0.15 }}>
                      <Quote size={54} />
                    </div>

                    {/* Testimonial Quote Text */}
                    <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500, marginBottom: '28px', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                      "{typeof testimonials[currentIndex].quote === 'object' ? testimonials[currentIndex].quote[lang] : testimonials[currentIndex].quote}"
                    </p>

                    {/* Author Meta Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Avatar Image or Initial Fallback Badge */}
                      {testimonials[currentIndex].avatar ? (
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={typeof testimonials[currentIndex].name === 'object' ? testimonials[currentIndex].name[lang] : testimonials[currentIndex].name}
                          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-blue)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '1.3rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px var(--accent-blue-glow)',
                        }}>
                          {testimonials[currentIndex].initials}
                        </div>
                      )}

                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          {typeof testimonials[currentIndex].name === 'object' ? testimonials[currentIndex].name[lang] : testimonials[currentIndex].name}
                        </h3>
                        <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '2px' }}>
                          {typeof testimonials[currentIndex].role === 'object' ? testimonials[currentIndex].role[lang] : testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </MagneticElement>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls: Navigation Arrows & Indicator Dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: currentIndex === idx ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '100px',
                    backgroundColor: currentIndex === idx ? 'var(--accent-blue)' : 'var(--border-color)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 300ms ease',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={isRTL ? nextSlide : prevSlide}
                aria-label="Previous testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={isRTL ? prevSlide : nextSlide}
                aria-label="Next testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
