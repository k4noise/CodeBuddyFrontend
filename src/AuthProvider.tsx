import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  auth: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!sessionStorage.getItem('profileType'));

  const login = () => setAuth(true);
  const logout = () => setAuth(false);

  const value = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
