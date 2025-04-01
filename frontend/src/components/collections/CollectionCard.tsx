import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../../types/collection';
import Chart from 'react-apexcharts';

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const navigate = useNavigate();
  const progress = (collection.completedTasks / collection.taskCount) * 100;

  // Map the collection's color to the progress bar color
  const progressColor = collection.color.replace('bg-', '');

  const handleClick = () => {
    navigate(`/collections/${collection.name.toLowerCase()}`);
  };

  // ApexCharts configuration for the circular progress bar
  const chartOptions: any = {
    chart: {
      type: 'radialBar' as const,
      height: 24,
      width: 24,
    },
    plotOptions: {
      radialBar: {
        hollow: {
       
          size: '20%', // Reduced from 50% to 30% to make the bar thicker
        },
        track: {
          background: 'rgba(255, 255, 255, 0.2)', // Background track color
        },
        dataLabels: {
          show: false, // Hide the percentage label in the center
        },
      },
    },
    colors: [`var(--color-${progressColor})`], // Match the progress bar color to the icon
    series: [progress], // The progress value (e.g., 50 for 4/8)
    stroke: {
      // width: 8, // Width of the progress bar
      lineCap: 'round', // Rounded ends for the progress bar
    },
  };

  return (
    <div
      onClick={handleClick}
      className="bg-theme-card/80 rounded-lg p-4 flex flex-col gap-3 w-full transition hover:bg-opacity-60 cursor-pointer"
    >
      {/* Icon and Name */}
      <div className="flex items-center gap-3">
        <div className={`${collection.color} rounded-full p-2`}>
          <Icon icon={collection.icon} className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Task Count and Progress */}
      <div className="flex items-center justify-between">
        <p className="text-theme-text/70 text-sm">
        <h3 className="text-theme-text text-base font-semibold">{collection.name}</h3>
          {collection.completedTasks}/{collection.taskCount} done
        </p>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-15 h-15 ">

          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="radialBar"
            height={"100%"} // Adjust the height of the chart as needed
            width={"100%"} // Adjust the width of the chart as needed
      // Adjust the height of the chart as needed

          />
      </div>
      </div>
      </div>
    </div>
  );
};