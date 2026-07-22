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
      intro: 'I enjoy building robust software solutions, modern web applications, and intuitive UI/UX design systems that deliver real value.',
      exploreWork: 'Explore My Work',
      getInTouch: 'Get In Touch',
      runCode: 'Run / Execute',
      codeTitle: 'developer.js',
    },
    about: {
      title: 'About Me',
      subtitle: 'Passionate about crafting seamless user experiences and robust software solutions.',
      bio: 'I am a Software Engineering student passionate about crafting intuitive user interfaces and experiences (UI/UX). I develop modern web applications utilizing cutting-edge technologies and AI tools from concept to deployment. Currently, I am expanding my skills through an intensive .NET Full Stack development program.',
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
      name: 'أنس الطرايرة',
      role: 'مطور Full Stack ومصمم UI/UX وغرافيك',
      status: 'جاهز للعمل وبناء المشاريع',
      intro: 'أستمتع بتعلم التقنيات الجديدة وتحويل الفكر الهندسي والتصميمي إلى مشاريع عملية متكاملة تعزز مهاراتي وتعكس شغفي بتكنولوجيا المعلومات.',
      exploreWork: 'استكشف أعمالي',
      getInTouch: 'تواصل معي',
      runCode: 'تشغيل الكود',
      codeTitle: 'developer.js',
    },
    about: {
      title: 'نبذة عني',
      subtitle: 'شغوف بتصميم تجارب مستخدم سلسة وتطوير حلول برمجية متكاملة.',
      bio: 'طالب هندسة برمجيات في جامعة الزيتونة الأردنية، شغوف بتصميم واجهات وتجارب المستخدم (UI/UX) والتصميم الغرافيكي، إلى جانب تطوير مواقع وتطبيقات متكاملة باستخدام تقنيات .NET و React الحديثة من الفكرة وحتى النشر.',
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
