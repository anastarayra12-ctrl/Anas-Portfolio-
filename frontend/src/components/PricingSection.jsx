import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { DollarSign, CheckCircle2, Calendar, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const PricingSection = ({ onBookMeeting }) => {
  const { lang } = useLanguage();

  const packages = [
    {
      title: lang === 'ar' ? 'تصميم واجهات وأنظمة UI/UX' : 'UI/UX Design Package',
      range: '$400 – $800',
      period: lang === 'ar' ? '1 – 2 أسابيع' : '1 – 2 Weeks',
      features: [
        lang === 'ar' ? 'دراسة تجربة المستخدم والبروتوتايب' : 'UX Research & Interactive Prototype',
        lang === 'ar' ? 'نظام مكونات متكامل في Figma' : 'Figma Design System & Components',
        lang === 'ar' ? 'تسليم أصول بكسل بيكسل للمطورين' : 'Pixel-perfect Developer Handoff',
      ],
      highlight: false,
    },
    {
      title: lang === 'ar' ? 'تطبيق ويب متكامل (Full-Stack)' : 'Full-Stack Web Application',
      range: '$1,200 – $2,500',
      period: lang === 'ar' ? '3 – 5 أسابيع' : '3 – 5 Weeks',
      features: [
        lang === 'ar' ? 'واجهة خلفية .NET 9 Web API وقواعد بيانات' : 'C# .NET 9 Web API & SQL Database',
        lang === 'ar' ? 'واجهة أمامية بـ Angular 17+ أو React 19' : 'Angular 17+ or React 19 Frontend',
        lang === 'ar' ? 'أمان، مصادقة، وأنيميشن سلس' : 'Auth, Security, & Smooth Animations',
      ],
      highlight: true,
    },
    {
      title: lang === 'ar' ? 'موقع هبوط فاخر (Landing Page)' : 'Premium Landing Page',
      range: '$300 – $600',
      period: lang === 'ar' ? '1 – 2 أسابيع' : '1 – 2 Weeks',
      features: [
        lang === 'ar' ? 'تصميم زجاجي فاخر متوافق مع الموبايل' : 'Responsive Glassmorphic Design',
        lang === 'ar' ? 'تحسين محركات البحث SEO والأداء 100%' : '100% SEO & Speed Optimization',
        lang === 'ar' ? 'ربط النماذج والواتساب التفاعلي' : 'Forms & WhatsApp Chat Integration',
      ],
      highlight: false,
    },
  ];

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          style={{ textAlign: 'center', marginBottom: '44px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
            <DollarSign size={16} />
            <span>{lang === 'ar' ? 'تقديرات التكلفة والخدمات' : 'Transparent Pricing Estimates'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '10px' }}>
            {lang === 'ar' ? 'تقديرات الاستثمار للمشاريع' : 'Transparent Investment Ranges'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            {lang === 'ar'
              ? 'نطاقات سعيرية تقريبية مبنية على حجم ونطاق العمل. الأسعار النهائية تحدد بعد المناقشة.'
              : 'Approximate ranges based on scope and requirements. Final quotes provided after initial call.'}
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="glass-card"
              style={{
                padding: '32px 24px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pkg.highlight ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                boxShadow: pkg.highlight ? '0 12px 30px var(--accent-blue-glow)' : 'none',
                position: 'relative',
              }}
            >
              {pkg.highlight && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-blue)', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: '100px', textTransform: 'uppercase' }}>
                  {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {pkg.title}
                </h3>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '4px' }}>
                  {pkg.range}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {lang === 'ar' ? 'المدة التقديرية:' : 'Est. Timeline:'} {pkg.period}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onBookMeeting}
                className={pkg.highlight ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={16} />
                <span>{lang === 'ar' ? 'احجز مكالمة مناقشة' : 'Book Scope Call'}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          <HelpCircle size={15} />
          <span>{lang === 'ar' ? 'تنويه: الأرقام أعلاه تقديرية، ويتم تحديد السعر والدفعات الدقيقة بعد الاتفاق على المواصفات.' : 'Note: Pricing is estimated. Exact scope & payment milestones defined during consultation.'}</span>
        </div>

      </div>
    </section>
  );
};
