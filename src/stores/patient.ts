// src/stores/patient.ts
import { create } from 'zustand';
import type { Patient, CreatePatientDTO } from '../types/patient';

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: CreatePatientDTO) => Patient;
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

  addPatient: (patientData: CreatePatientDTO) => {
    const patientId = get().generatePatientId();
    const newPatient: Patient = {
      ...patientData,
      id: crypto.randomUUID(),
      patientId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      patients: [...state.patients, newPatient],
    }));

    return newPatient;
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
