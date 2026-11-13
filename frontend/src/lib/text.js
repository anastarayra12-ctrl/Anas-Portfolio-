/** Latin project names keep the Latin face (and LTR order) inside the Arabic page. */
export const latin = (text) => (/^[A-Za-z]/.test(text) ? { className: 'is-latin', dir: 'ltr' } : {});
