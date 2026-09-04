import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, Wrench, RefreshCw, Eye, Sparkles as SparklesIcon, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import maintenanceConfig from '../config/maintenanceConfig';

// --- 3D Scene Components ---

function FloatingCyberCore({ mousePos }) {
  const knotRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const outerSphereRef = useRef();

  useFrame((state, delta) => {
    const targetX = (mousePos.current.x * Math.PI) / 8;
    const targetY = (mousePos.current.y * Math.PI) / 8;

    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.4;
      knotRef.current.rotation.y += delta * 0.6;
      knotRef.current.rotation.z += delta * 0.2;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.3;
      ringRef1.current.rotation.y -= delta * 0.5;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.4;
      ringRef2.current.rotation.z += delta * 0.3;
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.15;
      // Smooth mouse follow
      outerSphereRef.current.rotation.x += (targetY - outerSphereRef.current.rotation.x) * 0.05;
      outerSphereRef.current.rotation.y += (targetX - outerSphereRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={outerSphereRef}>
      {/* Central 3D Torus Knot Core */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#1E3A8A"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Outer Wireframe Tech Sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshStandardMaterial
          color="#60A5FA"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting Glowing Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting Glowing Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#93C5FD"
          emissive="#2563EB"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Ambient Particle Field */}
      <Sparkles count={120} scale={8} size={3} speed={0.4} color="#60A5FA" />
      <Sparkles count={60} scale={6} size={5} speed={0.6} color="#3B82F6" />
    </group>
  );
}

function Scene3D({ mousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#93C5FD" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#3B82F6" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#60A5FA" />
      
      <Stars radius={50} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
      <FloatingCyberCore mousePos={mousePos} />
    </Canvas>
  );
}

// --- Main Component ---

export const MaintenanceScreen3D = ({ onBypass }) => {
  const { lang, toggleLanguage } = useLanguage();
  const mousePos = useRef({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(maintenanceConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const titleText = maintenanceConfig.title[lang] || maintenanceConfig.title.ar;
  const subtitleText = maintenanceConfig.subtitle[lang] || maintenanceConfig.subtitle.ar;
  const statusText = maintenanceConfig.estimatedCompletion[lang] || maintenanceConfig.estimatedCompletion.ar;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#05070D',
        color: '#F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: isAr ? "'Changa', sans-serif" : "'Space Grotesk', sans-serif",
      }}
    >
      {/* 3D Background Canvas */}
      <Scene3D mousePos={mousePos} />

      {/* Decorative Gradient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      {/* Header Bar with Language & Bypass Option */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Brand Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '18px',
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', letterSpacing: '0.5px' }}>
              {isAr ? 'أنس الطرايرة' : 'Anas Al-Tarayra'}
            </div>
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
              {isAr ? 'مطور فول ستاك & مصمم واجهات' : 'Full Stack Dev & UI Designer'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#E5E7EB',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
          >
            <Globe size={15} />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {onBypass && (
            <button
              onClick={onBypass}
              title={isAr ? 'معاينة الموقع (خاص بالأدمن)' : 'Preview Site (Bypass)'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                background: 'rgba(37, 99, 235, 0.15)',
                color: '#60A5FA',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.15)')}
            >
              <Eye size={14} />
              <span>{isAr ? 'المعاينة' : 'Preview'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Glassmorphism Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '90%',
          maxWidth: '620px',
          zIndex: 10,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 235, 0.15)',
          padding: '40px 32px',
          textAlign: 'center',
          position: 'relative',
          margin: '20px',
        }}
      >
        {/* Maintenance Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              background: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60A5FA',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                boxShadow: '0 0 10px #3B82F6',
                animation: 'pulse 1.8s infinite',
              }}
            />
            <Wrench size={14} />
            <span>{isAr ? 'تحديث وتطوير النظام ⚡' : 'SYSTEM UPDATE IN PROGRESS ⚡'}</span>
          </div>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: '800',
            lineHeight: '1.3',
            marginBottom: '16px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {titleText}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#94A3B8',
            lineHeight: '1.7',
            marginBottom: '28px',
            maxWidth: '520px',
            margin: '0 auto 28px auto',
          }}
        >
          {subtitleText}
        </p>

        {/* Progress Bar & Status */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '18px 20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            <span style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} className="spin-slow" style={{ color: '#60A5FA' }} />
              {statusText}
            </span>
            <span style={{ color: '#60A5FA', fontWeight: '700' }}>{maintenanceConfig.progressPercent}%</span>
          </div>

          {/* Progress Bar track */}
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
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
                borderRadius: '6px',
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)',
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justify: 'center',
            alignItems: 'center',
          }}
        >
          {/* WhatsApp Direct Action */}
          <a
            href={maintenanceConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)',
              transition: 'transform 0.2s ease, boxShadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.35)';
            }}
          >
            <MessageSquare size={17} />
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
              padding: '12px 20px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#E5E7EB',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            {copiedEmail ? (
              <>
                <CheckCircle2 size={17} style={{ color: '#10B981' }} />
                <span style={{ color: '#10B981' }}>{isAr ? 'تم نسخ الإيميل!' : 'Email Copied!'}</span>
              </>
            ) : (
              <>
                <Mail size={17} />
                <span>{isAr ? 'نسخ البريد الإلكتروني' : 'Copy Email'}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Icons Footer */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
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
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              transition: 'color 0.2s ease, background 0.2s ease',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a
            href={maintenanceConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{
              color: '#9CA3AF',
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              transition: 'color 0.2s ease, background 0.2s ease',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#60A5FA';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </motion.div>

      {/* Bottom Footer Note */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          color: '#6B7280',
          fontSize: '12px',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        © {new Date().getFullYear()} Anas Al-Tarayra. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
      </div>

      {/* Global Inline Animation Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
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
