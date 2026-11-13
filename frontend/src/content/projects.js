/**
 * Projects — "What I've Built".
 *
 * Shared fields (url, images, colours, stack) sit at the top of each project; the text
 * for each language sits in `en` / `ar`. Facts come from the live sites themselves
 * (content, features and the technologies found in their code) and from the owner:
 * on Ramz, Anas developed the dashboard as part of the organising team.
 *
 * Screenshots: public/projects/<id>-desktop.webp, -detail.webp and -mobile.webp.
 * `accent` tints the 3D stage and the detail view; `ink` is readable text on it.
 */
export const projects = [
  {
    id: 'programming-worlds',
    url: 'https://programmingworlds.vercel.app/',
    domain: 'programmingworlds.vercel.app',
    accent: '#5145E8',
    glow: '#F59E0B',
    stack: ['JavaScript', 'Vite', 'GSAP · ScrollTrigger', 'Lenis', 'Canvas 3D', 'EN / AR'],
    en: {
      category: 'Startup website',
      title: 'Programming Worlds',
      tagline: 'Digital worlds, crafted with precision.',
      summary:
        'A bilingual website for Programming Worlds, a technology startup — a scroll-driven 3D experience that presents its services, its process and its work.',
      goal: 'Give a young technology startup a credible, memorable presence: explain who they are and what they build, show real work, and turn visitors into project inquiries.',
      idea: 'A “digital world” you travel through. A 3D planet scene opens the site, and every scroll step moves you to the next chapter — from who they are, to how they work, to what they have built.',
      features: [
        'Scroll-driven 3D hero scene with a numbered section navigator (01–06)',
        'Services: web & systems, software solutions, mobile apps, NFC experiences, training & courses',
        'A six-step process — idea, strategy, design, development, testing and launch',
        'Showcase of real client websites previewed on MacBook, iPad and iPhone',
        'Contact section with a project inquiry form and an English / Arabic switch',
      ],
      type: 'Company website · English & Arabic',
      role: 'UI/UX design & front-end development',
      contribution: [
        'Designed the interface and the scroll-driven, chapter-by-chapter experience',
        'Built the front end: the 3D scene, scroll animations, bilingual content and responsive layouts',
      ],
    },
    ar: {
      category: 'موقع شركة ناشئة',
      title: 'Programming Worlds',
      tagline: 'عوالم رقمية مصنوعة بدقّة.',
      summary: 'موقع ثنائي اللغة لشركة Programming Worlds التقنية الناشئة — تجربة ثلاثية الأبعاد تتحرّك مع التمرير لتعرض خدماتها وطريقة عملها وأعمالها.',
      goal: 'منح شركة تقنية ناشئة حضورًا موثوقًا لا يُنسى: تعريف بمن هم وماذا يبنون، وعرض أعمال حقيقية، وتحويل الزوّار إلى طلبات مشاريع.',
      idea: '«عالم رقمي» تسافر فيه. مشهد كوكب ثلاثي الأبعاد يفتتح الموقع، وكل خطوة تمرير تنقلك إلى الفصل التالي — من هم، وكيف يعملون، وماذا بنوا.',
      features: [
        'مشهد افتتاحي ثلاثي الأبعاد يتحرّك مع التمرير، مع متنقّل أقسام مرقّم (01–06)',
        'الخدمات: المواقع والأنظمة، الحلول البرمجية، تطبيقات الجوال، تجارب NFC، والتدريب والدورات',
        'مراحل العمل الست — الفكرة، الاستراتيجية، التصميم، التطوير، الاختبار، والإطلاق',
        'عرض لمواقع عملاء حقيقية على MacBook وiPad وiPhone',
        'قسم تواصل مع نموذج لطلب مشروع، ومبدّل بين الإنجليزية والعربية',
      ],
      type: 'موقع شركة · إنجليزي وعربي',
      role: 'تصميم UI/UX وتطوير الواجهات الأمامية',
      contribution: [
        'تصميم الواجهة والتجربة التي تنتقل فصلًا بعد فصل مع التمرير',
        'بناء الواجهة الأمامية: المشهد ثلاثي الأبعاد، حركات التمرير، المحتوى ثنائي اللغة، والتجاوب مع الشاشات',
      ],
    },
  },
  {
    id: 'malak',
    url: 'https://malak-six-gamma.vercel.app/',
    domain: 'malak-six-gamma.vercel.app',
    accent: '#4E6B48',
    glow: '#E9E1CC',
    stack: ['JavaScript', 'Three.js', 'WebGL', 'HTML & CSS', 'WhatsApp ordering', 'RTL'],
    en: {
      category: 'Coffee shop website',
      title: 'Malak Coffee',
      tagline: 'Your coffee, your way — with the taste of Malak.',
      summary: 'An Arabic-first website for Malak Coffee, a specialty coffee shop in Amman — a 3D cup, the full menu, and ordering through WhatsApp.',
      goal: 'Let customers browse the menu, build an order on the site and confirm it on WhatsApp in one tap — so it is ready to pick up when they arrive.',
      idea: 'The cup is the hero. A 3D Malak cup with latte art turns as you scroll through the story — fresh grinding, latte art, ordering — and then the menu takes over.',
      features: [
        'Interactive 3D coffee cup rendered in the browser with Three.js',
        'The full menu by category, with prices in Jordanian dinars',
        'A cart that sends the order to WhatsApp for pickup',
        'Live opening-hours status (“Open now · until 11 PM”)',
        'Arabic-first, right-to-left layout with English accents',
        'Bottom navigation on mobile with quick access to the cart',
      ],
      type: 'Business website · Arabic (RTL)',
      role: 'UI/UX design & front-end development',
      contribution: [
        'Designed the brand-led interface and the scroll story around the 3D cup',
        'Built the front end: the Three.js scene, the menu and cart, WhatsApp ordering and the RTL layout',
      ],
    },
    ar: {
      category: 'موقع مقهى',
      title: 'Malak Coffee',
      tagline: 'قهوتك على مزاجك، بطعم Malak.',
      summary: 'موقع عربي أولًا لمقهى ملك كوفي للقهوة المختصّة في عمّان — فنجان ثلاثي الأبعاد، والمنيو كاملًا، والطلب عبر واتساب.',
      goal: 'أن يتصفّح الزبون المنيو، ويجهّز طلبه من الموقع، ويؤكّده على واتساب بضغطة واحدة — ليجده جاهزًا عند وصوله.',
      idea: 'الفنجان هو البطل. فنجان Malak ثلاثي الأبعاد برسمة لاتيه يدور مع التمرير عبر القصة — الطحن الطازج، فن اللاتيه، الطلب — ثم يبدأ المنيو.',
      features: [
        'فنجان قهوة تفاعلي ثلاثي الأبعاد يُرسم في المتصفح بـ Three.js',
        'المنيو كاملًا حسب الفئات، بالأسعار بالدينار الأردني',
        'سلة ترسل الطلب إلى واتساب للاستلام من المحل',
        'حالة الدوام مباشرة («مفتوح الآن · حتى 11:00 مساءً»)',
        'تصميم عربي أولًا من اليمين لليسار مع لمسات إنجليزية',
        'شريط تنقّل سفلي على الهاتف مع وصول سريع إلى السلة',
      ],
      type: 'موقع تجاري · عربي (RTL)',
      role: 'تصميم UI/UX وتطوير الواجهات الأمامية',
      contribution: [
        'تصميم واجهة تنطلق من هوية المقهى، وقصة التمرير حول الفنجان ثلاثي الأبعاد',
        'بناء الواجهة الأمامية: مشهد Three.js، المنيو والسلة، الطلب عبر واتساب، والتصميم من اليمين لليسار',
      ],
    },
  },
  {
    id: 'yaser',
    url: 'https://yaser-psi.vercel.app/',
    domain: 'yaser-psi.vercel.app',
    accent: '#E89B2C',
    glow: '#2A211C',
    stack: ['JavaScript', 'HTML & CSS', 'Scroll animations', 'EN / AR'],
    en: {
      category: 'Video editor portfolio',
      title: 'Yaser Samer',
      tagline: 'Stories cut with rhythm, intent and love.',
      summary: 'A cinematic portfolio for Yaser Samer, a video editor and motion designer whose work includes promos for Al Jazeera.',
      goal: 'Present an editor’s reel and the channels, ministries and brands he has cut for — and make it easy for creators and brands to hire him.',
      idea: 'The whole site behaves like a camera viewfinder: a REC light, a running timecode and 4K · 24 FPS readouts frame the content, and the work plays like a reel you scrub through.',
      features: [
        'Viewfinder interface with a REC indicator and a live timecode',
        'A draggable reel of selected promos and motion graphics',
        'Clients: channels, ministries and brands he has edited for',
        'Editing and AI toolkit, animated stats and an Instagram “behind the cut” section',
        'English / Arabic switch',
      ],
      type: 'Personal portfolio · English & Arabic',
      role: 'UI/UX design & front-end development',
      contribution: [
        'Designed the cinematic, viewfinder-inspired interface and the reel experience',
        'Built the front end: the timecode and reel interactions, scroll animations and the bilingual switch',
      ],
    },
    ar: {
      category: 'معرض أعمال مونتير',
      title: 'Yaser Samer',
      tagline: 'قصص تُقطَّع بإيقاع، وقصد، وحب.',
      summary: 'معرض أعمال سينمائي لياسر سامر، مونتير ومصمّم موشن تشمل أعماله برومو لشبكة الجزيرة.',
      goal: 'عرض أعمال المونتير والقنوات والوزارات والعلامات التي عمل معها — وتسهيل تواصل صنّاع المحتوى والعلامات التجارية معه.',
      idea: 'الموقع كلّه يتصرّف كعدسة كاميرا: ضوء REC، وتوقيت يجري، وقراءات ‎4K · 24 FPS تؤطّر المحتوى، والأعمال تُعرض كبكرة تتنقّل فيها.',
      features: [
        'واجهة بأسلوب عدسة الكاميرا مع مؤشر REC وتوقيت حيّ',
        'بكرة أعمال قابلة للسحب من البرومو والموشن جرافيك',
        'العملاء: القنوات والوزارات والعلامات التي عمل معها',
        'أدوات المونتاج والذكاء الاصطناعي، وإحصاءات متحرّكة، وقسم «خلف الكواليس» من Instagram',
        'مبدّل بين الإنجليزية والعربية',
      ],
      type: 'معرض أعمال شخصي · إنجليزي وعربي',
      role: 'تصميم UI/UX وتطوير الواجهات الأمامية',
      contribution: [
        'تصميم واجهة سينمائية مستوحاة من عدسة الكاميرا وتجربة بكرة الأعمال',
        'بناء الواجهة الأمامية: تفاعلات التوقيت والبكرة، حركات التمرير، ومبدّل اللغتين',
      ],
    },
  },
  {
    id: 'ramz',
    url: 'https://ramz.cache-team.com/',
    domain: 'ramz.cache-team.com',
    accent: '#8A2440',
    glow: '#E3B568',
    stack: ['JavaScript', 'HTML & CSS', 'Google Apps Script', 'RTL'],
    en: {
      category: 'Tech conference platform',
      title: 'Ramz Technical Conference',
      tagline: 'Made by students, for students.',
      summary:
        'The website of Ramz Technical Conference 2, a student tech conference by Cache Team IT-ZUJ at Al-Zaytoonah University of Jordan. I developed the project’s dashboard.',
      goal: 'Bring students together with leading programmers and companies — inform them about the conference, register attendees, and manage it all behind the scenes.',
      idea: 'A conference site that speaks its audience’s language: code. A live “ramz.config.js” editor greets visitors, and the site walks them from the idea of the conference to booking a seat.',
      features: [
        'Seat registration and a countdown to the conference day',
        'Speakers, programme, partners and transport details',
        'The Ramz competition, an archive of Ramz 1 and an attendee feedback form',
        'Arabic, right-to-left design with a code-editor visual language',
      ],
      type: 'Event platform · Arabic (RTL)',
      role: 'Team member — dashboard developer',
      contribution: [
        'Developed the project’s dashboard — my own part of the platform',
        'Worked within the Cache Team IT-ZUJ team that built and runs the conference website',
      ],
    },
    ar: {
      category: 'منصّة مؤتمر تقني',
      title: 'مؤتمر رمز التقني',
      tagline: 'مؤتمر صنعه طلاب، لأجل طلاب.',
      summary: 'موقع مؤتمر رمز التقني 2، مؤتمر تقني طلابي ينظّمه فريق الكاش IT-ZUJ في جامعة الزيتونة الأردنية. طوّرت لوحة التحكم (Dashboard) الخاصة بالمشروع.',
      goal: 'جمع الطلاب بأبرز المبرمجين والشركات — تعريفهم بالمؤتمر، وتسجيل الحضور، وإدارة كل ذلك من خلف الكواليس.',
      idea: 'موقع مؤتمر يتحدّث لغة جمهوره: الكود. محرّر حيّ لملف «ramz.config.js» يستقبل الزائر، ثم يأخذه الموقع من فكرة المؤتمر حتى حجز مقعده.',
      features: [
        'تسجيل المقاعد وعدّ تنازلي ليوم المؤتمر',
        'المتحدّثون، والفقرات، وشركاء النجاح، وتفاصيل المواصلات',
        'مسابقة رمز، وأرشيف رمز 1، ونموذج لتقييم تجربة الحضور',
        'تصميم عربي من اليمين لليسار بلغة بصرية مستوحاة من محرّر الكود',
      ],
      type: 'منصّة فعالية · عربي (RTL)',
      role: 'عضو في الفريق — مطوّر لوحة التحكم',
      contribution: [
        'تطوير لوحة التحكم (Dashboard) الخاصة بالمشروع — الجزء الذي أنجزته بنفسي من المنصّة',
        'العمل ضمن فريق الكاش IT-ZUJ الذي بنى موقع المؤتمر ويديره',
      ],
    },
  },
];
