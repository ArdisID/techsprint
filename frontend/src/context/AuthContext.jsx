import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      axios.get('/user')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Token invalid or expired
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('/login', { email, password });
    const { access_token, user: userData } = response.data;
    
    setToken(access_token);
    setUser(userData);
    localStorage.setItem('access_token', access_token);
    
    return userData;
  };

  const register = async (name, email, password, password_confirmation) => {
    const response = await axios.post('/register', { 
      name, 
      email, 
      password, 
      password_confirmation 
    });
    
    // Do not automatically log in the user after registration
    return response.data.user;
  };

  const logout = async () => {
    if (token) {
      try {
        await axios.post('/logout');
      } catch (e) {
        // Ignore error if already logged out on server
      }
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
  };

  const updateUser = async (data) => {
    const response = await axios.put('/user', data);
    setUser(response.data);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
