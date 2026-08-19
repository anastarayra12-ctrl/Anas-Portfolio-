import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AvailabilityBadge = ({ status = 'available', size = 'md', className = '' }) => {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  const statusMap = {
    available: {
      color: '#22C55E',
      glow: 'rgba(34, 197, 94, 0.35)',
      label: isRTL ? 'متاح للعمل الآن' : 'Available for Opportunities',
    },
    working: {
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.35)',
      label: isRTL ? 'أعمل حالياً على مشروع' : 'In a Project',
    },
    unavailable: {
      color: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.35)',
      label: isRTL ? 'غير متاح حالياً' : 'Currently Unavailable',
    }
  };

  const currentStatus = statusMap[status] || statusMap.available;
  const isSmall = size === 'sm';

  return (
    <div
      className={`availability-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: isSmall ? '4px 10px' : '6px 14px',
        borderRadius: '100px',
        backgroundColor: `${currentStatus.color}15`,
        border: `1px solid ${currentStatus.color}35`,
        color: 'var(--text-primary)',
        fontSize: isSmall ? '0.78rem' : '0.85rem',
        fontWeight: 600,
        width: 'max-content',
      }}
    >
      {/* Pulsing Dot */}
      <span
        style={{
          width: isSmall ? '6px' : '8px',
          height: isSmall ? '6px' : '8px',
          borderRadius: '50%',
          backgroundColor: currentStatus.color,
          boxShadow: `0 0 10px ${currentStatus.glow}`,
          flexShrink: 0,
        }}
        className={status === 'available' ? 'pulse-dot-active' : ''}
      />
      <span>{currentStatus.label}</span>
    </div>
  );
};

export default AvailabilityBadge;
