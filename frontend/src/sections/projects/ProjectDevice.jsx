/**
 * A project shown on its own screens: a browser window with the desktop screenshot
 * and a phone with the mobile one. The phone sits on its own depth layer
 * (translateZ in CSS), so it floats in front of the browser inside the 3D stage.
 */
export function ProjectDevice({ project, title, labels, eager = false, shot = 'desktop' }) {
  const base = `/projects/${project.id}`;
  return (
    <div className="device">
      <div className="device__browser">
        <div className="device__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="device__url" dir="ltr">
            {project.domain}
          </span>
        </div>
        <img
          className="device__shot"
          src={`${base}-${shot}.webp`}
          alt={`${labels.desktop} ${title}`}
          width="1280"
          height="800"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="device__phone">
        <img src={`${base}-mobile.webp`} alt={`${labels.mobile} ${title}`} width="585" height="1266" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
