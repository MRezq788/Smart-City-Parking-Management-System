import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/clientSignUp" />} />
          <Route path="/clientSignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
