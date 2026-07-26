import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Copy, Check, Terminal, FileCode, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CodeSnippetModal = ({ project, onClose }) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('controller');

  if (!project) return null;

  const codeSnippets = {
    controller: {
      fileName: 'PortfolioApiController.cs',
      language: 'csharp',
      code: `using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnasPortfolio.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;

        public PortfolioController(IPortfolioService portfolioService)
        {
            _portfolioService = portfolioService;
        }

        [HttpGet("projects")]
        public async Task<IActionResult> GetProjects()
        {
            var data = await _portfolioService.GetFeaturedProjectsAsync();
            return Ok(new { success = true, payload = data });
        }
    }
}`,
    },
    service: {
      fileName: 'PortfolioService.cs',
      language: 'csharp',
      code: `public async Task<IEnumerable<ProjectDto>> GetFeaturedProjectsAsync()
{
    return await _context.Projects
        .Where(p => p.IsFeatured)
        .OrderByDescending(p => p.CreatedAt)
        .Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Stack = p.TechStack,
            Category = p.Category
        })
        .ToListAsync();
}`,
    },
    frontend: {
      fileName: 'ProjectCard.jsx',
      language: 'javascript',
      code: `import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project }) => {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card">
      <div className="badge">{project.category}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </motion.div>
  );
};`,
    },
  };

  const currentSnippet = codeSnippets[activeTab] || codeSnippets.controller;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(720px, 94vw)',
            height: '520px',
            backgroundColor: '#0D0E14',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#14161C',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={20} style={{ color: '#38BDF8' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#F1F5F9' }}>
                  {project.title} — {lang === 'ar' ? 'معاينة الكود والمهندسة' : 'Source Code Architecture'}
                </h4>
                <span style={{ fontSize: '0.78rem', color: '#8A8F98' }}>{currentSnippet.fileName}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handleCopy}
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38BDF8',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الكود' : 'Copy Code')}</span>
              </button>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', color: '#8A8F98', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* File Tabs */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#0A0A0F',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '8px',
            }}
          >
            {[
              { id: 'controller', name: 'Controller.cs' },
              { id: 'service', name: 'Service.cs' },
              { id: 'frontend', name: 'Component.jsx' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: activeTab === tab.id ? '#38BDF8' : '#8A8F98',
                  cursor: 'pointer',
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Code Viewer Body */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: '#F1F5F9',
              backgroundColor: '#090A0F',
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <code>{currentSnippet.code}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
