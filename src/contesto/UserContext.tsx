import React, { createContext, useState, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";


// 1. Tipo per l'utente
interface User {
  id: number;
  email: string;
}

// 2. Tipo del valore del contesto
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 3. Creazione del contesto (valore iniziale: undefined)
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Provider del contesto
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (userData: User) => {
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Custom hook per accedere facilmente al contesto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  return context ? context : { user: null, login: () => { }, logout: () => { } };
};
