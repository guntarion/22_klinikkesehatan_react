// src/stores/checkup.ts
import { create } from 'zustand';
import type { Checkup, CreateCheckupDTO } from '../types/checkup';

interface CheckupStore {
  checkups: Checkup[];
  addCheckup: (data: CreateCheckupDTO) => Checkup;
  getCheckupsByPatientId: (patientId: string) => Checkup[];
}

export const useCheckupStore = create<CheckupStore>((set, get) => ({
  checkups: [],

  addCheckup: (data: CreateCheckupDTO) => {
    const newCheckup: Checkup = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      checkups: [...state.checkups, newCheckup],
    }));

    return newCheckup;
  },

  getCheckupsByPatientId: (patientId: string) => {
    return get().checkups.filter((checkup) => checkup.patientId === patientId);
  },
}));
