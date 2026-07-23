import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnasLogo } from './AnasLogo';

export const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Allow fade out animation to finish
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: 'blur(15px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <AnasLogo size="xl" animated={true} showText={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.85rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: 'linear-gradient(to right, var(--text-primary) 20%, var(--accent-blue) 50%, var(--text-primary) 80%)',
              backgroundSize: '200% auto',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
              textAlign: 'center'
            }}
          >
            Anas Tarayra
            <style>
              {`
                @keyframes shine {
                  to {
                    background-position: 200% center;
                  }
                }
              `}
            </style>
          </motion.div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '140px', opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' }}
            style={{
              height: '2px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
              boxShadow: '0 0 10px var(--accent-blue-glow)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
