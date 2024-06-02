import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  auth: boolean;
  login: () => void;
  logout: () => void;
  avatar: string | null;
  changeAvatar: (avatarUrl: string) => void;
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
  const [avatar, setAvatar] = useState<string | null>(null);

  const login = () => setAuth(true);
  const logout = () => setAuth(false);
  const changeAvatar = (avatar: string) => setAvatar(avatar);

  return (
    <AuthContext.Provider value={{ auth, login, logout, changeAvatar, avatar }}>
      {children}
    </AuthContext.Provider>
  );
};
