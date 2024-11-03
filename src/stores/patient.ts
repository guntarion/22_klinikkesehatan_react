// src/stores/patient.ts
import { create } from 'zustand';
import type { Patient } from '../types/patient';

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'patientId'>) => void;
  updatePatient: (id: string, patient: Patient) => void;
  deletePatient: (id: string) => void;
  generatePatientId: () => string;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [],

  generatePatientId: () => {
    const currentPatients = get().patients;
    let newId: string;

    do {
      // Generate a random 6-digit number
      newId = Math.floor(100000 + Math.random() * 900000).toString();
      // Check if it's unique
    } while (currentPatients.some((p) => p.patientId === newId));

    return newId;
  },

  addPatient: (patientData) => {
    const patientId = get().generatePatientId();
    const patient = {
      ...patientData,
      patientId,
    };

    set((state) => ({
      patients: [...state.patients, patient],
    }));

    return patient;
  },

  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id ? updatedPatient : patient
      ),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),
}));
