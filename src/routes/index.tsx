// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PatientRegistration from '../pages/PatientRegistration';
import PatientList from '../pages/PatientList';
import Checkups from '../pages/Checkups';
import Supplies from '../pages/Supplies';
import ErrorBoundary from '../components/ErrorBoundary';
import AppointmentList from '../pages/AppointmentList';
import AppointmentForm from '../features/appointments/components/AppointmentForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/patients' element={<PatientList />} />
      <Route path='/patients/register' element={<PatientRegistration />} />
      <Route path='/appointments' element={<AppointmentList />} />
      <Route path='/appointments/new' element={<AppointmentForm />} />
      <Route path='/medical-records' element={<div>Halaman Rekam Medis</div>} />
      <Route path='/checkups' element={<Checkups />} />
      <Route
        path='/supplies'
        element={
          <ErrorBoundary>
            <Supplies />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
