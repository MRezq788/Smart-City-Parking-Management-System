import DriverHome from './components/DriverHome';
import ManagerHome from './components/ManagerHome';
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/logIn/LogIn";
import AdminDashboard from './pages/admin/AdminDashboard';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = sessionStorage.getItem('userRole');

  if (userRole !== allowedRole) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

function App() {
  return(
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/clientSignUp" />} />
          <Route path="/clientSignUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn/>} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute allowedRole="[ROLE_ADMIN]">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/home"
            element={
              <ProtectedRoute allowedRole="[ROLE_DRIVER]">
                <DriverHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/home"
            element={
              <ProtectedRoute allowedRole="[ROLE_MANAGER]">
                <ManagerHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;