import { MainLayout } from '../layouts/MainLayout';

export const Dashboard: React.FC = () => {
  return (
    <MainLayout activeTab="dashboard">
      <div className="flex flex-col gap-6">
        <h1 className="text-theme-text text-2xl font-semibold">Dashboard</h1>
        <p className="text-theme-text">This is the Dashboard page (to be implemented).</p>
      </div>
    </MainLayout>
  );
};