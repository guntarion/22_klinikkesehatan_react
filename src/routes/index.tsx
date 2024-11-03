import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PatientRegistration from '../pages/PatientRegistration';
import PatientList from '../pages/PatientList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/patients' element={<PatientList />} />
      <Route path='/patients/register' element={<PatientRegistration />} />
      <Route path='/appointments' element={<div>Halaman Appointment</div>} />
      <Route path='/medical-records' element={<div>Halaman Rekam Medis</div>} />
      <Route path='/checkups' element={<div>Halaman Pemeriksaan</div>} />
    </Routes>
  );
};

export default AppRoutes;
