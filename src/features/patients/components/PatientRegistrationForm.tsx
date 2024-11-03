// src/features/patients/components/PatientRegistrationForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreatePatientDTO } from '../../../types/patient';
import { patientSchema } from '../../../lib/validations/patient';
import { usePatientStore } from '../../../stores/patient';

const PatientRegistrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addPatient = usePatientStore((state) => state.addPatient);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientDTO>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: 'L',
    },
  });

  const onSubmit = async (data: CreatePatientDTO) => {
    try {
      setIsSubmitting(true);
      // In a real app, you would make an API call here
      const newPatient = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addPatient(newPatient);
      alert('Pendaftaran pasien berhasil!');
      navigate('/');
    } catch (error) {
      alert('Terjadi kesalahan saat mendaftarkan pasien');
      console.error('Error registering patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Pendaftaran Pasien Baru
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Data Pribadi */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Data Pribadi
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Nama Lengkap *
              </label>
              <input
                type='text'
                id='name'
                {...register('name')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='nik'
                className='block text-sm font-medium text-gray-700'
              >
                NIK *
              </label>
              <input
                type='text'
                id='nik'
                {...register('nik')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.nik ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.nik && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.nik.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='dateOfBirth'
                  className='block text-sm font-medium text-gray-700'
                >
                  Tanggal Lahir *
                </label>
                <input
                  type='date'
                  id='dateOfBirth'
                  {...register('dateOfBirth')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='gender'
                  className='block text-sm font-medium text-gray-700'
                >
                  Jenis Kelamin *
                </label>
                <select
                  id='gender'
                  {...register('gender')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.gender ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value='L'>Laki-laki</option>
                  <option value='P'>Perempuan</option>
                </select>
                {errors.gender && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Informasi Kontak
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Alamat *
              </label>
              <textarea
                id='address'
                rows={3}
                {...register('address')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Nomor Telepon *
              </label>
              <input
                type='tel'
                id='phoneNumber'
                {...register('phoneNumber')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register('email')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Informasi Medis */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Informasi Medis
          </h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='bloodType'
                  className='block text-sm font-medium text-gray-700'
                >
                  Golongan Darah
                </label>
                <select
                  id='bloodType'
                  {...register('bloodType')}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Pilih</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='AB'>AB</option>
                  <option value='O'>O</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='rhesus'
                  className='block text-sm font-medium text-gray-700'
                >
                  Rhesus
                </label>
                <select
                  id='rhesus'
                  {...register('rhesus')}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Pilih</option>
                  <option value='+'>+</option>
                  <option value='-'>-</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor='allergies'
                className='block text-sm font-medium text-gray-700'
              >
                Riwayat Alergi
              </label>
              <textarea
                id='allergies'
                rows={3}
                {...register('allergies')}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='Tuliskan riwayat alergi jika ada'
              />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Batal
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Mendaftarkan...' : 'Daftar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
