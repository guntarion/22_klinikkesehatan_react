// src/stores/appointment.ts
import { create } from 'zustand';
import type { Appointment } from '../types/patient';

// Mock appointments using our existing mock patient IDs (100001, 100002, 100003)
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '100001', // Budi Santoso
    doctorType: 'umum',
    date: '2024-03-05',
    time: '09:00',
    status: 'completed',
    notes: 'Pemeriksaan rutin',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
  },
  {
    id: '2',
    patientId: '100002', // Siti Rahayu
    doctorType: 'gigi',
    date: '2024-03-10',
    time: '14:00',
    status: 'scheduled',
    notes: 'Pembersihan karang gigi',
    createdAt: '2024-03-02T00:00:00Z',
    updatedAt: '2024-03-02T00:00:00Z',
  },
  {
    id: '3',
    patientId: '100003', // Ahmad Yani
    doctorType: 'umum',
    date: '2024-03-07',
    time: '11:00',
    status: 'scheduled',
    notes: 'Keluhan demam',
    createdAt: '2024-03-03T00:00:00Z',
    updatedAt: '2024-03-03T00:00:00Z',
  },
  {
    id: '4',
    patientId: '100001', // Budi Santoso
    doctorType: 'umum',
    date: '2024-02-20',
    time: '10:00',
    status: 'cancelled',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-19T00:00:00Z',
  },
  {
    id: '5',
    patientId: '100002', // Siti Rahayu
    doctorType: 'umum',
    date: '2024-03-15',
    time: '13:00',
    status: 'scheduled',
    notes: 'Check up bulanan',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updatedAppointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: mockAppointments, // Initialize with mock data

  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),

  updateAppointment: (id, updatedAppointment) =>
    set((state) => ({
      appointments: state.appointments.map((appointment) =>
        appointment.id === id ? updatedAppointment : appointment
      ),
    })),

  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter(
        (appointment) => appointment.id !== id
      ),
    })),

  getAppointmentsByPatientId: (patientId) =>
    get().appointments.filter(
      (appointment) => appointment.patientId === patientId
    ),
}));
