/**
 * "What I Use" — every tool and certificate below is listed on the CV.
 *
 * Honest depth markers instead of invented percentages:
 *   certs  → the certificates that taught the tool (ids from `certificates`)
 *   live   → used in the live projects (verified in their code: HTML, CSS, JavaScript)
 */
export const certificates = {
  'uiux-udemy': {
    title: { en: 'UI/UX Design Masterclass', ar: 'UI/UX Design Masterclass' },
    org: { en: 'Udemy', ar: 'Udemy' },
    by: { en: 'Eng. Eslam Ameer', ar: 'م. إسلام أمير' },
    year: '2026',
    image: '/courses/uiux_udemy.jpg',
  },
  'uiux-zinc': {
    title: { en: 'UI/UX Design Workshop', ar: 'ورشة تصميم الواجهات وتجربة المستخدم' },
    org: { en: 'Zain Innovation Campus (ZINC)', ar: 'منصة زين للإبداع (ZINC)' },
    by: { en: 'Mr. Alaa Ali', ar: 'أ. علاء علي' },
    year: '2026',
    image: '/courses/uiux_workshop.jpg',
  },
  photoshop: {
    title: { en: 'Adobe Photoshop Course', ar: 'دورة Adobe Photoshop' },
    org: { en: 'YouTube', ar: 'YouTube' },
    year: '2025',
    image: '/courses/photoshop_course.jpg',
  },
  'frontend-udemy': {
    title: { en: 'Front-End Development', ar: 'Front-End Development' },
    org: { en: 'Udemy', ar: 'Udemy' },
    year: '2026',
  },
  'claude-mastery': {
    title: { en: 'Claude AI Mastery Course', ar: 'Claude AI Mastery Course' },
    org: { en: 'Anthropic', ar: 'Anthropic' },
    year: '2026',
    image: '/courses/claude_mastery.jpg',
  },
  'claude-prompting': {
    title: { en: 'Claude AI Prompt Engineering', ar: 'هندسة الأوامر لـ Claude' },
    org: { en: 'YouTube', ar: 'YouTube' },
    year: '2026',
    image: '/courses/claude_prompting.jpg',
  },
  'vibe-coding': {
    title: { en: 'Vibe Coding Course', ar: 'دورة Vibe Coding' },
    org: { en: 'YouTube', ar: 'YouTube' },
    year: '2026',
    image: '/courses/vibe_coding.jpg',
  },
};

export const skillGroups = [
  {
    key: 'design',
    name: { en: 'Design', ar: 'التصميم' },
    purpose: { en: 'How it looks, feels and flows', ar: 'كيف يبدو، وكيف يُشعِر، وكيف يُستخدم' },
    tools: [
      { name: 'Figma', note: { en: 'Wireframing & prototyping', ar: 'المخططات الأولية والنماذج التفاعلية' }, certs: ['uiux-udemy', 'uiux-zinc'] },
      { name: 'Adobe Photoshop', note: { en: 'Imagery & graphics', ar: 'الصور والرسوميات' }, certs: ['photoshop'] },
    ],
  },
  {
    key: 'frontend',
    name: { en: 'Front-End Development', ar: 'تطوير الواجهات الأمامية' },
    purpose: { en: 'How it is built for the browser', ar: 'كيف يُبنى للمتصفح' },
    tools: [
      { name: 'HTML5', note: { en: 'Semantic structure', ar: 'هيكل دلالي' }, certs: ['frontend-udemy'], live: true },
      { name: 'CSS3', note: { en: 'Responsive layouts', ar: 'تصاميم متجاوبة' }, certs: ['frontend-udemy'], live: true },
      { name: 'JavaScript', note: { en: 'Interaction & logic', ar: 'التفاعل والمنطق' }, certs: ['frontend-udemy'], live: true },
      { name: 'Angular', note: { en: 'Framework', ar: 'إطار عمل' } },
      { name: 'jQuery', note: { en: 'Library', ar: 'مكتبة' } },
      { name: 'Bootstrap', note: { en: 'UI framework', ar: 'إطار واجهات' } },
    ],
  },
  {
    key: 'ai',
    name: { en: 'AI-Assisted Workflow', ar: 'العمل بالذكاء الاصطناعي' },
    purpose: { en: 'How ideas get built faster', ar: 'كيف تُبنى الأفكار أسرع' },
    tools: [
      { name: 'Claude · Claude Code', note: { en: 'AI pair-programming', ar: 'البرمجة بمساعدة الذكاء الاصطناعي' }, certs: ['claude-mastery'] },
      { name: 'AI Prompt Engineering', note: { en: 'Clear, structured prompts', ar: 'أوامر واضحة ومنظّمة' }, certs: ['claude-prompting'] },
      { name: 'Vibe Coding', note: { en: 'Idea to prototype, fast', ar: 'من الفكرة إلى نموذج بسرعة' }, certs: ['vibe-coding'] },
    ],
  },
  {
    key: 'workflow',
    name: { en: 'Version Control', ar: 'إدارة الإصدارات' },
    purpose: { en: 'How work is tracked and shared', ar: 'كيف يُتابَع العمل ويُشارَك' },
    tools: [{ name: 'Git & GitHub', note: { en: 'Versioning & collaboration', ar: 'إدارة النسخ والتعاون' } }],
  },
];

/** In progress on the CV — shown apart from the tools above. */
export const learningNow = {
  title: { en: 'Full Stack Developer (.NET & Angular)', ar: 'مطوّر Full Stack ‏(⁦.NET⁩ وAngular)' },
  org: { en: 'Step by Step Company', ar: 'شركة Step by Step' },
  by: { en: 'Eng. Mohammad Al-Momani', ar: 'م. محمد المومني' },
  image: '/courses/fullstack_dotnet.jpg',
  topics: ['.NET', 'Angular'],
};
