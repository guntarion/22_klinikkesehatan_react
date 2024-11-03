import { create } from 'zustand';
import type { Patient } from '../types/patient';

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, patient],
    })),
}));
