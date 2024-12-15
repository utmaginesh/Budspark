import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user') || null);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState(null);
  const [isProfUpdated, setIsProfUpdated] = useState(false);
  const [year, setYear] =  useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth, role, setRole, department, setDepartment, isProfUpdated, setIsProfUpdated,
    year, setYear}}>
      {children}
    </UserContext.Provider>
  );
};
