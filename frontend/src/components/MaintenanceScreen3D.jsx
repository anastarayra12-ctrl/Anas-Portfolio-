import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, Wrench, RefreshCw, Eye, Sparkles as SparklesIcon, CheckCircle2, Globe, Clock, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import maintenanceConfig from '../config/maintenanceConfig';

// --- Enhanced 3D Scene Components ---

function FloatingCyberCore({ mousePos, isMobile }) {
  const knotRef = useRef();
  const innerPolyRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const outerSphereRef = useRef();
  const satellitesGroupRef = useRef();

  useFrame((state, delta) => {
    const targetX = (mousePos.current.x * Math.PI) / 6;
    const targetY = (mousePos.current.y * Math.PI) / 6;

    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.35;
      knotRef.current.rotation.y += delta * 0.55;
      knotRef.current.rotation.z += delta * 0.15;
    }

    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.x -= delta * 0.5;
      innerPolyRef.current.rotation.y += delta * 0.4;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.25;
      ringRef1.current.rotation.y -= delta * 0.45;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.35;
      ringRef2.current.rotation.z += delta * 0.25;
    }

    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y += delta * 0.3;
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.12;
      // Smooth mouse & touch follow
      outerSphereRef.current.rotation.x += (targetY - outerSphereRef.current.rotation.x) * 0.04;
      outerSphereRef.current.rotation.y += (targetX - outerSphereRef.current.rotation.y) * 0.04;
    }
  });

  const scaleFactor = isMobile ? 0.75 : 1;

  return (
    <group ref={outerSphereRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      {/* Central 3D Torus Knot Core */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.25, 0.38, 128, 32]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#1D4ED8"
            emissiveIntensity={0.5}
            roughness={0.12}
            metalness={0.88}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Inner Crystalline Octahedron Core */}
      <mesh ref={innerPolyRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer Wireframe Tech Sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshStandardMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Orbiting Glowing Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.9, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting Glowing Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.3, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting Satellites */}
      <group ref={satellitesGroupRef}>
        <mesh position={[3.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#60A5FA" emissive="#3B82F6" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-3.2, 0, 0]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 3.2, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#93C5FD" emissive="#2563EB" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Dynamic Ambient Particle Field */}
      <Sparkles count={isMobile ? 80 : 150} scale={9} size={3} speed={0.4} color="#60A5FA" />
      <Sparkles count={isMobile ? 40 : 80} scale={7} size={5} speed={0.6} color="#38BDF8" />
    </group>
  );
}

function Scene3D({ mousePos, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 8.5 : 7.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 12, 10]} intensity={1.6} color="#93C5FD" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[0, 0, 5]} intensity={0.9} color="#38BDF8" />
      
      <Stars radius={50} depth={50} count={isMobile ? 700 : 1500} factor={4} saturation={0} fade speed={1.2} />
      <FloatingCyberCore mousePos={mousePos} isMobile={isMobile} />
    </Canvas>
  );
}

// --- Main Component ---

