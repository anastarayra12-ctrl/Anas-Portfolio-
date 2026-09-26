import { m } from 'framer-motion';

/**
 * Scroll reveal: a short fade + rise, once. Motion is disabled automatically
 * for users who prefer reduced motion (see <MotionConfig reducedMotion="user">).
 */
export function Reveal({ as = 'div', delay = 0, y = 18, children, className, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
