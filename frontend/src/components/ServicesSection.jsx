import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Code2, Palette, Layers, Sparkles, ArrowUpRight } from 'lucide-react';

export const ServicesSection = () => {
  const { lang } = useLanguage();

  const servicesList = [
    {
      id: 'fullstack',
      icon: Code2,
      title: lang === 'ar' ? 'تطوير وبناء المواقع' : 'Full-Stack Web Development',
      description: lang === 'ar' 
        ? 'بناء مواقع إلكترونية وتطبيقات ويب كاملة من بداية الفكرة وتخطيط النظام، وكتابة كود نظيف وآمن، وصولاً إلى الرفع المباشر على السيرفرات (Deployment) ليكون متاحاً للعالم.'
        : 'Building full web applications from initial concept and system architecture, writing clean and secure code, all the way to server deployment.',
      bgColor: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', // Deep blue
      badge: 'C# / .NET / Angular',
    },
    {
      id: 'uiux',
      icon: Layers,
      title: lang === 'ar' ? 'تصميم واجهات وتجربة المستخدم' : 'UI/UX Design & Prototyping',
      description: lang === 'ar' 
        ? 'تصميم واجهات مواقع وتطبيقات تفاعلية عصرية وجذابة، مع التركيز على سهولة الاستخدام وتوفير تجربة مستخدم (UX) مريحة واستثنائية تخدم أهداف مشروعك.'
        : 'Designing modern, attractive UI for web and mobile apps, with a strong focus on usability and delivering an exceptional user experience (UX).',
      bgColor: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', // Indigo
      badge: 'Figma Design',
    },
    {
      id: 'graphic',
      icon: Palette,
      title: lang === 'ar' ? 'تصميم الجرافيك والهوية البصرية' : 'Graphic Design & Branding',
      description: lang === 'ar' 
        ? 'جرافيك ديزاين احترافي، بناء العلامات التجارية (Branding)، ابتكار الشعارات (Logo)، وتصاميم السوشيال ميديا والتعديل المتقدم.'
        : 'Professional graphic design, branding, logo creation, social media designs, and advanced media editing.',
      bgColor: 'linear-gradient(135deg, #4a044e 0%, #be185d 100%)', // Magenta/Pink
      badge: 'Photoshop & Illustrator',
    },
  ];

  return (
    <section id="services" style={{ borderTop: '1px solid var(--border-color)', paddingBottom: '150px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header (Matching Projects) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '16px' }}>
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'الخدمات والحلول' : 'Services & Solutions'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '12px' }}>
            {lang === 'ar' ? 'مهاراتي وخدماتي' : 'Skills & Services'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'ar' 
              ? 'أنا لا أكتب الكود فقط، بل أصنع حلولاً متكاملة. أجمع بين القوة البرمجية واللمسة الفنية لضمان خروج مشروعك بأفضل صورة ممكنة.' 
              : 'I don\'t just write code, I build complete solutions. I combine technical power with an artistic touch to ensure your project comes out perfectly.'}
          </p>
        </motion.div>

        {/* Stacked Cards Container (Exactly like Projects) */}
        <div style={{ position: 'relative', marginTop: '40px' }}>
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                style={{
                  position: 'sticky',
                  top: `calc(120px + ${index * 35}px)`, // Stick each card slightly lower than the previous
                  marginBottom: index === servicesList.length - 1 ? '0' : '15vh', // Space before next card comes up
                  zIndex: index, // Ensure stacking order is correct
                }}
              >
                <div
                  style={{
                    background: service.bgColor,
                    borderRadius: '32px',
                    minHeight: '450px',
                    padding: '40px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 -15px 40px rgba(0,0,0,0.4)', // Dark shadow on top to separate from card below
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transformOrigin: 'top center',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className="group hover:scale-[1.02]"
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>

                  {/* Top content: Badge & Icon */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="px-5 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-widest shadow-sm">
                      {service.badge}
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-xl">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Bottom content: Title & Description */}
                  <div className="relative z-10 mt-20">
                    <h3 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/85 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
