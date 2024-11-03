import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const PatientList = () => {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Daftar Pasien</h1>
        <Link
          to='/patients/register'
          className='flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
        >
          <UserPlus className='w-5 h-5 mr-2' />
          Daftar Pasien Baru
        </Link>
      </div>

      {/* Temporary placeholder for patient list */}
      <div className='bg-white shadow rounded-lg'>
        <div className='p-4 border-b'>
          <p className='text-gray-500'>Belum ada data pasien</p>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
