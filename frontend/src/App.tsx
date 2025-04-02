import { useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import OnboardingScreenPage from './pages/OnboardingScreenPage';

function App() {
  const { mode } = useTheme();
  const [showOnboarding, setShowOnboarding] = useState<boolean>(
    !localStorage.getItem("hasCompletedOnboarding")
  );
  useEffect(() => {
    // Apply the class to the root element
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  if (showOnboarding) {
    return <OnboardingScreenPage />;
  }

  return <RouterProvider router={router} />;
}

export default App;