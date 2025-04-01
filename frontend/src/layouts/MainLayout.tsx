import { Icon } from '@iconify/react';
import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: 'dashboard' | 'collections';
  hideSidebar?: boolean; // New prop to hide the sidebar
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab = 'collections',
  hideSidebar = false,
}) => {
  const { mode, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area (Adjusted for Navbar Position) */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar (Mobile) */}
        {!hideSidebar && (
          <div className="lg:hidden flex items-center justify-between p-4 bg-theme-card">
            <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
            <Icon icon="mdi:dots-horizontal" className="w-6 h-6 text-theme-text" />
          </div>
        )}

        {/* Sidebar (Desktop) */}
        {!hideSidebar && (
          <div className="hidden lg:flex flex-col gap-4 p-4 bg-theme-card w-full lg:w-64">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:book" className="w-6 h-6 text-theme-text" />
              <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-2 p-2 rounded-lg transition ${
                  activeTab === 'dashboard'
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <Icon icon="mdi:view-dashboard" className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => navigate('/collections')}
                className={`flex items-center gap-2 p-2 rounded-lg transition ${
                  activeTab === 'collections'
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <Icon icon="mdi:book" className="w-5 h-5" />
                Collections
              </button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 bg-theme-bg">{children}</div>
      </div>

      {/* Navbar */}
      <nav className="lg:order-first order-last">
        {/* Desktop Navbar (Top) */}
        <div className="hidden lg:flex items-center justify-between bg-theme-card px-6 py-4">
          {/* Left Side: Dashboard and Collections */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg transition ${
                  activeTab === 'dashboard'
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <Icon icon="mdi:view-dashboard" className="w-6 h-6" />
              </button>
              <p className="text-theme-text">Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/collections')}
                className={`p-2 rounded-lg transition ${
                  activeTab === 'collections'
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <Icon icon="mdi:book" className="w-6 h-6" />
              </button>
              <p className="text-theme-text">Collections</p>
            </div>
          </div>

          {/* Right Side: Add, Search, Theme Toggle */}
          <div className="flex items-center gap-4">
            <button className="p-2 bg-theme-accent text-white rounded-full hover:bg-opacity-80 transition">
              <Icon icon="mdi:plus" className="w-6 h-6" />
            </button>
            <button className="p-2 text-theme-text hover:bg-opacity-80 transition">
              <Icon icon="mdi:magnify" className="w-6 h-6" />
            </button>
            <button
              onClick={toggle}
              className="px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-opacity-80 transition"
            >
              Toggle Theme ({mode})
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navbar (Bottom) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-theme-card flex justify-around items-center py-3 border-t border-theme-text/10">
          <button
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg transition ${
              activeTab === 'dashboard'
                ? 'bg-theme-accent text-white'
                : 'text-theme-text hover:bg-opacity-80'
            }`}
          >
            <Icon icon="mdi:view-dashboard" className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate('/collections')}
            className={`p-2 rounded-lg transition ${
              activeTab === 'collections'
                ? 'bg-theme-accent text-white'
                : 'text-theme-text hover:bg-opacity-80'
            }`}
          >
            <Icon icon="mdi:book" className="w-6 h-6" />
          </button>
          <button className="p-3 bg-theme-accent text-white rounded-full hover:bg-opacity-80 transition -mt-8">
            <Icon icon="mdi:plus" className="w-8 h-8" />
          </button>
          <button className="p-2 text-theme-text hover:bg-opacity-80 transition">
            <Icon icon="mdi:magnify" className="w-6 h-6" />
          </button>
          <button
            onClick={toggle}
            className="p-2 text-theme-text hover:bg-opacity-80 transition"
          >
            <Icon
              icon={mode === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'}
              className="w-6 h-6"
            />
          </button>
        </div>
      </nav>
    </div>
  );
};