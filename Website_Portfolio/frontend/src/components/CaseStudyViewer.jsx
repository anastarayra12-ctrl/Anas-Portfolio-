import React, { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const modules = import.meta.glob('../content/case-studies/*.mdx');

const components = {
  h1: (props) => <h1 className="text-4xl font-bold mb-6 text-[var(--accent-blue)]" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mb-4 mt-8" {...props} />,
  p: (props) => <p className="mb-4 text-lg leading-relaxed text-[var(--text-secondary)]" {...props} />,
  pre: (props) => <pre className="bg-[var(--code-bg)] p-4 rounded-xl overflow-x-auto border border-[var(--border-color)] my-6" {...props} />,
  code: (props) => <code className="font-mono text-[var(--accent-blue)]" {...props} />
};

export const CaseStudyViewer = ({ slug, onBack }) => {
  const [Content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  useEffect(() => {
    const loadContent = async () => {
      try {
        const path = `../content/case-studies/${slug}.mdx`;
        if (modules[path]) {
          const mod = await modules[path]();
          setContent(() => mod.default);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load MDX", err);
        setError(true);
      }
    };
    if (slug) loadContent();
  }, [slug]);

  if (error) {
    return (
      <div className="container text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
        <button onClick={onBack} className="btn-primary">Go Back</button>
      </div>
    );
  }

  if (!Content) {
    return <div className="container text-center py-20">Loading...</div>;
  }

  return (
    <div className="container py-10 max-w-4xl">
      <button onClick={onBack} className="btn-outline mb-10 border-none px-0 hover:bg-transparent">
        {isRtl ? <ArrowRight className="mr-0 ml-2" /> : <ArrowLeft className="mr-2" />}
        {isRtl ? 'العودة للمشاريع' : 'Back to Projects'}
      </button>
      <div className="glass-card p-10">
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </div>
    </div>
  );
};
