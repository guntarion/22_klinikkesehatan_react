// src/features/checkups/components/CheckupForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../../../stores/patient';
import { useCheckupStore } from '../../../stores/checkup';
import type { DoctorType, CreateCheckupDTO } from '../../../types/checkup';

interface CheckupFormProps {
  patientId: string;
  doctorType: DoctorType;
  onComplete?: () => void;
}

const CheckupForm = ({
  patientId,
  doctorType,
  onComplete,
}: CheckupFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addCheckup = useCheckupStore((state) => state.addCheckup);
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find((p) => p.patientId === patientId);

  // Form state
  const [formData, setFormData] = useState({
    complaints: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const checkupData: CreateCheckupDTO = {
        patientId,
        doctorType,
        ...formData,
      };

      await addCheckup(checkupData);
      onComplete?.();
      navigate('/checkups');
    } catch (error) {
      console.error('Error saving checkup:', error);
      alert('Terjadi kesalahan saat menyimpan data pemeriksaan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick selection buttons for common conditions
  const commonConditions =
    doctorType === 'umum'
      ? ['Flu', 'Demam', 'Batuk', 'Diare', 'Maag', 'Hipertensi']
      : [
          'Karies',
          'Gingivitis',
          'Karang Gigi',
          'Gigi Berlubang',
          'Pembengkakan Gusi',
        ];

  return (
    <div className='max-w-4xl mx-auto'>
      {patient && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
          <h3 className='font-medium text-blue-900'>Data Pasien</h3>
          <p className='text-blue-800'>Nama: {patient.name}</p>
          <p className='text-blue-800'>No. Kartu: {patient.patientId}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-lg font-medium text-gray-900 mb-4'>
            Form Pemeriksaan {doctorType === 'umum' ? 'Umum' : 'Gigi'}
          </h2>

          {/* Complaints */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Keluhan
            </label>
            <textarea
              name='complaints'
              value={formData.complaints}
              onChange={handleChange}
              required
              rows={3}
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Deskripsikan keluhan pasien...'
            />
          </div>

          {/* Quick Diagnosis Selection */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Diagnosis Cepat
            </label>
            <div className='flex flex-wrap gap-2'>
              {commonConditions.map((condition) => (
                <button
                  key={condition}
                  type='button'
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      diagnosis: condition,
                    }))
                  }
                  className='px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200'
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Diagnosis
            </label>
            <textarea
              name='diagnosis'
              value={formData.diagnosis}
              onChange={handleChange}
              required
              rows={3}
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Masukkan diagnosis...'
            />
          </div>

          {/* Treatment */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tindakan
            </label>
            <textarea
              name='treatment'
              value={formData.treatment}
              onChange={handleChange}
              required
              rows={3}
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Jelaskan tindakan yang dilakukan...'
            />
          </div>

          {/* Prescription */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Resep Obat
            </label>
            <textarea
              name='prescription'
              value={formData.prescription}
              onChange={handleChange}
              rows={3}
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Tuliskan resep obat jika ada...'
            />
          </div>

          {/* Additional Notes */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Catatan Tambahan
            </label>
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Tambahkan catatan lain jika diperlukan...'
            />
          </div>

          {/* Form Actions */}
          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={() => navigate('/checkups')}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
            >
              Batal
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50'
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Pemeriksaan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckupForm;
