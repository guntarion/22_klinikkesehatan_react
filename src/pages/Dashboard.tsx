import { Users, Calendar, Activity, Stethoscope } from 'lucide-react';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  className,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
}) => (
  <div className='bg-white rounded-lg shadow p-6'>
    <div className='flex items-center'>
      <div className={`rounded-full p-3 ${className}`}>
        <Icon className='w-6 h-6' />
      </div>
      <div className='ml-4'>
        <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
        <p className='text-2xl font-semibold text-gray-900'>{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Dashboard</h2>
        <p className='mt-1 text-sm text-gray-500'>
          Overview aktivitas klinik hari ini
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          title='Total Pasien'
          value='124'
          icon={Users}
          className='bg-blue-100 text-blue-600'
        />
        <DashboardCard
          title='Appointment Hari Ini'
          value='8'
          icon={Calendar}
          className='bg-green-100 text-green-600'
        />
        <DashboardCard
          title='Pemeriksaan Hari Ini'
          value='12'
          icon={Activity}
          className='bg-yellow-100 text-yellow-600'
        />
        <DashboardCard
          title='Rekam Medis'
          value='96'
          icon={Stethoscope}
          className='bg-purple-100 text-purple-600'
        />
      </div>

      {/* You can add more dashboard content here */}
    </div>
  );
};

export default Dashboard;
