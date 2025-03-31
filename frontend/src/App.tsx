import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Collections } from './pages/Collections';

function App() {
  const { mode, toggle } = useTheme();

  // Apply the theme class to the <html> element
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
 
    <>
       {/* <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-text mb-4">
        Current Mode: {mode}
      </h1>
      <button
        onClick={toggle}
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80 transition"
      >
        Toggle Theme
      </button>
    </div> */}
    <Collections />
    </>
  );
}

export default App;