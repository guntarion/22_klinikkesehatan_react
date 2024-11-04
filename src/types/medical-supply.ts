// src/types/medical-supply.ts
export type UnitType = 'tablet' | 'strip' | 'botol' | 'ampul' | 'pcs';
export type CategoryType = 'obat' | 'supplies' | 'alat';

export interface MedicalSupply {
  id: string;
  code: string; // Unique code for the item
  name: string; // Name of the medicine/supply
  category: CategoryType;
  unit: UnitType;
  stock: number;
  minimumStock: number; // For low stock alerts
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplyUsage {
  id: string;
  supplyId: string;
  checkupId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateMedicalSupplyDTO = Omit<
  MedicalSupply,
  'id' | 'createdAt' | 'updatedAt'
>;

export type CreateSupplyUsageDTO = Omit<
  SupplyUsage,
  'id' | 'createdAt' | 'updatedAt'
>;
