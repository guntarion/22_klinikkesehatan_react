import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/patients' element={<div>Halaman Pasien</div>} />
      <Route path='/appointments' element={<div>Halaman Appointment</div>} />
      <Route path='/medical-records' element={<div>Halaman Rekam Medis</div>} />
      <Route path='/checkups' element={<div>Halaman Pemeriksaan</div>} />
    </Routes>
  );
};

export default AppRoutes;
