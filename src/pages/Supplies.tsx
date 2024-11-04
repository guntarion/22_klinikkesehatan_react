// src/pages/Supplies.tsx
import { useState, useMemo } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { useMedicalSupplyStore } from '../stores/medical-supply';
import type { CategoryType } from '../types/medical-supply';
import AddSupplyForm from '../features/supplies/components/AddSupplyForm';

const Supplies = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | 'all'
  >('all');

  const supplies = useMedicalSupplyStore((state) => state.supplies);
  const usages = useMedicalSupplyStore((state) => state.usages);
  const lowStockSupplies = useMemo(
    () => supplies.filter((supply) => supply.stock <= supply.minimumStock),
    [supplies]
  );

  // Simplified mostUsed calculation
  const mostUsed = useMemo(() => {
    const usageCount: Record<string, number> = {};
    usages.forEach((usage) => {
      usageCount[usage.supplyId] =
        (usageCount[usage.supplyId] || 0) + usage.quantity;
    });

    return supplies
      .map((supply) => ({
        supply,
        totalUsage: usageCount[supply.id] || 0,
      }))
      .sort((a, b) => b.totalUsage - a.totalUsage)
      .slice(0, 5);
  }, [supplies, usages]);

  // Filtered supplies calculation
  const filteredSupplies = useMemo(
    () =>
      selectedCategory === 'all'
        ? supplies
        : supplies.filter((s) => s.category === selectedCategory),
    [selectedCategory, supplies]
  );

  if (showAddForm) {
    return <AddSupplyForm onComplete={() => setShowAddForm(false)} />;
  }

  return (
    <div className='space-y-6'>
      {/* Low Stock Alert */}
      {lowStockSupplies.length > 0 && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <AlertTriangle className='h-5 w-5 text-yellow-400 mr-2' />
            <h3 className='text-sm font-medium text-yellow-800'>
              Stok Menipis
            </h3>
          </div>
          <div className='mt-2 text-sm text-yellow-700'>
            {lowStockSupplies.map((supply) => (
              <div key={supply.id}>
                {supply.name} (Sisa: {supply.stock} {supply.unit})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header Actions */}
      <div className='flex justify-between items-center'>
        <div className='space-x-2'>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedCategory('obat')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === 'obat'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            Obat-obatan
          </button>
          <button
            onClick={() => setSelectedCategory('supplies')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === 'supplies'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            Supplies
          </button>
          <button
            onClick={() => setSelectedCategory('alat')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === 'alat'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            Alat Medis
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className='flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          <Plus className='h-4 w-4 mr-1' />
          Tambah Item
        </button>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Supply List */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Daftar Suplai Medis
              </h2>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Kode
                    </th>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Nama
                    </th>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Stok
                    </th>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Min. Stok
                    </th>
                    <th className='px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase'>
                      Harga
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {filteredSupplies.map((supply) => (
                    <tr key={supply.id}>
                      <td className='px-3 py-2 text-sm text-gray-500'>
                        {supply.code}
                      </td>
                      <td className='px-3 py-2'>
                        <div className='text-sm font-medium text-gray-900'>
                          {supply.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {supply.category}
                        </div>
                      </td>
                      <td className='px-3 py-2 text-sm'>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            supply.stock <= supply.minimumStock
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {supply.stock} {supply.unit}
                        </span>
                      </td>
                      <td className='px-3 py-2 text-sm text-gray-500'>
                        {supply.minimumStock} {supply.unit}
                      </td>
                      <td className='px-3 py-2 text-sm text-gray-900 text-right'>
                        Rp {supply.price.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Statistics Sidebar */}
        <div className='space-y-6'>
          {/* Most Used Items */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Item Paling Sering Digunakan
            </h3>
            <div className='space-y-4'>
              {mostUsed.slice(0, 5).map(({ supply, totalUsage }) => (
                <div
                  key={supply.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <div className='text-sm font-medium text-gray-900'>
                      {supply.name}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {supply.category}
                    </div>
                  </div>
                  <div className='text-sm text-gray-500'>
                    {totalUsage} {supply.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplies;
