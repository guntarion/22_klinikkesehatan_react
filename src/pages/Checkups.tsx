// src/pages/Checkups.tsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../stores/patient';
import { useCheckupStore } from '../stores/checkup';
import CheckupForm from '../features/checkups/components/CheckupForm';
import type { DoctorType } from '../types/checkup';

const Checkups = () => {
  const navigate = useNavigate();
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [doctorType, setDoctorType] = useState<DoctorType>('umum');
  const [showForm, setShowForm] = useState(false);

  const patients = usePatientStore((state) => state.patients);
  const checkups = useCheckupStore((state) => state.checkups);

  const todayCheckups = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return checkups.filter((checkup) => checkup.createdAt.startsWith(today));
  }, [checkups]);

  const handleStartCheckup = () => {
    setShowForm(true);
  };

  const handleCompleteCheckup = () => {
    setShowForm(false);
    setSelectedPatientId('');
    setDoctorType('umum');
  };

  if (showForm) {
    // Removed the selectedPatientId condition
    return (
      <CheckupForm
        patientId={selectedPatientId}
        doctorType={doctorType}
        onComplete={handleCompleteCheckup}
      />
    );
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-lg font-medium text-gray-900 mb-4'>
          Pemeriksaan Baru
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Pilih Pasien
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            >
              <option value=''>-- Pilih Pasien --</option>
              {patients.map((patient) => (
                <option key={patient.patientId} value={patient.patientId}>
                  {patient.name} ({patient.patientId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Jenis Dokter
            </label>
            <select
              value={doctorType}
              onChange={(e) => setDoctorType(e.target.value as DoctorType)}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            >
              <option value='umum'>Dokter Umum</option>
              <option value='gigi'>Dokter Gigi</option>
            </select>
          </div>

          <div className='flex items-end'>
            <button
              onClick={handleStartCheckup} // Removed validation
              className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
            >
              Mulai Pemeriksaan
            </button>
          </div>
        </div>
      </div>

      {/* Today's Checkups */}
      <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-lg font-medium text-gray-900 mb-4'>
          Pemeriksaan Hari Ini
        </h2>

        {todayCheckups.length === 0 ? (
          <p className='text-gray-500'>Belum ada pemeriksaan hari ini</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Waktu
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Pasien
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Dokter
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Diagnosis
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {todayCheckups.map((checkup) => {
                  const patient = patients.find(
                    (p) => p.patientId === checkup.patientId
                  );
                  return (
                    <tr key={checkup.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {new Date(checkup.createdAt).toLocaleTimeString(
                          'id-ID',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {patient?.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {patient?.patientId}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {checkup.doctorType === 'umum'
                          ? 'Dokter Umum'
                          : 'Dokter Gigi'}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500'>
                        {checkup.diagnosis}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <button
                          onClick={() => navigate(`/checkups/${checkup.id}`)}
                          className='text-blue-600 hover:text-blue-900'
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkups;
