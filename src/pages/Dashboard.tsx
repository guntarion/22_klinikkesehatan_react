import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Patient Demographics Data
const ageDistributionData = [
  { age: '0-10', count: 150 },
  { age: '11-20', count: 280 },
  { age: '21-30', count: 420 },
  { age: '31-40', count: 380 },
  { age: '41-50', count: 320 },
  { age: '51-60', count: 250 },
  { age: '60+', count: 180 },
];

const genderDistributionData = [
  { name: 'Laki-laki', value: 1280 },
  { name: 'Perempuan', value: 1420 },
];

const paymentTypeData = [
  { name: 'Dengan Pembayaran', value: 2100 },
  { name: 'Gratis', value: 600 },
];

// Inventory Metrics Data
const lowStockItems = [
  { name: 'Paracetamol', stock: 15, minimum: 20, unit: 'strip' },
  { name: 'Amoxicillin', stock: 8, minimum: 15, unit: 'strip' },
  { name: 'Hand Sanitizer', stock: 5, minimum: 10, unit: 'botol' },
];

const mostUsedSuppliesData = [
  { name: 'Paracetamol', count: 450 },
  { name: 'Amoxicillin', count: 320 },
  { name: 'Vitamin C', count: 280 },
  { name: 'Antasida', count: 250 },
  { name: 'Ibuprofen', count: 220 },
];

const inventoryValueData = Array.from({ length: 12 }, (_, i) => ({
  month: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][i],
  value: Math.floor(Math.random() * 50000000) + 100000000,
}));

// Clinical Metrics Data
const referralPatternsData = [
  { name: 'Internal', value: 320 },
  { name: 'Rumah Sakit', value: 150 },
  { name: 'Spesialis', value: 280 },
  { name: 'Lab', value: 200 },
];

const appointmentStatusData = [
  { name: 'Selesai', value: 850 },
  { name: 'Dibatalkan', value: 120 },
  { name: 'Reschedule', value: 80 },
];

const followUpRatesData = [
  { name: 'Selesai', value: 680 },
  { name: 'Perlu Follow-up', value: 420 },
  { name: 'Dalam Perawatan', value: 300 },
];

const commonPrescriptionsData = [
  { name: 'Paracetamol', count: 450 },
  { name: 'Amoxicillin', count: 380 },
  { name: 'Vitamin C', count: 350 },
  { name: 'Antasida', count: 320 },
  { name: 'CTM', count: 280 },
  { name: 'Ibuprofen', count: 250 },
];

// Original data (keep all the original data from previous version)
const diagnosisData = [
  { name: 'Flu', count: 45 },
  { name: 'Demam', count: 38 },
  { name: 'Batuk', count: 32 },
  { name: 'Diare', count: 28 },
  { name: 'Maag', count: 25 },
  { name: 'Hipertensi', count: 22 },
  { name: 'Alergi', count: 18 },
  { name: 'Asma', count: 15 },
];

const dentalData = [
  { name: 'Karies', count: 35 },
  { name: 'Gingivitis', count: 28 },
  { name: 'Karang Gigi', count: 25 },
  { name: 'Gigi Berlubang', count: 22 },
  { name: 'Sakit Gusi', count: 18 },
];

const dailyPatientsData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/11`,
  umum: Math.floor(Math.random() * 15) + 5,
  gigi: Math.floor(Math.random() * 10) + 3,
}));

const revenueData = Array.from({ length: 12 }, (_, i) => ({
  month: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][i],
  umum: Math.floor(Math.random() * 20000000) + 10000000,
  gigi: Math.floor(Math.random() * 15000000) + 8000000,
}));

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
];

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  className,
}: DashboardCardProps) => (
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
          Overview aktivitas Klinik Al Muhajirin
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          title='Total Pasien'
          value='1,248'
          icon={Users}
          className='bg-blue-100 text-blue-600'
        />
        <DashboardCard
          title='Appointment Hari Ini'
          value='18'
          icon={Calendar}
          className='bg-green-100 text-green-600'
        />
        <DashboardCard
          title='Pemeriksaan Bulan Ini'
          value='324'
          icon={Activity}
          className='bg-yellow-100 text-yellow-600'
        />
        <DashboardCard
          title='Pendapatan Bulan Ini'
          value='Rp 45.8M'
          icon={TrendingUp}
          className='bg-purple-100 text-purple-600'
        />
      </div>

      {/* Patient Demographics Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Age Distribution */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Distribusi Umur Pasien
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='age' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='count' fill='#0088FE' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Distribusi Gender
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={genderDistributionData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} (${((value / 2700) * 100).toFixed(1)}%)`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {genderDistributionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Type Distribution */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Tipe Pembayaran
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={paymentTypeData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} (${((value / 2700) * 100).toFixed(1)}%)`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {paymentTypeData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Inventory Metrics Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Low Stock Alert */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center mb-4'>
            <AlertTriangle className='w-5 h-5 text-yellow-500 mr-2' />
            <h3 className='text-lg font-medium text-gray-900'>Stok Menipis</h3>
          </div>
          <div className='space-y-4'>
            {lowStockItems.map((item) => (
              <div
                key={item.name}
                className='flex justify-between items-center border-b pb-2'
              >
                <div>
                  <p className='font-medium text-gray-900'>{item.name}</p>
                  <p className='text-sm text-gray-500'>
                    Minimum: {item.minimum} {item.unit}
                  </p>
                </div>
                <div className='text-red-600 font-medium'>
                  Sisa: {item.stock} {item.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Used Supplies */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Supplies Paling Sering Digunakan
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={mostUsedSuppliesData} layout='vertical'>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number' />
                <YAxis dataKey='name' type='category' width={100} />
                <Tooltip />
                <Bar dataKey='count' fill='#0088FE' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Value Trends */}
        <div className='bg-white p-6 rounded-lg shadow col-span-2'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Trend Nilai Inventory
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={inventoryValueData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Area
                  type='monotone'
                  dataKey='value'
                  fill='#0088FE'
                  stroke='#0088FE'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Clinical Metrics Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Referral Patterns */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Pola Rujukan
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={referralPatternsData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} (${value})`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {referralPatternsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Status */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Status Appointment
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={appointmentStatusData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} (${value})`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {appointmentStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Follow-up Rates */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Status Follow-up
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={followUpRatesData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} (${value})`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {followUpRatesData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Common Prescriptions */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Resep Obat Terbanyak
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={commonPrescriptionsData} layout='vertical'>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number' />
                <YAxis dataKey='name' type='category' width={100} />
                <Tooltip />
                <Bar dataKey='count' fill='#0088FE' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Original Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Common Diagnoses Chart */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Diagnosa Umum Terbanyak
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={diagnosisData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='count' fill='#0088FE' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dental Diagnoses Chart */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Diagnosa Gigi Terbanyak
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={dentalData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, count }: { name: string; count: number }) =>
                    `${name} (${count})`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='count'
                >
                  {dentalData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Visits Chart */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Jumlah Pasien per Hari
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={dailyPatientsData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='umum'
                  stroke='#0088FE'
                  name='Dokter Umum'
                />
                <Line
                  type='monotone'
                  dataKey='gigi'
                  stroke='#00C49F'
                  name='Dokter Gigi'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Pendapatan Bulanan
          </h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Legend />
                <Bar dataKey='umum' fill='#0088FE' name='Dokter Umum' />
                <Bar dataKey='gigi' fill='#00C49F' name='Dokter Gigi' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
