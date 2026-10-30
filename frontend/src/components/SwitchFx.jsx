import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { registerSwitchFx } from '../fx/switchFx';
import './SwitchFx.css';

/*
 * Host for the theme / language transitions (the scenes themselves are
 * described in SwitchFxScenes.jsx). The scenes are only needed when someone
 * toggles, so they live in their own chunk: prefetched once the page is idle,
 * and awaited before a transition starts, so even the first toggle plays in full.
 */
const loadScenes = () => import('./SwitchFxScenes');
const DesignFx = lazy(() => loadScenes().then((mod) => ({ default: mod.DesignFx })));
const CodeFx = lazy(() => loadScenes().then((mod) => ({ default: mod.CodeFx })));

export function SwitchFx() {
  const [job, setJob] = useState(null);
  const resolver = useRef(null);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    idle(() => loadScenes().catch(() => {}));
    return registerSwitchFx((j) =>
      loadScenes().then(
        () =>
          new Promise((resolve) => {
            resolver.current = resolve;
            setJob({ ...j, id: Date.now() });
          }),
      ),
    );
  }, []);

  const done = useCallback(() => {
    setJob(null);
    resolver.current?.();
    resolver.current = null;
  }, []);

  if (!job) return null;
  return (
    <Suspense fallback={null}>
      {job.type === 'design' ? <DesignFx key={job.id} job={job} onDone={done} /> : <CodeFx key={job.id} job={job} onDone={done} />}
    </Suspense>
  );
}