export const MaintenanceScreen3D = ({ onBypass }) => {
  const { lang, toggleLanguage } = useLanguage();
  const mousePos = useRef({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ammanTime, setAmmanTime] = useState('');
  const isAr = lang === 'ar';

  // Responsive mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse and touch movements
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mousePos.current = {
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Amman Time Clock Updates
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Amman',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setAmmanTime(new Intl.DateTimeFormat(isAr ? 'ar-JO' : 'en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isAr]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(maintenanceConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const titleText = maintenanceConfig.title[lang] || maintenanceConfig.title.ar;
  const subtitleText = maintenanceConfig.subtitle[lang] || maintenanceConfig.subtitle.ar;
  const statusText = maintenanceConfig.estimatedCompletion[lang] || maintenanceConfig.estimatedCompletion.ar;

  const techStackPills = [
    { name: '.NET 9 & C#', icon: <Cpu size={12} /> },
    { name: 'Angular & React', icon: <Code2 size={12} /> },
    { name: 'UI/UX & 3D WebGL', icon: <Layers size={12} /> },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#030712',
        color: '#F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        fontFamily: isAr ? "'Changa', sans-serif" : "'Space Grotesk', sans-serif",
        padding: isMobile ? '80px 16px 40px 16px' : '90px 24px 40px 24px',
      }}
    >
      {/* 3D Background Canvas */}
      <Scene3D mousePos={mousePos} isMobile={isMobile} />

      {/* Decorative Gradient Glows */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          left: '20%',
          width: isMobile ? '300px' : '550px',
          height: isMobile ? '300px' : '550px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-15%',
          right: '20%',
          width: isMobile ? '300px' : '550px',
          height: isMobile ? '300px' : '550px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
          zIndex: 1,
        }}
      />

      {/* Header Bar with Responsive Mobile Layout */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '14px 16px' : '20px 32px',
          zIndex: 50,
          background: 'rgba(3, 7, 18, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Brand Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: isMobile ? '36px' : '42px',
              height: isMobile ? '36px' : '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563EB 0%, #0284C7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: isMobile ? '16px' : '19px',
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)',
              color: '#FFFFFF',
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: isMobile ? '14px' : '16px', letterSpacing: '0.3px', color: '#F9FAFB' }}>
              {isAr ? 'أنس الطرايرة' : 'Anas Al-Tarayra'}
            </div>
            <div style={{ fontSize: isMobile ? '10px' : '12px', color: '#9CA3AF', fontWeight: '500' }}>
              {isAr ? 'مطور فول ستاك & UI/UX' : 'Full Stack & UI/UX Architect'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '10px' }}>
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: isMobile ? '6px 12px' : '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#E5E7EB',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            <Globe size={isMobile ? 13 : 15} />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {/* Admin Bypass Button */}
          {onBypass && (
            <button
              onClick={onBypass}
              title={isAr ? 'معاينة الموقع (خاص بالأدمن)' : 'Preview Site (Bypass)'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: isMobile ? '6px 10px' : '8px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                background: 'rgba(37, 99, 235, 0.15)',
                color: '#38BDF8',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.15)')}
            >
              <Eye size={isMobile ? 12 : 14} />
              <span>{isAr ? 'المعاينة' : 'Preview'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Ultra-Luxury Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '640px',
          zIndex: 10,
          background: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: isMobile ? '24px' : '32px',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(37, 99, 235, 0.2)',
          padding: isMobile ? '28px 18px' : '44px 36px',
          textAlign: 'center',
          position: 'relative',
          margin: 'auto 0',
        }}
      >
        {/* Animated Ambient Top Border Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #3B82F6 50%, transparent 100%)',
            boxShadow: '0 0 15px #3B82F6',
          }}
        />

        {/* Live Status Pill & Amman Time */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: isMobile ? '18px' : '24px',
          }}
        >
          {/* Pulsing Maintenance Status */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              background: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '700',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 12px #38BDF8',
                animation: 'pulse 1.8s infinite',
              }}
            />
            <Wrench size={13} />
            <span>{isAr ? 'قيد التطوير والتحديث الجاري ⚡' : 'SYSTEM UPDATE IN PROGRESS ⚡'}</span>
          </div>

          {/* Live Amman Clock Badge */}
          {ammanTime && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#9CA3AF',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: '600',
              }}
            >
              <Clock size={12} style={{ color: '#60A5FA' }} />
              <span>{isAr ? `عمان ${ammanTime}` : `Amman ${ammanTime}`}</span>
            </div>
          )}
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: isMobile ? 'clamp(20px, 5.5vw, 26px)' : '32px',
            fontWeight: '800',
            lineHeight: '1.3',
            marginBottom: '16px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          {titleText}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#94A3B8',
            lineHeight: '1.75',
            marginBottom: isMobile ? '20px' : '26px',
            maxWidth: '540px',
            margin: isMobile ? '0 auto 20px auto' : '0 auto 26px auto',
          }}
        >
          {subtitleText}
        </p>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: isMobile ? '20px' : '26px',
          }}
        >
          {techStackPills.map((pill, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#CBD5E1',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              {pill.icon}
              {pill.name}
            </span>
          ))}
        </div>

        {/* Progress Bar & Status Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: isMobile ? '16px' : '20px',
            padding: isMobile ? '14px 16px' : '18px 22px',
            marginBottom: isMobile ? '24px' : '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
            }}
          >
            <span style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} className="spin-slow" style={{ color: '#38BDF8' }} />
              {statusText}
            </span>
            <span style={{ color: '#38BDF8', fontWeight: '700' }}>{maintenanceConfig.progressPercent}%</span>
          </div>

          {/* Progress Bar Track */}
          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${maintenanceConfig.progressPercent}%` }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 100%)',
                borderRadius: '6px',
                boxShadow: '0 0 14px rgba(56, 189, 248, 0.9)',
              }}
            />
          </div>
        </div>

        {/* Action Buttons with Full Responsive Mobile Width */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '12px',
            justify: 'center',
            alignItems: 'stretch',
          }}
        >
          {/* WhatsApp Action */}
          <a
            href={maintenanceConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: isMobile ? '14px 20px' : '14px 26px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.2s ease, boxShadow 0.2s ease',
              width: isMobile ? '100%' : 'auto',
              flex: isMobile ? 'none' : '1',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
            }}
          >
            <MessageSquare size={18} />
            <span>{isAr ? 'تحدث معي على واتساب' : 'Chat on WhatsApp'}</span>
          </a>

          {/* Email Copy Button */}
          <button
            onClick={handleCopyEmail}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: isMobile ? '14px 20px' : '14px 22px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#E5E7EB',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: isMobile ? '100%' : 'auto',
              flex: isMobile ? 'none' : '1',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            {copiedEmail ? (
              <>
                <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                <span style={{ color: '#10B981' }}>{isAr ? 'تم نسخ البريد!' : 'Email Copied!'}</span>
              </>
            ) : (
              <>
                <Mail size={18} />
                <span>{isAr ? 'نسخ البريد الإلكتروني' : 'Copy Email'}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Icons Footer */}
        <div
          style={{
            marginTop: isMobile ? '24px' : '30px',
            paddingTop: isMobile ? '18px' : '22px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <a
            href={maintenanceConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{
              color: '#9CA3AF',
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a
            href={maintenanceConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{
              color: '#9CA3AF',
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#38BDF8';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </motion.div>

      {/* Bottom Copyright */}
      <div
        style={{
          marginTop: '20px',
          color: '#6B7280',
          fontSize: '12px',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        © {new Date().getFullYear()} Anas Al-Tarayra. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
      </div>

      {/* Inline Keyframe Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.25); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MaintenanceScreen3D;
