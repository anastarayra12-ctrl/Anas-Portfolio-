import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const AmmanClock = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Amman',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const ammanTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTimeString(ammanTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg-primary)',
        padding: '4px 10px',
        borderRadius: '20px',
        border: '1px solid var(--border-color)',
        whiteSpace: 'nowrap',
      }}
      title="Live Local Time in Amman, Jordan (GMT+3)"
    >
      <Clock size={12} style={{ color: 'var(--accent-blue)' }} />
      <span>Amman {timeString}</span>
    </div>
  );
};

