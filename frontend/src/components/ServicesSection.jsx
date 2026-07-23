import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Code2, Palette, Layers, Sparkles, CheckCircle2, Zap, Clock, Rocket, ShieldCheck, Target } from 'lucide-react';

export const ServicesSection = ({ onNavigate }) => {
  const { lang } = useLanguage();

  const servicesList = [
    {
      id: 'fullstack',
      icon: Code2,
      title: lang === 'ar' ? 'تطوير وبناء المواقع (Web Development)' : 'Full-Stack Web Development',
      description: lang === 'ar' 
        ? 'بناء مواقع إلكترونية وتطبيقات ويب كاملة من بداية الفكرة وتخطيط النظام، وكتابة كود نظيف وآمن، وصولاً إلى الرفع المباشر على السيرفرات (Deployment) ليكون متاحاً للعالم.'
        : 'Building full web applications from initial concept and system architecture, writing clean and secure code, all the way to server deployment.',
      color: '#3B82F6',
      badge: 'C# / .NET / Angular',
    },
    {
      id: 'uiux',
      icon: Layers,
      title: lang === 'ar' ? 'تصميم واجهات وتجربة المستخدم (UI/UX)' : 'UI/UX Design & Prototyping',
      description: lang === 'ar' 
        ? 'تصميم واجهات مواقع وتطبيقات تفاعلية عصرية وجذابة، مع التركيز على سهولة الاستخدام وتوفير تجربة مستخدم (UX) مريحة واستثنائية تخدم أهداف مشروعك.'
        : 'Designing modern, attractive UI for web and mobile apps, with a strong focus on usability and delivering an exceptional user experience (UX).',
      color: '#818CF8',
      badge: 'Figma Design',
    },
    {
      id: 'graphic',
      icon: Palette,
      title: lang === 'ar' ? 'تصميم الجرافيك والهوية البصرية' : 'Graphic Design & Branding',
      description: lang === 'ar' 
        ? 'جرافيك ديزاين احترافي، بناء العلامات التجارية (Branding)، ابتكار الشعارات (Logo Creator)، وتصاميم السوشيال ميديا والتعديل المتقدم.'
        : 'Professional graphic design, branding, logo creation, social media designs, and advanced media editing.',
      color: '#EC4899',
      badge: 'Photoshop',
    },
  ];

  const whyChooseUs = [
    {
      icon: Target,
      text: lang === 'ar' ? 'رؤية متكاملة (مبرمج ومصمم بنفس الوقت)' : 'Integrated Vision (Developer + Designer)'
    },
    {
      icon: Clock,
      text: lang === 'ar' ? 'التزام تام بالمواعيد وتسليم بالوقت المحدد' : 'Strict adherence to deadlines and exact delivery'
    },
    {
      icon: ShieldCheck,
      text: lang === 'ar' ? 'جودة عالية، كود نظيف، وتصاميم حديثة' : 'High quality, clean code, and modern designs'
    },
  ];

  return (
    <section id="services" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color 250ms ease', padding: '100px 0' }}>
      <div className="container">
        
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '80px', 
            alignItems: 'center',
            marginBottom: '80px'
          }}
        >
          {/* Left Column: The Pitch */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', alignSelf: 'flex-start' }}>
              <Sparkles size={16} />
              <span>{lang === 'ar' ? 'سيرفس أند سوليوشن' : 'Services & Solutions'}</span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2 }}>
              {lang === 'ar' ? 'لماذا تختارني لتنفيذ مشروعك القادم؟' : 'Why Choose Me For Your Next Project?'}
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {lang === 'ar' 
                ? 'أنا لا أكتب الكود فقط، بل أصنع حلولاً متكاملة. كمهندس برمجيات ومصمم، أجمع بين القوة البرمجية واللمسة الفنية لضمان خروج مشروعك بأفضل صورة ممكنة. سأكون معك من مجرد فكرة بسيطة وحتى إطلاق المشروع ورفعه على السيرفرات.'
                : 'I don\'t just write code, I build complete solutions. As a software engineer and designer, I combine technical power with an artistic touch to ensure your project comes out perfectly. I will be with you from a simple idea to the final launch.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              {whyChooseUs.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '16px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                      <Icon size={20} />
                    </div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{point.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: The Services */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {servicesList.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card"
                  style={{
                    padding: '32px',
                    display: 'flex',
                    gap: '24px',
                    borderLeft: `4px solid ${service.color}`,
                    alignItems: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent size={30} />
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {service.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', backgroundColor: 'var(--bg-primary)', color: service.color, border: '1px solid var(--border-color)' }}>
                        {service.badge}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Box */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            padding: '44px 36px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
            border: '2px solid var(--accent-blue)',
            boxShadow: '0 24px 60px rgba(59, 130, 246, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25 }}>
              {lang === 'ar' ? 'جاهز لنحول فكرتك إلى واقع رقمي مذهل؟' : 'Ready to turn your idea into a stunning digital reality?'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              {lang === 'ar' ? 'سواء كنت تحتاج لتصميم شعار، واجهة تطبيق، أو بناء نظام متكامل، أنا هنا لمساعدتك.' : 'Whether you need a logo, an app UI, or a complete system, I am here to help.'}
            </p>
          </div>

          <motion.button
            onClick={() => onNavigate('start-project')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 40px',
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
              cursor: 'pointer',
            }}
          >
            <Rocket size={22} />
            <span>{lang === 'ar' ? 'ابدأ مشروعك معي الآن' : 'Start Your Project With Me'}</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
