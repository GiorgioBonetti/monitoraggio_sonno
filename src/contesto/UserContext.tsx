import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
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
