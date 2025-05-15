import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MachinesPage from './pages/MachinesPage';
import MachineFormPage from './pages/MachineFormPage';
import PeoplePage from './pages/PeoplePage';
import PersonFormPage from './pages/PersonFormPage';
import LendingsPage from './pages/LendingsPage';
import LendingFormPage from './pages/LendingFormPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/machines/new" element={<MachineFormPage />} />
            <Route path="/machines/edit/:id" element={<MachineFormPage />} />
            
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/new" element={<PersonFormPage />} />
            <Route path="/people/edit/:id" element={<PersonFormPage />} />
            
            <Route path="/lendings" element={<LendingsPage />} />
            <Route path="/lendings/new" element={<LendingFormPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;