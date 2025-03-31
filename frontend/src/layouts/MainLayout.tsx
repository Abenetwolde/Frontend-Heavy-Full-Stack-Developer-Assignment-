import { Icon } from '@iconify/react';
import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: 'dashboard' | 'collections';
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab = 'collections',
}) => {
  const { mode, toggle } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-theme-card">
        {/* Left Side: Dashboard and Collections */}
        <div className="flex items-center gap-4">
          <button
            className={`p-2 rounded-lg transition ${
              activeTab === 'dashboard'
                ? 'bg-theme-accent text-white'
                : 'text-theme-text hover:bg-opacity-80'
            }`}
          >
            <Icon icon="mdi:view-dashboard" className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-lg transition ${
              activeTab === 'collections'
                ? 'bg-theme-accent text-white'
                : 'text-theme-text hover:bg-opacity-80'
            }`}
          >
            <Icon icon="mdi:book" className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side: Add, Search, Notification, Theme Toggle */}
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
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (Mobile) */}
        <div className="sm:hidden flex items-center justify-between p-4 bg-theme-card">
          <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
          <Icon icon="mdi:dots-horizontal" className="w-6 h-6 text-theme-text" />
        </div>

        {/* Sidebar (Desktop) */}
        <div className="hidden sm:flex flex-col gap-4 p-4 bg-theme-card w-full sm:w-64">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:book" className="w-6 h-6 text-theme-text" />
            <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
          </div>
          <nav className="flex flex-col gap-2">
            <button
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

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 bg-theme-bg">{children}</div>
      </div>
    </div>
  );
};