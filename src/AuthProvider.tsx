import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * Interface for the authentication context type.
 * @interface
 */
interface AuthContextType {
  /** Indicates whether the user is authenticated. */
  auth: boolean;
  /** Function to log the user in. */
  login: () => void;
  /** Function to log the user out. */
  logout: () => void;
  /** URL of the user's avatar. */
  avatar: string | null;
  /** Function to change the user's avatar. */
  changeAvatar: (avatarUrl: string) => void;
}

/**
 * Custom hook to use the authentication context.
 * @function
 * @returns {AuthContextType} The authentication context.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Context for authentication.
 * @type {React.Context<AuthContextType | null>}
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider component for the authentication context.
 * @function
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The provider component.
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!Cookies.get('profileType'));
  const [avatar, setAvatar] = useState<string | null>(null);

  /**
   * Function to log the user in.
   * @function
   */
  const login = () => setAuth(true);

  /**
   * Function to log the user out.
   * @function
   */
  const logout = () => setAuth(false);

  /**
   * Function to change the user's avatar.
   * @function
   * @param {string} avatar - The URL of the new avatar.
   */
  const changeAvatar = (avatar: string) => setAvatar(avatar);

  return (
    <AuthContext.Provider value={{ auth, login, logout, changeAvatar, avatar }}>
      {children}
    </AuthContext.Provider>
  );
};
