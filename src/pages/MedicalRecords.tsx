// src/pages/MedicalRecords.tsx
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, Calendar, Activity, Pill } from 'lucide-react';
import { useMedicalRecordStore } from '../stores/medical-record';
import type {
  MedicalRecord,
  //   MedicalRecordCheckup,
} from '../types/medical-record';

const MedicalRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );
  const records = useMedicalRecordStore((state) =>
    searchQuery ? state.searchRecords(searchQuery) : state.records
  );

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Rekam Medis</h2>
        <p className='mt-1 text-sm text-gray-500'>
          Riwayat pemeriksaan dan pengobatan pasien
        </p>
      </div>

      {/* Search */}
      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Cari pasien berdasarkan nama atau nomor kartu...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Records List */}
        <div className='lg:col-span-1 bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-4 border-b'>
            <h3 className='font-medium text-gray-900'>Daftar Pasien</h3>
          </div>
          <div className='divide-y'>
            {records.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedRecord?.id === record.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className='font-medium text-gray-900'>
                  {record.patientName}
                </div>
                <div className='text-sm text-gray-500'>
                  No. {record.patientId}
                </div>
                <div className='mt-1 text-xs text-gray-400'>
                  {record.checkups.length} kali pemeriksaan
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Record Detail */}
        {selectedRecord ? (
          <div className='lg:col-span-2 space-y-6'>
            {/* Patient Info */}
            <div className='bg-white rounded-lg shadow p-6'>
              <h3 className='font-medium text-gray-900 mb-4'>Data Pasien</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-sm text-gray-500'>Nama</div>
                  <div className='font-medium'>
                    {selectedRecord.patientName}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-gray-500'>No. Kartu</div>
                  <div className='font-medium'>{selectedRecord.patientId}</div>
                </div>
                <div>
                  <div className='text-sm text-gray-500'>Umur</div>
                  <div className='font-medium'>{selectedRecord.age} tahun</div>
                </div>
                <div>
                  <div className='text-sm text-gray-500'>Golongan Darah</div>
                  <div className='font-medium'>
                    {selectedRecord.bloodType}
                    {selectedRecord.rhFactor}
                  </div>
                </div>
                {selectedRecord.allergies.length > 0 && (
                  <div className='col-span-2'>
                    <div className='text-sm text-gray-500'>Alergi</div>
                    <div className='flex flex-wrap gap-2 mt-1'>
                      {selectedRecord.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className='px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full'
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkups History */}
            <div className='bg-white rounded-lg shadow'>
              <div className='p-6 border-b'>
                <h3 className='font-medium text-gray-900'>
                  Riwayat Pemeriksaan
                </h3>
              </div>
              <div className='divide-y'>
                {selectedRecord.checkups.map((checkup) => (
                  <div key={checkup.id} className='p-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='w-5 h-5 text-gray-400' />
                        <span className='font-medium'>
                          {new Date(checkup.date).toLocaleDateString('id-ID', {
                            dateStyle: 'long',
                          })}
                        </span>
                      </div>
                      <span className='text-sm text-gray-500'>
                        {checkup.doctorType === 'umum'
                          ? 'Dokter Umum'
                          : 'Dokter Gigi'}
                      </span>
                    </div>

                    {checkup.vitalSigns && (
                      <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4 bg-gray-50 p-4 rounded-lg'>
                        <div>
                          <div className='text-xs text-gray-500'>
                            Tekanan Darah
                          </div>
                          <div className='font-medium'>
                            {checkup.vitalSigns.bloodPressure}
                          </div>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500'>
                            Detak Jantung
                          </div>
                          <div className='font-medium'>
                            {checkup.vitalSigns.heartRate} bpm
                          </div>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500'>Suhu</div>
                          <div className='font-medium'>
                            {checkup.vitalSigns.temperature}°C
                          </div>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500'>Berat</div>
                          <div className='font-medium'>
                            {checkup.vitalSigns.weight} kg
                          </div>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500'>Tinggi</div>
                          <div className='font-medium'>
                            {checkup.vitalSigns.height} cm
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='space-y-4'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          Keluhan
                        </div>
                        <div className='mt-1 text-gray-500'>
                          {checkup.complaints}
                        </div>
                      </div>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          Diagnosis
                        </div>
                        <div className='mt-1 text-gray-500'>
                          {checkup.diagnosis}
                        </div>
                      </div>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          Tindakan
                        </div>
                        <div className='mt-1 text-gray-500'>
                          {checkup.treatment}
                        </div>
                      </div>
                      {checkup.prescription && (
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            Resep
                          </div>
                          <div className='mt-1 flex items-start space-x-2'>
                            <Pill className='w-4 h-4 text-gray-400 mt-0.5' />
                            <span className='text-gray-500'>
                              {checkup.prescription}
                            </span>
                          </div>
                        </div>
                      )}
                      {checkup.notes && (
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            Catatan Tambahan
                          </div>
                          <div className='mt-1 text-gray-500'>
                            {checkup.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='lg:col-span-2 bg-white rounded-lg shadow p-6 text-center text-gray-500'>
            Pilih pasien untuk melihat rekam medis
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
