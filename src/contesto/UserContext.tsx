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
        const fetchUser = async () => {
            const storedUserString = localStorage.getItem("user");
            if (storedUserString) {
                const storedUser: User = JSON.parse(storedUserString);
                // You may want to validate storedUser here before using
                try {
                    const { data } = await supabase
                        .from("Utenti")
                        .select("*")
                        .eq("Email", storedUser.email)
                        .eq("token", storedUser.token)
                        .neq("token", "NO");
                    if (data && data.length === 1) {
                        setUser(data[0]);
                        // Reindirizza solo dopo che tutto è stato salvato
                        navigate("/");
                    }
                    else {
                        // Se non trova l'utente, esegue il logout
                        logout();
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser();
    }, []);

    const login = async (userData: User) => {
        if (userData.token) {
            const fetchUser = async () => {
                // You may want to validate storedUser here before using
                try {
                    const { data } = await supabase
                        .from("Utenti")
                        .select("*")
                        .eq("Email", userData.email)
                        .eq("pwd", SHA256(userData.pwd).toString())
                        .eq("token", userData.token)
                        .neq("token", "NO");
                    if (data && data.length === 1) {
                        setUser(data[0]);
                        navigate("/"); // Reindirizza solo dopo che tutto è stato salvato
                    }
                    else
                        logout(); // Se non trova l'utente, esegue il logout
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            fetchUser();
            localStorage.setItem("user", JSON.stringify(userData));
        }
        else {
            // Se non c'è un token, creane uno nuovo
            const token = SHA256(new Date().toISOString()).toString() + SHA256(userData.email).toString();

            userData.token = token; // Aggiungi il token all'oggetto userData

            await supabase
                .from("Utenti")
                .update({ token, updated_at: new Date().toISOString() })
                .eq("id", userData.id)
                .select();

            setUser(userData); // Imposta l'utente nello stato
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/"); // Reindirizza solo dopo che tutto è stato salvato
        }
    };


    const logout = () => {
        if (user?.id) {
            const fetchData = async () => {
                await supabase
                    .from("Utenti")
                    .update({ token: "NO", updated_at: null })
                    .eq("id", user.id)
                    .select();
            };
            fetchData().then();
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
}


// 5. Custom hook per accedere facilmente al contesto
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    return context
        ? context
        : {
            user: null,
            login: () => { },
            logout: () => { },
        };
};
