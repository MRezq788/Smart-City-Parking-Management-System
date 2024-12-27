import DriverHome from './components/DriverHome';
import ManagerHome from './components/ManagerHome';
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/logIn/LogIn";
import { Navigate } from 'react-router-dom';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return(
    <div className='app'>
            <Router>
                <Routes>
                <Route path="/" element={<Navigate to="/clientSignUp" />} />
                    <Route path="/clientSignUp" element={<SignUp />} />
                    <Route path="/signIn" element={<SignIn/>} />
                    <Route path="/driver/home" element={<DriverHome />} />
                    <Route path="/manager/home" element={<ManagerHome />} />
                </Routes>
            </Router>
    </div>
  )
}

export default App;