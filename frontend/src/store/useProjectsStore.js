import { create } from 'zustand';

export const useProjectsStore = create((set, get) => ({
  projects: [
    {
      id: 1,
      slug: 'portfolio-v2',
      category: 'fullstack',
      image: '/courses/vibe_coding.jpg',
      title: {
        ar: 'معرض الأعمال الشخصي المتقدم (Vibe Portfolio V2)',
        en: 'Ultimate Vibe Personal Portfolio V2'
      },
      tags: ['.NET 9', 'React 19', 'Vite', 'Three.js', 'Framer Motion', 'Zustand'],
      role: {
        ar: 'مطور Full-Stack ومصمم UI/UX',
        en: 'Full-Stack Developer & UI/UX Designer'
      },
      duration: {
        ar: 'شهرين (2026)',
        en: '2 Months (2026)'
      },
      tools: ['React 19', 'Three.js', 'Framer Motion', 'Zustand', 'CSS Variables'],
      problem: {
        ar: 'تحدي بناء معرض أعمال شخصي عصري يتفوق على القوالب التقليدية، ويجمع بين السرعة الفائقة في التحميل والتأثيرات البصرية ثلاثية الأبعاد والتجاوب التام مع مختلف الأجهزة دون أي إجهاد بصري.',
        en: 'The challenge of building a modern personal portfolio that transcends generic templates, combining lightning-fast performance, immersive 3D interactive graphics, and seamless cross-device responsiveness.'
      },
      process: [
        { step: '01', title: { ar: 'البحث والتحليل', en: 'Research & UX Concept' }, desc: { ar: 'دراسة أنماط تصميم المطورين العالمي وتحديد متطلبات الأداء والألوان.', en: 'Analyzing top global developer portfolios to establish dark-mode aesthetics and performance goals.' } },
        { step: '02', title: { ar: 'تصميم الواجهات Figma', en: 'Figma Prototyping' }, desc: { ar: 'بناء نظام مكونات زجاجي (Glassmorphism design system) وشبكة تجاوب متكاملة.', en: 'Crafting a cohesive glassmorphic design system and fluid responsive layout grid.' } },
        { step: '03', title: { ar: 'تطوير React & R3F', en: 'Frontend Engineering' }, desc: { ar: 'برمجة المكونات وتقنيات Three.js وإدارة الحالة بـ Zustand وتضمين الرسوم.', en: 'Engineered clean React 19 components, interactive Three.js 3D background, and Zustand state.' } },
        { step: '04', title: { ar: 'التحسين والأداء', en: 'Optimization & SEO' }, desc: { ar: 'تحسين سرعة الفريمات (60FPS) وضغط الصور وإضافة بطاقات الميتا والـ Accessibility.', en: 'Optimized rendering to rock-solid 60FPS, compressed assets, and integrated SEO metadata.' } },
      ],
      solutionScreenshots: [
        '/courses/vibe_coding.jpg',
        '/courses/uiux_udemy.jpg',
        '/courses/fullstack_dotnet.jpg'
      ],
      result: [
        { label: { ar: 'سرعة الأداء (Lighthouse)', en: 'Performance Score' }, value: '99/100' },
        { label: { ar: 'استجابة الواجهة (FPS)', en: 'Frame Rate' }, value: '60 FPS' },
        { label: { ar: 'سهولة الوصول (Accessibility)', en: 'Accessibility' }, value: '100%' },
      ]
    },
    {
      id: 2,
      slug: 'ecommerce',
      category: 'uiux',
      image: '/courses/uiux_udemy.jpg',
      title: {
        ar: 'منظومة لوحة تحكم التجارة الإلكترونية (E-Commerce Dashboard)',
        en: 'E-Commerce Enterprise Dashboard'
      },
      tags: ['UI/UX', 'Figma', 'Angular', 'Chart.js', 'REST APIs'],
      role: {
        ar: 'مصمم تجربة مستخدم ومطور Frontend',
        en: 'UI/UX Designer & Frontend Developer'
      },
      duration: {
        ar: '3 أشهر (2026)',
        en: '3 Months (2026)'
      },
      tools: ['Figma', 'Angular', 'TypeScript', 'Tailwind', 'RESTful APIs'],
      problem: {
        ar: 'صعوبة إدارة المنتجات والطلبات الكثيرة في المتاجر الكبيرة بسبب تعقيد الواجهات التقليدية وغياب المؤشرات التحليلية اللحظية.',
        en: 'Managing high-volume product catalogs and orders in legacy e-commerce stores due to cluttered UIs and lack of real-time operational metrics.'
      },
      process: [
        { step: '01', title: { ar: 'دراسة المستخدمين', en: 'User Research' }, desc: { ar: 'مقابلة أصحاب المتاجر وتحديد المشكلات التشغيلية الأكثر تكراراً.', en: 'Interviewed store managers to map out daily operational pain points.' } },
        { step: '02', title: { ar: 'مخططات التصفح Wireframes', en: 'Wireframing' }, desc: { ar: 'بناء الهيكل البصري للوحة التحكم وتدفق الطلبات.', en: 'Architected clear dashboard navigation flows and order handling UX.' } },
        { step: '03', title: { ar: 'تصميم الواجهات المظلمة', en: 'UI Design' }, desc: { ar: 'تطبيق نمط مرئي مريح للعين مع تحليلات بيانية تفاعلية.', en: 'Designed a high-contrast dark interface featuring real-time interactive charts.' } },
        { step: '04', title: { ar: 'التطوير والتكامل', en: 'Integration' }, desc: { ar: 'ربط واجهات Angular بالـ RESTful APIs وسير العمليات.', en: 'Connected Angular components with backend RESTful APIs.' } },
      ],
      solutionScreenshots: [
        '/courses/uiux_udemy.jpg',
        '/courses/uiux_workshop.jpg'
      ],
      result: [
        { label: { ar: 'سرعة إدارة الطلبات', en: 'Order Handling Speed' }, value: '+45%' },
        { label: { ar: 'دقة التحليلات', en: 'Analytics Accuracy' }, value: '100%' },
      ]
    },
    {
      id: 3,
      slug: 'chat-app',
      category: 'fullstack',
      image: '/courses/fullstack_dotnet.jpg',
      title: {
        ar: 'تطبيق المحادثة الفورية وتشفير البيانات (Real-time Chat App)',
        en: 'Real-time Encrypted Chat Application'
      },
      tags: ['C# .NET', 'SignalR', 'Angular', 'SQL Server', 'WebSockets'],
      role: {
        ar: 'مطور Full-Stack (.NET & Angular)',
        en: 'Full-Stack (.NET & Angular) Developer'
      },
      duration: {
        ar: 'شهر ونصف (2026)',
        en: '1.5 Months (2026)'
      },
      tools: ['ASP.NET Core', 'SignalR', 'Angular', 'SQL Server'],
      problem: {
        ar: 'الحاجة إلى تطبيق محادثة فوري يضمن وصول الرسائل دون أي تأخير ملموس مع الحفاظ على خصوصية البيانات وحمايتها عبر التشفير.',
        en: 'The need for a real-time messaging application with near-zero latency while maintaining strict end-to-end data encryption.'
      },
      process: [
        { step: '01', title: { ar: 'هندسة Backend .NET', en: '.NET Architecture' }, desc: { ar: 'بناء السيرفر بـ ASP.NET Core وتقنية SignalR للمحادثات الفورية.', en: 'Architected ASP.NET Core backend with SignalR WebSockets for instant message delivery.' } },
        { step: '02', title: { ar: 'تشفير البيانات', en: 'Security & Encryption' }, desc: { ar: 'تطبيق تشفير الرسائل وضبط صلاحيات الوصول بالأذونات.', en: 'Implemented message encryption and JWT token authentication.' } },
        { step: '03', title: { ar: 'واجهة Angular التفاعلية', en: 'Angular Frontend' }, desc: { ar: 'بناء واجهة محادثات سريعة تدعم الحالات التفاعلية وتأكيدات القراءة.', en: 'Built Angular messaging frontend supporting live presence and read receipts.' } },
      ],
      solutionScreenshots: [
        '/courses/fullstack_dotnet.jpg',
        '/courses/vibe_coding.jpg'
      ],
      result: [
        { label: { ar: 'زمن استجابة الرسالة', en: 'Message Latency' }, value: '< 20ms' },
        { label: { ar: 'مستوى التشفير', en: 'Security Level' }, value: 'AES-256' },
      ]
    },
    {
      id: 4,
      slug: 'fintech',
      category: 'uiux',
      image: '/courses/uiux_workshop.jpg',
      title: {
        ar: 'واجهة التطبيق المالي والحلول المصرفية (Fintech App Design)',
        en: 'Next-Gen Fintech & Banking Mobile App'
      },
      tags: ['UI/UX', 'Figma Prototype', 'Design Systems', 'Fintech'],
      role: {
        ar: 'مصمم واجهات وتجربة المستخدم',
        en: 'Lead UI/UX Designer'
      },
      duration: {
        ar: 'شهر واحد (2026)',
        en: '1 Month (2026)'
      },
      tools: ['Figma', 'Interactive Prototypes', 'Design Tokens'],
      problem: {
        ar: 'صعوبة الفهم والتعقيد البصري في التطبيقات المالية السابقة التي تجعل المستخدمين يواجهون صعوبة في متابعة مصاريفهم ومدفوعاتهم.',
        en: 'Visual clutter and cognitive overload in traditional banking apps hindering users from managing expenses smoothly.'
      },
      process: [
        { step: '01', title: { ar: 'اختبارات الاستخدام', en: 'Usability Audit' }, desc: { ar: 'دراسة سلوك المستخدم في التعامل مع التحويلات المالية والبطاقات.', en: 'Audited user behavior when executing quick transfers and card management.' } },
        { step: '02', title: { ar: 'التصميم التفاعلي Figma', en: 'Figma Prototyping' }, desc: { ar: 'تطبيق مبادئ التبسيط البصري (Micro-interactions) والتنقل السلس.', en: 'Created clean, micro-animated mobile screens and component design system.' } },
      ],
      solutionScreenshots: [
        '/courses/uiux_workshop.jpg',
        '/courses/photoshop_course.jpg'
      ],
      result: [
        { label: { ar: 'رضا تجربة المستخدم', en: 'UX Satisfaction' }, value: '98%' },
        { label: { ar: 'زمن إنجاز التحويل', en: 'Transfer Completion' }, value: '3 Clicks' },
      ]
    }
  ],

  getProjectBySlug: (slug) => {
    return get().projects.find((p) => p.slug === slug) || get().projects[0];
  },

  getAdjacentProjects: (slug) => {
    const list = get().projects;
    const index = list.findIndex((p) => p.slug === slug);
    const currentIndex = index >= 0 ? index : 0;
    
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    const nextIndex = (currentIndex + 1) % list.length;

    return {
      prev: list[prevIndex],
      next: list[nextIndex]
    };
  }
}));
