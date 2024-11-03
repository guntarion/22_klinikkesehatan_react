// src/types/checkup.ts
import { Patient } from './patient';

export type DoctorType = 'umum' | 'gigi';

export interface Checkup {
  id: string;
  patientId: string;
  doctorType: DoctorType;
  complaints: string;
  diagnosis: string;
  treatment: string;
  prescription?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckupWithPatient extends Checkup {
  patient: Patient;
}

export type CreateCheckupDTO = Omit<Checkup, 'id' | 'createdAt' | 'updatedAt'>;

// Common conditions/diagnoses for quick selection
export const UMUM_CONDITIONS = [
  'Flu',
  'Demam',
  'Batuk',
  'Diare',
  'Maag',
  'Hipertensi',
  'Infeksi Saluran Pernapasan',
  'Alergi',
] as const;

export const GIGI_CONDITIONS = [
  'Karies Gigi',
  'Gingivitis',
  'Sakit Gigi',
  'Karang Gigi',
  'Gigi Berlubang',
  'Pembengkakan Gusi',
  'Sensitive Gigi',
] as const;
