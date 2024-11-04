// src/stores/medical-supply.ts
import { create } from 'zustand';
import type {
  MedicalSupply,
  SupplyUsage,
  CreateMedicalSupplyDTO,
  CreateSupplyUsageDTO,
} from '../types/medical-supply';

interface MedicalSupplyStore {
  supplies: MedicalSupply[];
  usages: SupplyUsage[];
  addSupply: (data: CreateMedicalSupplyDTO) => MedicalSupply;
  updateSupply: (id: string, data: Partial<MedicalSupply>) => void;
  deleteSupply: (id: string) => void;
  recordUsage: (data: CreateSupplyUsageDTO) => void;
  generateSupplyCode: () => string;
}

const dummySupplies: MedicalSupply[] = [
  {
    id: '1',
    code: 'MED0001',
    name: 'Paracetamol',
    category: 'obat',
    unit: 'tablet',
    stock: 100,
    minimumStock: 20,
    price: 5000,
    description: 'Pain reliever',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    code: 'MED0002',
    name: 'Hand Sanitizer',
    category: 'supplies',
    unit: 'botol',
    stock: 15,
    minimumStock: 10,
    price: 25000,
    description: 'Hand sanitizer 500ml',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    code: 'MED0003',
    name: 'Stetoskop',
    category: 'alat',
    unit: 'pcs',
    stock: 5,
    minimumStock: 2,
    price: 500000,
    description: 'Medical stethoscope',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const dummyUsages: SupplyUsage[] = [
  {
    id: '1',
    supplyId: '1',
    checkupId: 'check1',
    quantity: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    supplyId: '2',
    checkupId: 'check2',
    quantity: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useMedicalSupplyStore = create<MedicalSupplyStore>((set, get) => ({
  supplies: dummySupplies,
  usages: dummyUsages,

  generateSupplyCode: () => {
    const supplies = get().supplies;
    const lastCode =
      supplies.length > 0
        ? Math.max(...supplies.map((s) => parseInt(s.code.slice(3))))
        : 0;
    return `MED${String(lastCode + 1).padStart(4, '0')}`;
  },

  addSupply: (data) => {
    const newSupply: MedicalSupply = {
      ...data,
      id: crypto.randomUUID(),
      code: get().generateSupplyCode(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      supplies: [...state.supplies, newSupply],
    }));

    return newSupply;
  },

  updateSupply: (id, data) => {
    set((state) => ({
      supplies: state.supplies.map((supply) =>
        supply.id === id
          ? { ...supply, ...data, updatedAt: new Date().toISOString() }
          : supply
      ),
    }));
  },

  deleteSupply: (id) => {
    set((state) => ({
      supplies: state.supplies.filter((supply) => supply.id !== id),
    }));
  },

  recordUsage: (data) => {
    const usage: SupplyUsage = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      usages: [...state.usages, usage],
    }));

    const supply = get().supplies.find((s) => s.id === data.supplyId);
    if (supply) {
      get().updateSupply(supply.id, {
        stock: supply.stock - data.quantity,
      });
    }
  },
}));
