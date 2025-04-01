import { MainLayout } from '../layouts/MainLayout';

export const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 items-center justify-center min-h-[50vh]">
        <h1 className="text-theme-text text-4xl font-semibold">404 - Page Not Found</h1>
        <p className="text-theme-text">The page you're looking for doesn't exist.</p>
      </div>
    </MainLayout>
  );
};