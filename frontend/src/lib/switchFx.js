/**
 * Tiny bridge between the preference contexts and the <SwitchFx /> overlay.
 *
 *   playSwitchFx({ type: 'design' | 'code', origin, meta, apply })
 *
 * `apply` performs the real state change. The overlay calls it at the moment
 * the screen is fully covered, so the swap itself is never seen. Without a
 * mounted overlay, or for reduced-motion users, `apply` runs immediately.
 */
let handler = null;
let busy = false;

export function registerSwitchFx(fn) {
  handler = fn;
  return () => {
    if (handler === fn) handler = null;
  };
}

export function playSwitchFx(job) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!handler || reduce) {
    job.apply();
    return;
  }
  if (busy) return; // ignore repeated clicks while an effect is running
  busy = true;
  Promise.resolve(handler(job))
    .catch(() => job.apply())
    .finally(() => {
      busy = false;
    });
}
