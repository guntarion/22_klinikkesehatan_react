// src/types/patient.ts
export interface Patient {
  id: string;
  name: string;
  nik: string;
  dateOfBirth: string;
  gender: 'L' | 'P';
  address: string;
  phoneNumber: string;
  email?: string;
  bloodType?: 'A' | 'B' | 'AB' | 'O';
  rhesus?: '+' | '-';
  allergies?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePatientDTO = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
