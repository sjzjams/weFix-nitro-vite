
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';
import type { UserInfo } from '../types';

interface AuthContextType {
  user: UserInfo | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Check local storage for persistence
    const storedUser = localStorage.getItem('wefix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    let mockUser: UserInfo;
    
    if (role === UserRole.TECHNICIAN) {
        mockUser = {
            id: 't1',
            name: '王师傅',
            avatar: 'https://picsum.photos/100/100?random=1',
            role: UserRole.TECHNICIAN,
            balance: 5400
        };
    } else if (role === UserRole.ADMIN) {
        mockUser = {
            id: 'admin1',
            name: '超级管理员',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
            role: UserRole.ADMIN
        };
    } else {
        mockUser = {
            id: 'u1',
            name: '张三',
            avatar: 'https://picsum.photos/200/200?random=user',
            role: UserRole.USER,
            balance: 240
        };
    }
    
    setUser(mockUser);
    localStorage.setItem('wefix_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wefix_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
