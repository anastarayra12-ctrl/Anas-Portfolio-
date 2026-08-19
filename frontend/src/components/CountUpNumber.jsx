import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

export const CountUpNumber = ({ value, suffix = '', duration = 1.5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState(0);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const targetNumber = parseInt(value, 10) || 0;

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      setDisplayValue(v);
    });

    if (isInView) {
      const controls = animate(count, targetNumber, {
        duration,
        ease: 'easeOut',
      });
      return () => {
        controls.stop();
        unsubscribe();
      };
    }

    return () => unsubscribe();
  }, [isInView, targetNumber]);

  return (
    <span ref={ref}>
      <span>{displayValue}</span>
      {suffix}
    </span>
  );
};

export default CountUpNumber;
