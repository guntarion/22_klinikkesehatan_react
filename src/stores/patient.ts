// src/stores/patient.ts
import { create } from 'zustand';
import type { Patient } from '../types/patient';

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updatedPatient: Patient) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],

  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, patient],
    })),

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
