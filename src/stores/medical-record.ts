// src/stores/medical-record.ts
import { create } from 'zustand';
import type { MedicalRecord } from '../types/medical-record';

interface MedicalRecordStore {
  records: MedicalRecord[];
  getRecordByPatientId: (patientId: string) => MedicalRecord | undefined;
  searchRecords: (query: string) => MedicalRecord[];
}

// Dummy data
const dummyRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'Suratman Ali',
    age: 35,
    gender: 'male',
    bloodType: 'A',
    rhFactor: '+',
    allergies: ['Peanuts', 'Penicillin'],
    checkups: [
      {
        id: 'C001',
        date: '2024-03-15',
        doctorType: 'umum',
        complaints: 'Demam tinggi, batuk',
        diagnosis: 'Flu',
        treatment: 'Istirahat, banyak minum air',
        prescription: 'Paracetamol 3x1, Vitamin C 2x1',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: 80,
          temperature: 38.5,
          weight: 70,
          height: 170,
        },
      },
      {
        id: 'C002',
        date: '2024-02-20',
        doctorType: 'gigi',
        complaints: 'Sakit gigi',
        diagnosis: 'Karies',
        treatment: 'Penambalan gigi',
        prescription: 'Antibiotik 3x1',
      },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15',
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'Cahyaningtyas Ayu',
    age: 28,
    gender: 'female',
    bloodType: 'O',
    rhFactor: '+',
    allergies: [],
    checkups: [
      {
        id: 'C003',
        date: '2024-03-10',
        doctorType: 'umum',
        complaints: 'Mual, pusing',
        diagnosis: 'Maag',
        treatment: 'Makan teratur',
        prescription: 'Antasida 3x1',
        vitalSigns: {
          bloodPressure: '110/70',
          heartRate: 75,
          temperature: 36.8,
          weight: 55,
          height: 160,
        },
      },
    ],
    createdAt: '2024-02-01',
    updatedAt: '2024-03-10',
  },
  // Add more dummy records as needed
];

export const useMedicalRecordStore = create<MedicalRecordStore>((set, get) => ({
  records: dummyRecords,

  getRecordByPatientId: (patientId: string) =>
    get().records.find((record) => record.patientId === patientId),

  searchRecords: (query: string) => {
    const records = get().records;
    if (!query) return records;

    const lowercaseQuery = query.toLowerCase();
    return records.filter(
      (record) =>
        record.patientName.toLowerCase().includes(lowercaseQuery) ||
        record.patientId.toLowerCase().includes(lowercaseQuery)
    );
  },
}));
