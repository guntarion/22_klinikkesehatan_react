// src/types/patient.ts
export interface Patient {
  id: string;
  patientId: string; // Six digit patient ID for the card
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

export type CreatePatientDTO = Omit<
  Patient,
  'id' | 'patientId' | 'createdAt' | 'updatedAt'
>;

// Add appointment types
export interface Appointment {
  id: string;
  patientId: string;
  doctorType: 'umum' | 'gigi';
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateAppointmentDTO = Omit<
  Appointment,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;
