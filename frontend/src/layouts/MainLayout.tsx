import { Icon } from '@iconify/react';
import { ReactNode, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, useLocation } from 'react-router-dom';
import { Task } from '../types/task';
import { AddEditTaskModal } from '../components/tasks/AddEditTaskModal';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/common/LanguageDropdown';

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: 'dashboard' | 'collections';
  hideSidebar?: boolean;
  showHamburger?: boolean;
  onToggleSidebar?: (isExpanded: boolean) => void; // Updated callback to handle both text and width
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab,
  hideSidebar = false,
  showHamburger = false,
  onToggleSidebar,
}) => {
  const { mode, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // State for sidebar expansion
  const { t } = useTranslation();

  const currentPath = location.pathname;
  const isDashboardActive = currentPath === '/dashboard';
  const isCollectionsActive = currentPath === '/collections';

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    if (onToggleSidebar) {
      onToggleSidebar(!isSidebarExpanded);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar (Mobile) */}
        {!hideSidebar && (
          <div className="lg:hidden flex items-center justify-between p-4 bg-theme-card">
            <h1 className="text-theme-text text-xl font-semibold">{t('collections')}</h1>
            <Icon icon="mdi:dots-horizontal" className="w-6 h-6 text-theme-text" />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 bg-theme-bg">{children}</div>
      </div>

      {/* Navbar */}
      <nav className="lg:order-first order-last">
        {/* Desktop Navbar (Top) */}
        <div className="hidden lg:flex items-center justify-between bg-theme-card px-6 py-4">
          {/* Left Side: Hamburger (if shown), Dashboard, and Collections */}
          <div className="flex items-center gap-10">
            {showHamburger && (
              <button onClick={toggleSidebar} className="text-theme-text p-2">
                <Icon icon="mdi:menu" className="w-6 h-6" />
              </button>
            )}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <button
                className={`p-2 rounded-lg transition ${
                  isDashboardActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Icon
                  icon="mdi:view-dashboard"
                  className={`w-6 h-6 ${
                    isDashboardActive ? 'text-theme-text' : 'text-theme-text/50 hover:text-theme-text/80'
                  }`}
                />
              </button>
              <p
                className={`${
                  isDashboardActive ? 'text-theme-text' : 'text-theme-text/50 hover:text-theme-text/80'
                }`}
              >
                {t('dashboard')}
              </p>
            </div>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/collections')}>
              <button
                className={`p-2 rounded-lg transition ${
                  isCollectionsActive ? 'text-theme-text' : 'text-theme-text/50 hover:text-theme-text/80'
                }`}
              >
                <Icon
                  icon="mdi:book"
                  className={`w-6 h-6 ${
                    isCollectionsActive ? 'text-theme-text' : 'text-theme-text/50 hover:text-theme-text/80'
                  }`}
                />
              </button>
              <p
                className={`${
                  isCollectionsActive ? 'text-theme-text' : 'text-theme-text/50 hover:text-theme-text/80'
                }`}
              >
                {t('collections')}
              </p>
            </div>
          </div>

          {/* Right Side: Add, Search, Theme Toggle, Language Dropdown */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddClick}
              className="p-2 bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-full hover:from-gradient-start-hover hover:to-gradient-end-hover transition"
            >
              <Icon icon="mdi:plus" className="w-6 h-6" />
            </button>
            <button className="p-2 text-theme-text hover:bg-opacity-80 transition relative">
              <Icon icon="mdi:bell" className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-theme-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <LanguageDropdown />
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg text-theme-text"
              >
                <Icon
                  icon={mode === 'dark' ? 'mdi:moon-waning-crescent' : 'mdi:weather-sunny'}
                  className="w-5 h-5 text-theme-accent"
                />
                <span className="text-sm font-semibold">
                  {mode === 'dark' ? t('dark') : t('light')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Navbar (Bottom) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-theme-card flex justify-around items-center py-3 border-t border-theme-text/10">
          <button
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg transition ${
              isDashboardActive ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Icon
              icon="mdi:view-dashboard"
              className={`w-6 h-6 ${
                isDashboardActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            />
          </button>
          <button
            onClick={() => navigate('/collections')}
            className={`p-2 rounded-lg transition ${
              isCollectionsActive ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Icon
              icon="mdi:book"
              className={`w-6 h-6 ${
                isCollectionsActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            />
          </button>
          <button
            onClick={handleAddClick}
            className="p-3 bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-full hover:from-gradient-start-hover hover:to-gradient-end-hover transition -mt-8"
          >
            <Icon icon="mdi:plus" className="w-8 h-8" />
          </button>
          {/* <button className="p-2 text-theme-text hover:bg-opacity-80 transition">
            <Icon icon="mdi:magnify" className="w-6 h-6" />
          </button> */}
          <LanguageDropdown />
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg text-theme-text"
            >
              <Icon
                icon={mode === 'dark' ? 'mdi:moon-waning-crescent' : 'mdi:weather-sunny'}
                className="w-5 h-5 text-theme-accent"
              />
              <span className="text-sm font-semibold">
                {mode === 'dark' ? t('dark') : t('light')}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Add Task Modal */}
      <AddEditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        collectionId={1}
        fromNavbar={true}
      />
    </div>
  );
};