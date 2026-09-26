import { createContext, useContext } from 'react';

/**
 * `true` once the splash screen has finished (or was skipped), so page-level
 * entrance animations start *after* the splash instead of hidden behind it.
 */
export const IntroContext = createContext(true);

// eslint-disable-next-line react-refresh/only-export-components
export const useIntroReady = () => useContext(IntroContext);
