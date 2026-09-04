import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Sparkles, Cpu, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const QuickNotesSection = () => {
  const { lang } = useLanguage();

  const notes = [
    {
      title: lang === 'ar' ? 'لماذا اخترت دمج .NET 9 مع Angular 17؟' : 'Why .NET 9 + Angular 17+',
      date: 'Feb 2026',
      tag: 'Architecture',
      text: lang === 'ar'
        ? 'بنية .NET 9 تمنح الأداء العالي جداً في الـ APIs ومعالجة البيانات، بينما توفر Angular 17 نظام تتبع الحالات والصيانة طويل الأجل للمشاريع الضخمة.'
        : '.NET 9 offers unmatched Web API execution speed, paired with Angular 17+ type-safety and long-term enterprise maintainability.',
    },
    {
      title: lang === 'ar' ? 'ثورة Vibe Coding وكتابة الأوامر المتقدمة' : 'The Vibe Coding Workflow Revolution',
      date: 'Jan 2026',
      tag: 'AI Tools',
      text: lang === 'ar'
        ? 'الذكاء الاصطناعي لا يستبدل المبرمج، بل يضاعف سرعته. كتابة الـ Prompts الموجهة بعناية توفر ساعات من العمل التكراري للتركيز على المعمارية.'
        : 'AI does not replace engineers; it amplifies speed. Precision prompts eliminate boilerplate so you focus on architecture.',
    },
    {
      title: lang === 'ar' ? 'الفجوة بين تصميم Figma وكود الإنتاج' : 'Bridging Figma Design to Clean Code',
      date: 'Dec 2025',
      tag: 'UI/UX',
      text: lang === 'ar' ? 'أكبر خطأ هو معالجة التصميم كمرحلة منفصلة عن الكود. البناء بـ Design System موحد يضمن دقة التنفيذ بنسبة 100%.' : 'Treating design separately from code creates friction. Using a shared Design System ensures 100% pixel perfection.',
    },
    {
      title: lang === 'ar' ? 'معايير WCAG والوصول الشامل' : 'Accessibility (WCAG AA) is Non-Negotiable',
      date: 'Nov 2025',
      tag: 'Frontend',
      text: lang === 'ar'
        ? 'التصميم الفاخر لا يعني التضحية بسهولة الاستخدام. التباين العالي وإمكانية التنقل بالكيبورد تعزز تجربة كل زائر بدون استثناء.'
        : 'Luxury design shouldn’t sacrifice usability. High contrast & keyboard navigation empower all visitors universally.',
    },
  ];

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
            <BookOpen size={16} />
            <span>{lang === 'ar' ? 'ملاحظات سريعة ورؤى هندسية' : 'Engineering Notes & Philosophy'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '10px' }}>
            {lang === 'ar' ? 'فلسفة التطوير وملاحظات الخبرة' : 'My Stack Philosophy & Quick Notes'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            {lang === 'ar'
              ? 'مقتطفات قصيرة توضح الرؤية المعمارية والقرارات التقنية وراء بناء الأنظمة والمشاريع.'
              : 'Short architectural notes reflecting tech decisions and engineering philosophy.'}
          </p>
        </motion.div>

        {/* Stack Philosophy Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          className="glass-card"
          style={{
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '36px',
            borderLeft: '4px solid var(--accent-blue)',
            backgroundColor: 'rgba(59, 130, 246, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Cpu size={22} style={{ color: 'var(--accent-blue)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
              {lang === 'ar' ? 'فلسفة بيئة العمل (My Stack Philosophy)' : 'My Stack Philosophy'}
            </h3>
          </div>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
            {lang === 'ar'
              ? 'أؤمن بأن الحل البرمجي الأفضل هو الذي يجمع بين متانة البنية التحتية (ASP.NET Core 9)، وسلاسة الواجهات التفاعلية (Angular & React)، وسرعة الإنتاجية المدعومة بالذكاء الاصطناعي (Claude & Vibe Coding). هذا المزج يتيح تسليم تطبيقات جاهزة للإنتاج بكفاءة عالية وبدون تنازلات في الأداء.'
              : 'I believe the ideal software solution merges robust backend architecture (ASP.NET Core 9), seamless frontend interactivity (Angular & React), and AI-augmented execution speed (Claude & Vibe Coding). This hybrid stack delivers enterprise-ready applications with zero compromise on performance or UX.'}
          </p>
        </motion.div>

        {/* Quick Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {notes.map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>
                    {note.tag}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{note.date}</span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {note.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {note.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
