import React, {createContext, useState, useContext} from 'react';
import {login, register} from '../services/uathServices';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  console.log('user state auth::', user);

  const signIn = async credentials => {
    try {
      const response = await login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async userData => {
    try {
      const response = await register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
