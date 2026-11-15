/**
 * UI/UX case study — "Soun" (صون), a car-care booking design.
 *
 * Every fact here is read from the delivered design board itself
 * (screens, states, colours, type and spacing it documents). Images live in
 * public/design/soun/ and were cut from that board at their original size.
 */
const base = '/design/soun';

export const caseStudy = {
  id: 'soun',
  logo: `${base}/logo.webp`,
  board: `${base}/board.webp`,
  boardSize: { w: 3600, h: 2072 },

  /** Numbers shown on the board's own summary strip. */
  stats: [
    { key: 'desktop', n: '12' },
    { key: 'mobile', n: '10' },
    { key: 'inputs', n: '05' },
    { key: 'buttons', n: '05' },
  ],

  /** Colour roles documented on the board ("Design foundations"). */
  colors: [
    { key: 'accent', hex: '#F2AC3D' },
    { key: 'petrol', hex: '#123D44' },
    { key: 'surface', hex: '#E6F6F0' },
    { key: 'background', hex: '#0B191C' },
  ],
  spacing: [8, 12, 16, 24, 32, 48],
  typeface: 'Tajawal',

  /** Screens in the order a visitor meets them. w/h = real pixel size. */
  desktop: [
    { id: 'home', w: 1440, h: 1224 },
    { id: 'about', w: 1440, h: 1024 },
    { id: 'services', w: 1440, h: 1024 },
    { id: 'centres', w: 1440, h: 1224 },
    { id: 'help', w: 1440, h: 1224 },
    { id: 'booking-1', w: 1440, h: 1224 },
    { id: 'booking-2', w: 1440, h: 1344 },
    { id: 'booking-2-error', w: 1440, h: 1344 },
    { id: 'review', w: 1440, h: 1344 },
    { id: 'sending', w: 1440, h: 1344 },
    { id: 'success', w: 1440, h: 1224 },
    { id: 'failed', w: 1440, h: 1344 },
  ].map((s) => ({ ...s, src: `${base}/desktop/${s.id}.webp`, thumb: `${base}/desktop/${s.id}-thumb.webp` })),

  mobile: [
    { id: 'home', w: 390, h: 980 },
    { id: 'about', w: 390, h: 1282 },
    { id: 'services', w: 390, h: 1340 },
    { id: 'centres', w: 390, h: 1576 },
    { id: 'help', w: 390, h: 1178 },
    { id: 'booking-1', w: 390, h: 1156 },
    { id: 'booking-2', w: 390, h: 1544 },
    { id: 'review', w: 390, h: 1336 },
    { id: 'success', w: 390, h: 904 },
    { id: 'menu', w: 390, h: 964 },
  ].map((s) => ({ ...s, src: `${base}/mobile/${s.id}.webp` })),

  kit: [
    { id: 'states', w: 945, h: 800 },
    { id: 'cards', w: 2110, h: 505 },
    { id: 'navigation', w: 1280, h: 325 },
  ].map((s) => ({ ...s, src: `${base}/kit/${s.id}.webp` })),

  en: {
    name: 'Soun',
    category: 'UI/UX case study',
    title: 'Soun — car care in one place',
    tagline: '“One place that gives you everything your car needs.”',
    summary:
      'A complete Arabic, right-to-left interface for a car-care platform that brings maintenance, care & detailing, spare parts and accessories together — and lets people book a service at a maintenance centre in a few clear steps. Designed for desktop and mobile, including every state of the booking flow.',
    note: 'The names, centres and dates inside the screens are illustrative sample data — not real bookings or partners.',
    facts: [
      { k: 'My role', v: 'UI/UX design' },
      { k: 'Platforms', v: 'Desktop · Mobile (390 px)' },
      { k: 'Language', v: 'Arabic · right to left' },
      { k: 'Delivered', v: 'Editable design file built from reusable components' },
    ],
    screens: {
      home: 'Home',
      about: 'About Soun',
      services: 'Services',
      centres: 'Maintenance centres',
      help: 'Help centre & FAQ',
      'booking-1': 'Booking 1/3 — service & centre',
      'booking-2': 'Booking 2/3 — details & time',
      'booking-2-error': 'Booking 2/3 — validation errors',
      review: 'Booking 3/3 — review',
      sending: 'State — sending',
      success: 'State — request sent',
      failed: 'State — sending failed',
      menu: 'Mobile menu',
    },
    kit: {
      states: { t: 'Buttons & input fields', d: 'Five button states (primary, focus, disabled, loading, secondary) and five field states (default, focus, filled, error, disabled).' },
      cards: { t: 'Content components', d: 'Empty state, maintenance-centre card and FAQ item — each in its desktop and compact sizes.' },
      navigation: { t: 'Navigation', d: 'Mobile footer, mobile header with the menu button, and the desktop call to action.' },
    },
    journey: [
      { t: 'Choose the service & centre', d: 'A clear choice before any data is asked for.' },
      { t: 'Details & time', d: 'Required fields marked, with specific error messages.' },
      { t: 'Review the request', d: 'Edit any detail before sending.' },
      { t: 'Wait for the result', d: 'The request is sent — or the failure is explained.' },
    ],
    rules: [
      { k: 'On error', v: 'The reason is shown next to the field, and the entered values stay visible for review.' },
      { k: 'If sending fails', v: 'Try again, or go back to edit the details.' },
      { k: 'On success', v: 'Only the result of the request is shown.' },
    ],
    principles: [
      { k: 'Clarity in Arabic', v: 'Clear headings, readable text and right-to-left alignment, set in Tajawal.' },
      { k: 'Consistent spacing', v: 'One spacing scale for every layout.' },
      { k: 'Mobile grid', v: '390 px screens with a 16 px content margin.' },
      { k: 'Components', v: 'Reusable components and text properties keep every screen consistent.' },
    ],
    colors: { accent: 'Accent', petrol: 'Petrol', surface: 'Surfaces', background: 'Background' },
  },

  ar: {
    name: 'صون',
    category: 'دراسة حالة UI/UX',
    title: 'صون — عناية سيارتك بمكان واحد',
    tagline: '«مكان واحد بوفّرلك كل إشي بتحتاجه سيارتك.»',
    summary:
      'تصميم واجهات كامل باللغة العربية ومن اليمين لليسار لمنصة عناية بالسيارات تجمع الصيانة، والعناية والتجميل، وقطع الغيار والإكسسوارات في مكان واحد — وتتيح حجز موعد في مركز صيانة بخطوات قليلة وواضحة. صُمّم لسطح المكتب والجوال، مع كل حالات رحلة الحجز.',
    note: 'الأسماء والمراكز والمواعيد داخل الشاشات بيانات توضيحية للتصميم — وليست حجوزات أو جهات حقيقية.',
    facts: [
      { k: 'دوري', v: 'تصميم UI/UX' },
      { k: 'المنصّات', v: 'سطح المكتب · الجوال (390 px)' },
      { k: 'اللغة', v: 'العربية · من اليمين لليسار' },
      { k: 'التسليم', v: 'ملف تصميم قابل للتعديل مبني بمكوّنات قابلة لإعادة الاستخدام' },
    ],
    screens: {
      home: 'الرئيسية',
      about: 'عن صون',
      services: 'الخدمات',
      centres: 'مراكز الصيانة',
      help: 'مركز المساعدة والأسئلة الشائعة',
      'booking-1': 'الحجز 1/3 — الخدمة والمركز',
      'booking-2': 'الحجز 2/3 — البيانات والموعد',
      'booking-2-error': 'الحجز 2/3 — أخطاء الإدخال',
      review: 'الحجز 3/3 — مراجعة الطلب',
      sending: 'حالة — جارٍ الإرسال',
      success: 'حالة — تم إرسال الطلب',
      failed: 'حالة — تعذّر الإرسال',
      menu: 'قائمة الجوال',
    },
    kit: {
      states: { t: 'الأزرار وحقول الإدخال', d: 'خمس حالات للأزرار (أساسي، تركيز، معطّل، تحميل، ثانوي) وخمس حالات للحقول (افتراضي، تركيز، معبّأ، خطأ، معطّل).' },
      cards: { t: 'مكوّنات المحتوى', d: 'الحالة الفارغة، وبطاقة مركز الصيانة، وعنصر الأسئلة الشائعة — بمقاسَي سطح المكتب والمقاس المصغّر.' },
      navigation: { t: 'التنقّل', d: 'تذييل الجوال، وترويسة الجوال مع زر القائمة، وزر الحجز في سطح المكتب.' },
    },
    journey: [
      { t: 'اختيار الخدمة والمركز', d: 'اختيار واضح قبل إدخال أي بيانات.' },
      { t: 'البيانات والموعد', d: 'حقول مطلوبة واضحة ورسائل خطأ محدّدة.' },
      { t: 'مراجعة الطلب', d: 'تعديل أي تفصيل قبل الإرسال.' },
      { t: 'انتظار نتيجة الإرسال', d: 'نجاح الإرسال، أو توضيح سبب التعذّر.' },
    ],
    rules: [
      { k: 'عند الخطأ', v: 'يظهر السبب قرب الحقل، مع إبقاء القيم المُدخلة ظاهرة للمراجعة.' },
      { k: 'عند تعذّر الإرسال', v: 'إعادة المحاولة، أو العودة لتعديل البيانات.' },
      { k: 'عند النجاح', v: 'تُعرض نتيجة الإرسال فقط.' },
    ],
    principles: [
      { k: 'وضوح بالعربي', v: 'عناوين واضحة ونصوص مقروءة ومحاذاة من اليمين لليسار، بخط Tajawal.' },
      { k: 'مسافات منتظمة', v: 'مقياس مسافات واحد لكل التخطيطات.' },
      { k: 'شبكة الجوال', v: 'شاشات بعرض 390 px وهامش محتوى 16 px.' },
      { k: 'المكوّنات', v: 'مكوّنات قابلة لإعادة الاستخدام وخصائص نصية تحافظ على اتساق كل الشاشات.' },
    ],
    colors: { accent: 'الإبراز', petrol: 'البترولي', surface: 'الأسطح', background: 'الخلفية' },
  },
};
