import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Experience } from './experience/Experience';

const PlainView = lazy(() => import('./PlainView'));

type Mode = 'experience' | 'plain';

// Old in-page anchors (#missions, #contact ...) keep working: they open the plain
// view at that section. Experience routes use the #/section form.
const PLAIN_ANCHORS = ['#plain', '#hero', '#profile', '#arsenal', '#missions', '#timeline', '#contact'];

function modeFromHash(): Mode {
  const h = window.location.hash;
  if (PLAIN_ANCHORS.includes(h)) return 'plain';
  return 'experience';
}

export default function App() {
  const [mode, setMode] = useState<Mode>(modeFromHash);

  useEffect(() => {
    const onHash = () => setMode(modeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    if (mode !== 'experience') window.scrollTo(0, 0);
  }, [mode]);

  return (
    <ThemeProvider>
      <Suspense fallback={<div className="plain-loading" />}>
        {mode === 'plain' && <PlainView />}
        {mode === 'experience' && <Experience />}
      </Suspense>
    </ThemeProvider>
  );
}
