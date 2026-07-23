import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact',
    },
    hero: {
      name: 'Anas Tarayra',
      role: 'Full Stack Developer & UI/UX Designer',
      status: 'Available for Projects / Open to Collaborate',
      intro: 'Ambitious about building immersive digital experiences, where elegant design meets refined engineering. Passionate about continuous learning and growth, crafting high-performance applications with a touch of creativity.',
      exploreWork: 'Explore My Work',
      getInTouch: 'Get In Touch',
      runCode: 'Run / Execute',
      codeTitle: 'developer.js',
    },
    about: {
      title: 'About Me',
      subtitle: '',
      bio: "I'm Anas, a Full-Stack Developer working with .NET and Angular, and a Vibe Coder. Alongside development, I design as a UI/UX Designer and Graphic Designer — I love building the idea and designing it in the same moment, not as separate phases. I entered this field out of pure passion, not by accident, and that passion is still the fuel that keeps me learning and experimenting with something new every day. My goal isn't just to have a job — it's to reach a point where my name is associated with genuinely clean, well-crafted work, both in code and in design.",
      university: 'Alzaytoonah University of Jordan — Software Engineering',
      downloadCv: 'Download CV',
      educationTitle: 'Education & Academic Journey',
    },
    skills: {
      title: 'Skills & Certifications',
      mastered: 'Mastered Tech Stack',
      learning: 'Currently Learning',
      tools: 'Tools & Applications',
    },
    courses: {
      title: 'Services & Digital Solutions',
      all: 'All Services',
      webDev: 'Web Development',
      uiux: 'UI / UX Design',
      softwareEng: 'Software Engineering',
      currentlyLearning: 'Services Offered',
      dotnetDesc: 'Building robust, enterprise-grade REST APIs and scalable backend architectures using C# and .NET Core.',
      angularDesc: 'Creating dynamic, reactive single-page frontends using Angular framework & TypeScript.',
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Have a project in mind or want to collaborate? Feel free to reach out!',
      location: 'Amman, Jordan',
      email: 'anastarayra12@gmail.com',
      phone: '0796851497',
      whatsapp: 'Chat on WhatsApp',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      messageLabel: 'Message',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Thank you! Your message has been sent successfully.',
      errorMsg: 'Failed to send message. Please try again.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات والشهادات',
      projects: 'المشاريع والأعمال',
      services: 'خدماتي',
      contact: 'تواصل معي',
    },
    hero: {
      name: 'أنس طرايرة',
      role: 'مطور Full Stack ومصمم UI/UX وغرافيك',
      status: 'جاهز للعمل وبناء المشاريع',
      intro: 'طموح في بناء تجارب رقمية غامرة، حيث يلتقي التصميم الأنيق بالهندسة الدقيقة. شغوف بالتعلم والنمو المستمر، وصياغة تطبيقات عالية الأداء بلمسة من الإبداع.',
      exploreWork: 'استكشف أعمالي',
      getInTouch: 'تواصل معي',
      runCode: 'تشغيل الكود',
      codeTitle: 'developer.js',
    },
    about: {
      title: 'نبذة عني',
      subtitle: '',
      bio: 'أنا أنس، مطور Full-Stack أعمل بتقنيات .NET و Angular، و Vibe Coder. إلى جانب البرمجة، أعمل كمصمم واجهات وتجربة مستخدم (UI/UX) ومصمم جرافيك — أحب بناء الفكرة وتصميمها في نفس اللحظة، وليس كمراحل منفصلة. دخلت هذا المجال بدافع الشغف الخالص وليس صدفة، وهذا الشغف لا يزال هو الوقود الذي يدفعني للتعلم وتجربة شيء جديد كل يوم. هدفي ليس مجرد الحصول على وظيفة — بل الوصول إلى نقطة يرتبط فيها اسمي بالعمل النظيف والمتقن، سواء في الكود أو التصميم.',
      university: 'جامعة الزيتونة الأردنية — هندسة البرمجيات',
      downloadCv: 'تحميل السيرة الذاتية (CV)',
      educationTitle: 'التعليم والمسيرة الأكاديمية',
    },
    skills: {
      title: 'المهارات والشهادات والتطبيقات',
      mastered: 'المهارات التقنية التي أتقنها',
      learning: 'تقنيات قيد التطوير والتعلم',
      tools: 'أدوات التصميم والبرمجة',
    },
    courses: {
      title: 'خدماتي والحلول الرقمية',
      all: 'جميع الخدمات',
      webDev: 'تطوير الويب والـ APIs',
      uiux: 'تصميم الواجهات UI/UX والغرافيك',
      softwareEng: 'هندسة البرمجيات والأنظمة',
      currentlyLearning: 'الخدمات المتاحة للمشاريع',
      dotnetDesc: 'بناء واجهات برمجية RESTful وتطبيقات خلفية متكاملة وقابلة للتوسع باستخدام C# و .NET Core.',
      angularDesc: 'تطوير واجهات مستخدم تفاعلية وسريعة الاستجابة باستخدام إطار عمل Angular و TypeScript.',
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'هل لديك مشروع أو فرصة تعاون؟ يسعدني تواصلك معي في أي وقت لبدء العمل!',
      location: 'عمان، الأردن',
      email: 'anastarayra12@gmail.com',
      phone: '0796851497',
      whatsapp: 'تحدث عبر واتساب',
      nameLabel: 'الاسم كامل',
      emailLabel: 'البريد الإلكتروني',
      messageLabel: 'تفاصيل مشروعك أو رسالتك',
      sendBtn: 'إرسال الرسالة',
      sendingBtn: 'جاري الإرسال...',
      successMsg: 'شكراً لك! تم إرسال رسالتك بنجاح وسأرد عليك قريباً.',
      errorMsg: 'حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى.',
    },
  },
};



const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('anas_portfolio_lang') || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('anas_portfolio_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
