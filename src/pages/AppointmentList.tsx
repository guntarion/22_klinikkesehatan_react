import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useAppointmentStore } from '../stores/appointment';
import { usePatientStore } from '../stores/patient';

const AppointmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { appointments } = useAppointmentStore();
  const { patients } = usePatientStore();

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.patientId === patientId);
    return patient?.name || 'Unknown';
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      getPatientName(appointment.patientId)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patientId.includes(searchTerm)
  );

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Daftar Appointment</h1>
        <Link
          to='/appointments/new'
          className='flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
        >
          <Plus className='w-5 h-5 mr-2' />
          Appointment Baru
        </Link>
      </div>

      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Cari appointment berdasarkan nama pasien atau nomor kartu...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='bg-white shadow overflow-hidden rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Pasien
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Dokter
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Tanggal & Waktu
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {getPatientName(appointment.patientId)}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {appointment.patientId}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {appointment.doctorType === 'umum'
                      ? 'Dokter Umum'
                      : 'Dokter Gigi'}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {new Date(appointment.date).toLocaleDateString('id-ID')}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {appointment.time}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      appointment.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {appointment.status === 'scheduled'
                      ? 'Terjadwal'
                      : appointment.status === 'completed'
                      ? 'Selesai'
                      : 'Dibatalkan'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div className='p-4 text-center text-gray-500'>
            Tidak ada appointment yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
