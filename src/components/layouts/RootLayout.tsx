// src/components/layouts/RootLayout.tsx
import { FC, PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  FileText,
  Menu,
  X,
  Home,
  Activity,
  PackageOpen,
} from 'lucide-react';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Pasien', href: '/patients', icon: Users },
    { name: 'Appointment', href: '/appointments', icon: Calendar },
    { name: 'Rekam Medis', href: '/medical-records', icon: FileText },
    { name: 'Pemeriksaan', href: '/checkups', icon: Activity },
    { name: 'Suplai Medis', href: '/supplies', icon: PackageOpen },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-gray-800/50 backdrop-blur-sm z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className='flex items-center justify-between h-16 px-4 border-b'>
          <h1 className='text-xl font-bold text-gray-900'>Klinik Kesehatan</h1>
          <button className='lg:hidden' onClick={() => setSidebarOpen(false)}>
            <X className='w-6 h-6' />
          </button>
        </div>
        <nav className='px-4 py-4'>
          <ul className='space-y-2'>
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900'
                >
                  <item.icon className='w-5 h-5 mr-3' />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className='lg:pl-64'>
        {/* Mobile header */}
        <div className='sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b lg:hidden'>
          <button className='mr-4' onClick={() => setSidebarOpen(true)}>
            <Menu className='w-6 h-6' />
          </button>
          <h1 className='text-xl font-bold text-gray-900'>Klinik Kesehatan</h1>
        </div>

        {/* Page content */}
        <main className='p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
