import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const requestRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isMagnetic = useRef(false);
  const magneticTarget = useRef({ centerX: 0, centerY: 0 });
  const isHoveringInteractive = useRef(false);
  const isVisible = useRef(false);

  const [isEnabled, setIsEnabled] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on active touch devices
    const handleTouch = () => setIsTouch(true);
    window.addEventListener('touchstart', handleTouch, { passive: true, once: true });

    // Check localStorage setting
    if (localStorage.getItem('anas_cursor') === 'false') {
      setIsEnabled(false);
    }

    return () => {
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouch || !isEnabled) {
      document.documentElement.style.cursor = '';
      return;
    }

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    const onMouseMove = (e) => {
      if (!isVisible.current) {
        isVisible.current = true;
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      let targetX = e.clientX;
      let targetY = e.clientY;

      if (isMagnetic.current) {
        const { centerX, centerY } = magneticTarget.current;
        targetX = centerX + (e.clientX - centerX) * 0.25;
        targetY = centerY + (e.clientY - centerY) * 0.25;
      }

      mouse.current = { x: targetX, y: targetY };
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const onMouseOver = (e) => {
      const el = e.target && e.target.closest ? e.target.closest('button, a, [data-magnetic], input, textarea, select') : null;
      if (el) {
        isHoveringInteractive.current = true;
        const rect = el.getBoundingClientRect();
        magneticTarget.current = {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
        isMagnetic.current = el.hasAttribute('data-magnetic') || el.tagName === 'BUTTON';
      } else {
        isHoveringInteractive.current = false;
        isMagnetic.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.4);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.4);

      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

      const scaleDot = isHoveringInteractive.current ? 1.8 : 1;
      const scaleRing = isHoveringInteractive.current ? 1.6 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px, 0) scale(${scaleDot})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${scaleRing})`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTouch, isEnabled]);

  if (isTouch || !isEnabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid var(--accent-blue, #3B82F6)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 200ms ease, border-color 200ms ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-blue, #3B82F6)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 200ms ease, background-color 200ms ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
