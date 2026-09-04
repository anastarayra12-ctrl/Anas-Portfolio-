import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, ShieldCheck } from 'lucide-react';

export const LiveStatusBadge = () => {
  const { lang } = useLanguage();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '100px',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        color: 'var(--accent-green)',
        fontSize: '0.8rem',
        fontWeight: 600,
      }}
      title="System Status: 100% Uptime"
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-green)',
          boxShadow: '0 0 8px var(--accent-green)',
          animation: 'pulse-ring 2s infinite',
        }}
      />
      <span>{lang === 'ar' ? '🟢 جميع الأنظمة تعمل بكفاءة 100%' : '🟢 All Systems Operational (100% Uptime)'}</span>
    </div>
  );
};
