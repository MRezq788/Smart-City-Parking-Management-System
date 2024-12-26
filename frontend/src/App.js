import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/logIn/LogIn";
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/clientSignUp" />} />
          <Route path="/clientSignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
