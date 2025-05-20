import SHA256 from "crypto-js/sha256";
import {
    createContext,
    useState,
    ReactNode,
    useContext,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../scripts/Supabase";

// 1. Tipo per l'utente
export interface User {
    id: number;
    email: string;
    Nome: string;
    Cognome: string;
    pwd: string;
    token?: string;
    dataNascita: string;
    Sesso: string;
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
        const token = userData.token
            ? userData.token
            : SHA256(new Date().toISOString()).toString();
        userData.token = token;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        const fetchData = async () => {
            await supabase
                .from("Utenti")
                .update({ token })
                .eq("id", userData.id)
                .select();
        };
        navigate("/"); // Reindirizza alla pagina principale
        fetchData();
    };

    const logout = () => {
        if (user?.id) {
            const fetchData = async () => {
                await supabase
                    .from("Utenti")
                    .update({ token: "NO" })
                    .eq("id", user.id)
                    .select();
            };
            fetchData();
        }
        setUser(null);

        localStorage.clear();
        navigate("/login"); // Reindirizza alla pagina di login
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

    return context
        ? context
        : {
              user: null,
              login: () => {},
              logout: () => {},
          };
};
