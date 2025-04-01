import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  const { mode } = useTheme();

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return <RouterProvider router={router} />;
}

export default App;