import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GitBranch, Star, ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

// # CONFIGURATION: Edit your GitHub username here
const GITHUB_USERNAME = "anastarayra12-ctrl"; 
const CACHE_KEY = `github_repos_${GITHUB_USERNAME}`;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

const getLanguageColor = (lang) => {
  switch (lang?.toLowerCase()) {
    case 'c#': return '#178600';
    case 'typescript': return '#3178C6';
    case 'javascript': return '#F7DF1E';
    case 'html': return '#E34F26';
    case 'css': return '#563D7C';
    case 'python': return '#3572A5';
    default: return 'var(--accent-blue)';
  }
};

export const GitHubActivity = () => {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';
  
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      // 1. Check LocalStorage Cache first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION && Array.isArray(data)) {
            setRepos(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // 2. Fetch fresh data from GitHub REST API
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`);
        if (!res.ok) throw new Error('GitHub API Error');
        const data = await res.json();
        
        // Cache result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));

        setRepos(data);
      } catch (err) {
        console.warn('GitHub API rate limit or network error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div style={{ marginTop: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Code2 size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {isRTL ? 'أحدث المستودعات البرمجية (GitHub Repos)' : 'Recent GitHub Repositories'}
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {isRTL ? 'محدثة تلقائياً عبر GitHub REST API' : 'Automatically fetched via GitHub REST API'}
            </span>
          </div>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'var(--accent-blue)', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>{isRTL ? 'عرض الملف الكامل' : 'View Full Profile'}</span>
          <ExternalLink size={15} />
        </a>
      </div>

      {/* Content States */}
      {loading ? (
        /* Loading Skeleton Shimmer Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-card" style={{ padding: '20px', borderRadius: '16px' }}>
              <div className="skeleton" style={{ width: '60%', height: '20px', borderRadius: '6px', marginBottom: '12px' }} />
              <div className="skeleton" style={{ width: '90%', height: '14px', borderRadius: '4px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ width: '40%', height: '14px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error Fallback Card */
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AlertCircle size={22} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {isRTL ? 'تعذر تحميل قائمة المستودعات مباشرة حالياً' : 'Unable to load repositories directly right now'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {isRTL ? 'يمكنك تفقد كود المشاريع من خلال زيارة حساب GitHub الرسمي.' : 'You can view all source code directly on GitHub profile.'}
            </div>
          </div>
        </div>
      ) : (
        /* Real Repos Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {repos.map((repo) => (
            <MagneticElement key={repo.id} strength={0.15} style={{ width: '100%' }}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 250ms ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--accent-blue)', fontSize: '0.98rem' }}>
                        <GitBranch size={16} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink size={14} style={{ color: 'var(--text-secondary)', opacity: 0.7 }} />
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {repo.description || (isRTL ? 'مستودع برمجي على GitHub' : 'GitHub Software Repository')}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    {repo.language && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLanguageColor(repo.language) }} />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={13} style={{ color: '#F59E0B' }} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>
              </a>
            </MagneticElement>
          ))}
        </div>
      )}
    </div>
  );
};

export default GitHubActivity;
