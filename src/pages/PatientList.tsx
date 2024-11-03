import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Pencil, Trash2, Search } from 'lucide-react';
import { usePatientStore } from '../stores/patient';
import type { Patient } from '../types/patient';

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    nik: '3274821006900001',
    dateOfBirth: '1990-06-10',
    gender: 'L',
    address: 'Jl. Merdeka No. 123, Jakarta Selatan',
    phoneNumber: '081234567890',
    email: 'budi.s@email.com',
    bloodType: 'O',
    rhesus: '+',
    allergies: 'Seafood',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    nik: '3274821007950002',
    dateOfBirth: '1995-07-15',
    gender: 'P',
    address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    phoneNumber: '081234567891',
    bloodType: 'A',
    rhesus: '+',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Ahmad Yani',
    nik: '3274821008850003',
    dateOfBirth: '1985-08-20',
    gender: 'L',
    address: 'Jl. Gatot Subroto No. 67, Jakarta Selatan',
    phoneNumber: '081234567892',
    email: 'ahmad.y@email.com',
    bloodType: 'B',
    rhesus: '-',
    allergies: 'Penisilin',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { patients, deletePatient } = usePatientStore();

  // Initialize store with mock data if empty
  useEffect(() => {
    if (patients.length === 0) {
      mockPatients.forEach((patient) => {
        usePatientStore.getState().addPatient(patient);
      });
    }
  }, [patients.length]);

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
      deletePatient(id);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nik.includes(searchTerm)
  );

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

      {/* Search bar */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Cari pasien berdasarkan nama atau NIK...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient list */}
      <div className='bg-white shadow overflow-hidden rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Nama / NIK
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Info Kontak
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Info Medis
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {patient.name}
                  </div>
                  <div className='text-sm text-gray-500'>{patient.nik}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {patient.phoneNumber}
                  </div>
                  <div className='text-sm text-gray-500'>{patient.address}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    Golongan Darah: {patient.bloodType || '-'}{' '}
                    {patient.rhesus || ''}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {patient.allergies
                      ? `Alergi: ${patient.allergies}`
                      : 'Tidak ada alergi'}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <Link
                    to={`/patients/edit/${patient.id}`}
                    className='text-blue-600 hover:text-blue-900 mr-4'
                  >
                    <Pencil className='w-5 h-5 inline' />
                  </Link>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className='text-red-600 hover:text-red-900'
                  >
                    <Trash2 className='w-5 h-5 inline' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className='p-4 text-center text-gray-500'>
            Tidak ada data pasien yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
