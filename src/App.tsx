// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </Router>
  );
}

export default App;
