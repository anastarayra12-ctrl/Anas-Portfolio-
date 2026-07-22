import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2, Play, Sparkles, Code2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const InteractiveTerminalModal = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to ANAS Interactive Developer Shell v2.4.0' },
    { type: 'system', text: 'Type "help" or click action chips below to execute commands.' },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
- about    : Learn about Anas Tarayra
- skills   : View tech stack & tools
- projects : View top projects & repositories
- contact  : Get contact information & social links
- matrix   : Toggle digital matrix rain simulation
- clear    : Clear terminal screen`,
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: `Anas Tarayra | Full-Stack & UI/UX Software Engineer
Location: Amman, Jordan
University: Al-Zaytoonah University of Jordan
Passions: High performance .NET applications, AI tooling, and sleek UI animations.`,
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Frontend]  React.js, JavaScript (ES6+), Vite, HTML5/CSS3, TailwindCSS, Framer Motion
[Backend]   C#, .NET Core, Web API, Entity Framework, Node.js
[Databases] SQL Server, PostgreSQL, MongoDB
[Tools]     Git, VS Code, Visual Studio, Docker, Figma`,
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Interactive Portfolio Engine (.NET + React)
2. E-Commerce Platform API (.NET Core + SQL Server)
3. AI Assistance & Developer Dashboard`,
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: anastarayra@gmail.com
Phone: +962 7 9000 0000
GitHub: github.com/anastarayra
LinkedIn: linkedin.com/in/anastarayra`,
        });
        break;
      case 'matrix':
        newHistory.push({
          type: 'matrix',
          text: '01000001 01001110 01000001 01010011 00100000 01001101 01000001 01010100 01010010 01001001 01011000',
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        title={lang === 'ar' ? 'افتح موجه الأوامر البرمجي' : 'Open Developer Terminal'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: lang === 'ar' ? 'auto' : '30px',
          right: lang === 'ar' ? '30px' : 'auto',
          zIndex: 990,
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          color: '#38BDF8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '14px',
          padding: '12px 18px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: '0.88rem',
        }}
      >
        <Terminal size={18} />
        <span>{lang === 'ar' ? 'التيرمينال' : 'CLI Terminal'}</span>
      </motion.button>

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              left: lang === 'ar' ? 'auto' : '30px',
              right: lang === 'ar' ? '30px' : 'auto',
              width: 'min(500px, 92vw)',
              height: '380px',
              zIndex: 999,
              backgroundColor: '#090D16',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: '#0F172A',
                padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '0.85rem' }}>
                <Terminal size={14} />
                <span>anas-cli ~ zsh</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
              }}
            >
              {['help', 'about', 'skills', 'projects', 'contact', 'matrix', 'clear'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleCommand(chip)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    color: '#38BDF8',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ${chip}
                </button>
              ))}
            </div>

            {/* Terminal Body Output */}
            <div
              style={{
                flex: 1,
                padding: '14px',
                overflowY: 'auto',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                color: '#E2E8F0',
              }}
            >
              {history.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'user' && <span style={{ color: '#38BDF8', fontWeight: 600 }}>{item.text}</span>}
                  {item.type === 'system' && <span style={{ color: '#94A3B8' }}>{item.text}</span>}
                  {item.type === 'output' && (
                    <pre style={{ margin: 0, fontFamily: 'inherit', color: '#F1F5F9', whiteSpace: 'pre-wrap' }}>
                      {item.text}
                    </pre>
                  )}
                  {item.type === 'matrix' && (
                    <span style={{ color: '#10B981', fontWeight: 700, letterSpacing: '0.05em' }}>{item.text}</span>
                  )}
                  {item.type === 'error' && <span style={{ color: '#F87171' }}>{item.text}</span>}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Command Input Bar */}
            <form
              onSubmit={onSubmit}
              style={{
                padding: '10px 14px',
                backgroundColor: '#0F172A',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#38BDF8', fontWeight: 700 }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: '#F8FAFC',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#38BDF8',
                  cursor: 'pointer',
                  padding: '2px',
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
