import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, MessageSquareHeart, Download, Sparkles, Terminal, CheckCircle2, Eye, Quote, ArrowRight } from 'lucide-react';
import { CvModal } from './CvModal';

export const AboutSection = () => {
  const { t, lang } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const personalMessages = [
    'مهما تعبت بتعلّم شي جديد، تذكر إنه طلب العلم عبادة قبل ما يكون مهارة — "وَقُلْ رَبِّ زِدْنِي عِلْمًا" (طه: 114).',
    'إذا حاسس إنك وقفت بمكانك ومش قادر تتقدم، تذكر إنه الله وعدك: "إِنَّ مَعَ الْعُسْرِ يُسْرًا" (الشرح: 6).',
    'النتيجة اللي بتوصلها ما بتجي صدفة، هي ثمرة سعيك — "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ" (النجم: 39).',
    'إذا خايف تاخد قرار مصيري، اعرف إنه التقوى بتفتحلك أبواب ما كنت متوقعها — "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا" (الطلاق: 2).',
    'بعد ما تاخد بكل الأسباب، سيب الباقي لله، لأنه هو خير وكيل — "وَتَوَكَّلْ عَلَى اللَّهِ وَكَفَىٰ بِاللَّهِ وَكِيلًا" (الأحزاب: 3).',
    'قبل ما تبدأ أي شي صعب بحياتك، ادعي بهاي الدعوة، لأنه أصعب شي مش الطريق، هو ثقتك إنك رح توصل — "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي" (طه: 25-26).',
    'لما تاخد قرارك وتبلش بمشروعك، اعتمد على الله وامشي، لأنه هيك علّمنا القرآن — "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ" (آل عمران: 159).',
    'إذا بتحس إنه رزقك تأخر، اعرف إنه ربنا وعدك برضا أكبر من اللي تتخيله — "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ" (الضحى: 5).',
    'لا تتردد تتعلم شي جديد، مهما كان تعبك، لأنه طلب العلم طريق للجنة — "من سلك طريقًا يلتمس فيه علمًا سهّل الله له به طريقًا إلى الجنة" (رواه مسلم).',
    'أي شي بتشتغل عليه، أتقنه، لأنه النبي ﷺ قال: "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه" (رواه الطبراني).',
    'لا تعجز قدام أي تحدي، خذ بالأسباب واستعن بالله — "احرص على ما ينفعك واستعن بالله ولا تعجز" (رواه مسلم).',
    'لو حد ساعدك أو علّمك شي، اشكره صراحة، لأنه "من لا يشكر الناس لا يشكر الله" (رواه أبو داود والترمذي).',
    'إذا قدرت تعلّم حد شي تعرفه، افعلها، لأنه "الدال على الخير كفاعله" (رواه مسلم).',
    'لا تقيس نجاحك بس بالنتيجة، قيسه كمان بطمأنينة قلبك إنه رزقك من عند الله.',
    'أي مهارة عندك هي أمانة، فاستخدمها بطريقة ترضي ربك قبل ما ترضي أي حد تاني.',
    'اجتهد قد ما تقدر، بس لا تنسى الدعاء، لأنه ما بين السعي والتوفيق خيط لازم يكون فيه دعاء صادق.',
    'قبل ما تفتخر بأي إنجاز قدام الناس، اسأل حالك: هل شكرت الله عليه أول؟',
    'إذا بتحب شغلك، اشكر الله عليها بعملك مش بس بكلامك.',
    'كل باب انفتحلك بحياتك، اعرف إنه قبله كان في دعاء استجاب الله له، حتى لو مش متذكر مين دعاه.',
    'لا تكتفي بالعلم اللي بيفتحلك أبواب رزق بس، دور على العلم اللي بيقربك من ربك أكتر — "وَقُلْ رَبِّ زِدْنِي عِلْمًا" (طه: 114).'
  ];

  const [messageIndex, setMessageIndex] = useState(() => Math.floor(Math.random() * personalMessages.length));

  const nextMessage = () => {
    setMessageIndex((prev) => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * personalMessages.length);
      } while (nextIdx === prev);
      return nextIdx;
    });
  };

  const highlights = [
    lang === 'ar' ? 'طالب هندسة برمجيات - سنة ثالثة في جامعة الزيتونة' : 'Third Year Software Engineering Student @ Alzaytoonah University',
    lang === 'ar' ? 'مطور Full-Stack (C# و ASP.NET و Angular)' : 'Full-Stack Developer (C#, ASP.NET, Angular)',
    lang === 'ar' ? 'مصمم واجهات وتجربة مستخدم (UI/UX) ومصمم جرافيك' : 'UI/UX & Graphic Designer',
    lang === 'ar' ? 'تقديم حلول برمجية مبتكرة لمعالجة المشكلات المعقدة' : 'Delivering innovative software solutions for complex problems',
  ];

  return (
    <>
      <section id="about" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color 250ms ease' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '12px' }}>
              {t.about.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              {t.about.subtitle}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
            {/* Left Column: Overview Box (Equal Height) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card"
              style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--accent-blue)' }}>
                  <Terminal size={26} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{lang === 'ar' ? 'نبذة عني (Overview)' : 'Overview'}</h3>
                </div>

                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px' }}>
                  {t.about.bio}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CV Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Eye size={18} />
                  <span>{lang === 'ar' ? 'معاينة السيرة الذاتية' : 'Preview CV'}</span>
                </button>

                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Download size={18} />
                  <span>{t.about.downloadCv}</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Stacked 2 Cards (Top: Education, Bottom: Personal Message) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', justifyContent: 'space-between' }}
            >
              {/* Card 1 (Top): Education */}
              <div
                className="glass-card"
                style={{ padding: '30px', borderLeft: '4px solid var(--accent-blue)', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                      {lang === 'ar' ? 'التعليم والأكاديميا (Education)' : 'Education & Degree'}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alzaytoonah University of Jordan</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    padding: '16px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Sparkles size={16} style={{ color: 'var(--accent-blue)' }} />
                    <h5 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                      {t.about.university}
                    </h5>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {lang === 'ar'
                      ? 'طالب هندسة برمجيات في جامعة الزيتونة الأردنية. أدرس حالياً في السنة الثالثة، ومن المتوقع تخرجي في عام 2028.'
                      : 'Software Engineering Student at Alzaytoonah University of Jordan. Currently in my third year, with an expected graduation in 2028.'}
                  </p>
                </div>
              </div>

              {/* Card 2 (Bottom): Message from Anas (رسالتي لكم) */}
              <div
                className="glass-card"
                style={{ padding: '30px', borderLeft: '4px solid var(--accent-green)', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-green)',
                    }}
                  >
                    <MessageSquareHeart size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                      {lang === 'ar' ? 'رسالتي لكم (Personal Message)' : 'A Message From Anas'}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>Vision & Passion</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                  }}
                >
                  <Quote size={24} style={{ color: 'var(--accent-green)', opacity: 0.3, marginBottom: '8px' }} />
                  <motion.p 
                    key={messageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500, minHeight: '80px', direction: 'rtl', textAlign: 'right' }}
                  >
                    {personalMessages[messageIndex]}
                  </motion.p>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button 
                      onClick={nextMessage}
                      style={{ 
                        background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', cursor: 'pointer', 
                        color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px',
                        fontSize: '0.85rem', fontWeight: 600, padding: '6px 12px', borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                    >
                      {lang === 'ar' ? 'الرسالة التالية' : 'Next Message'}
                      <ArrowRight size={14} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Live CV Preview Modal */}
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </>
  );
};


