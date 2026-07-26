import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';
import useAppStore from '../store/useAppStore';

export const CmdKModal = () => {
  const { lang, setLang, theme, setTheme } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: lang === 'ar' ? 'مرحباً في طرفية أنس. اكتب help لرؤية الأوامر.' : 'Welcome to Anas Terminal. Type help to see commands.' }
  ]);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      setInput('');
      
      const newHistory = [...history, { type: 'user', text: cmd }];
      
      const args = cmd.toLowerCase().split(' ');
      const mainCmd = args[0];

      if (mainCmd === 'help') {
        newHistory.push({ type: 'system', text: 'Commands: cd projects, theme --dark, theme --light, lang --ar, lang --en, clear' });
      } else if (mainCmd === 'clear') {
        setHistory([]);
        return;
      } else if (mainCmd === 'cd' && args[1] === 'projects') {
        window.location.hash = '#projects';
        newHistory.push({ type: 'system', text: 'Navigating to projects...' });
        setTimeout(() => setIsOpen(false), 800);
      } else if (mainCmd === 'theme') {
        if (args[1] === '--dark') {
          setTheme('dark');
          newHistory.push({ type: 'system', text: 'Theme set to dark mode.' });
        } else if (args[1] === '--light') {
          setTheme('light');
          newHistory.push({ type: 'system', text: 'Theme set to light mode.' });
        } else {
          newHistory.push({ type: 'error', text: 'Invalid theme argument. Use --dark or --light.' });
        }
      } else if (mainCmd === 'lang') {
        if (args[1] === '--ar') {
          setLang('ar');
          newHistory.push({ type: 'system', text: 'تم تغيير اللغة إلى العربية.' });
        } else if (args[1] === '--en') {
          setLang('en');
          newHistory.push({ type: 'system', text: 'Language set to English.' });
        } else {
          newHistory.push({ type: 'error', text: 'Invalid lang argument. Use --ar or --en.' });
        }
      } else {
        newHistory.push({ type: 'error', text: `Command not found: ${mainCmd}` });
      }
      
      setHistory(newHistory);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
          }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(640px, 92vw)',
              backgroundColor: 'var(--code-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
              overflow: 'hidden',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}
            >
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                <TerminalIcon size={16} />
                <span>terminal ~ anastarayra</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal History */}
            <div ref={historyRef} style={{ maxHeight: '300px', overflowY: 'auto', padding: '16px', fontSize: '0.9rem' }}>
              {history.map((entry, idx) => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  {entry.type === 'user' && (
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[var(--accent-blue)]">➜</span>
                      <span>{entry.text}</span>
                    </div>
                  )}
                  {entry.type === 'system' && (
                    <div className="text-[var(--text-secondary)] pl-4">{entry.text}</div>
                  )}
                  {entry.type === 'error' && (
                    <div className="text-red-400 pl-4">{entry.text}</div>
                  )}
                </div>
              ))}

              {/* Current Input */}
              <div className="flex items-center gap-2 text-white mt-2">
                <span className="text-[var(--accent-blue)]">➜</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none flex-1 text-white font-mono"
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
