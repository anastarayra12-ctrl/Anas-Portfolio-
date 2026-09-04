import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AmbientAudioPlayer = () => {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Free ambient audio stream URL (lo-fi ambient background)
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

  useEffect(() => {
    const saved = localStorage.getItem('anas_ambient_audio');
    if (saved === 'true') {
      // Don't auto-play to respect browser policy, but show active intent
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('anas_ambient_audio', 'false');
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem('anas_ambient_audio', 'true');
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="none" />
      <button
        onClick={toggleAudio}
        title={isPlaying ? (lang === 'ar' ? 'إيقاف الصوت المحيطي' : 'Mute Ambient Audio') : (lang === 'ar' ? 'تشغيل صوت محيطي هادئ' : 'Play Ambient Audio')}
        style={{
          background: isPlaying ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: isPlaying ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
          color: isPlaying ? 'var(--accent-blue)' : 'var(--text-secondary)',
          borderRadius: '100px',
          padding: '6px 12px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78rem',
          fontWeight: 600,
          transition: 'all 200ms ease',
        }}
      >
        {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>{isPlaying ? (lang === 'ar' ? 'صوت محيطي 🎵' : 'Lo-Fi Audio 🎵') : (lang === 'ar' ? 'صوت محيطي' : 'Ambient')}</span>
      </button>
    </>
  );
};
