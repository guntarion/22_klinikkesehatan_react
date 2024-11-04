// src/types/medical-record.ts
import { DoctorType } from './checkup';

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'male' | 'female';
  bloodType: 'A' | 'B' | 'AB' | 'O';
  rhFactor: '+' | '-';
  allergies: string[];
  checkups: MedicalRecordCheckup[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordCheckup {
  id: string;
  date: string;
  doctorType: DoctorType;
  complaints: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  notes?: string;
  vitalSigns?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
}
