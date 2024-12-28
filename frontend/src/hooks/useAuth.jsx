import { useState, useEffect } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState({
    id: sessionStorage.getItem('userId'),
    driverId: sessionStorage.getItem('driverId'),
    token: sessionStorage.getItem('token'),
    role: sessionStorage.getItem('userRole')
  });

  const login = (userData) => {
    const authData = {
      id: userData.id,
      driverId: userData.driverId,
      token: userData.token,
      role: userData.role
    };
    
    // Store in sessionStorage (cleared when browser tab closes)
    sessionStorage.setItem('userId', userData.id);
    sessionStorage.setItem('driverId', userData.driverId);
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('userRole', userData.role);
    
    setAuth(authData);
  };

  const logout = () => {
    sessionStorage.clear();
    setAuth({ id: null, token: null, role: null });
  };

  return { auth, login, logout };
};

export default useAuth;