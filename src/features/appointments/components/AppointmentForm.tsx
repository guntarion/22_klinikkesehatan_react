// src/features/appointments/components/AppointmentForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateAppointmentDTO } from '../../../types/patient';
import { usePatientStore } from '../../../stores/patient';
import { useAppointmentStore } from '../../../stores/appointment';

const AppointmentForm = () => {
  const [patientFound, setPatientFound] = useState(false);
  const [searchPatientId, setSearchPatientId] = useState('');
  const { patients } = usePatientStore();
  const addAppointment = useAppointmentStore((state) => state.addAppointment);

  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm<CreateAppointmentDTO>();

  const handlePatientSearch = () => {
    const patient = patients.find((p) => p.patientId === searchPatientId);
    if (patient) {
      setPatientFound(true);
      setValue('patientId', patient.patientId);
    } else {
      setPatientFound(false);
      alert('Pasien tidak ditemukan');
    }
  };

  const onSubmit = async (data: CreateAppointmentDTO) => {
    const appointment = {
      ...data,
      id: crypto.randomUUID(),
      status: 'scheduled' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addAppointment(appointment);
    alert('Appointment berhasil dibuat!');
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Buat Appointment Baru
      </h2>

      {/* Patient Search */}
      <div className='mb-6'>
        <div className='flex gap-4 mb-4'>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Nomor Kartu Pasien
            </label>
            <input
              type='text'
              className='input-field'
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              placeholder='Masukkan 6 digit nomor kartu'
            />
          </div>
          <div className='flex items-end'>
            <button
              type='button'
              onClick={handlePatientSearch}
              className='btn-primary'
            >
              Cari
            </button>
          </div>
        </div>

        {patientFound && (
          <div className='bg-green-50 border border-green-200 rounded-md p-4'>
            <p className='text-green-700'>
              Pasien ditemukan:{' '}
              {patients.find((p) => p.patientId === searchPatientId)?.name}
            </p>
          </div>
        )}
      </div>

      {patientFound && (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Jenis Dokter
            </label>
            <select {...register('doctorType')} className='input-field'>
              <option value='umum'>Dokter Umum</option>
              <option value='gigi'>Dokter Gigi</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Tanggal
            </label>
            <input
              type='date'
              {...register('date')}
              className='input-field'
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Waktu
            </label>
            <select {...register('time')} className='input-field'>
              <option value='09:00'>09:00</option>
              <option value='10:00'>10:00</option>
              <option value='11:00'>11:00</option>
              <option value='13:00'>13:00</option>
              <option value='14:00'>14:00</option>
              <option value='15:00'>15:00</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Catatan (opsional)
            </label>
            <textarea {...register('notes')} className='input-field' rows={3} />
          </div>

          <div className='flex justify-end'>
            <button type='submit' className='btn-primary'>
              Buat Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
