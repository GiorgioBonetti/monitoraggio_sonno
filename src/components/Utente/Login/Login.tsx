import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../.././scripts/Supabase.ts";
import SHA256 from "crypto-js/sha256";
import { useUser } from "../../../contesto/UserContext";

function Login() {
    const [email, setEmail] = useState("123@gmail.com");
    const [password, setPassword] = useState("123");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { login, logout } = useUser();

    // navigazione
    const navigate = useNavigate();

    // Recupera l'utente memorizzato (se presente)


    useEffect(() => {
        document.title = "Sleep Monitor - Login";

        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
            login(parsedUser);
        }

    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email && password) {
            const fetchData = async () => {
                try {
                    const { data } = await supabase
                        .from("Utenti")
                        .select("*")
                        .eq("Email", email)
                        .eq("pwd", SHA256(password).toString());

                    if (data && data.length === 1) {
                        const user = data[0];
                        // setIsLoggedIn(true);
                        login({ id: user.id, email: email, pwd: user.pwd, Nome: user.Nome, Cognome: user.cognome, dataNascita: user.dataNascita, Sesso: user.Sesso }); // Passa l'oggetto utente al contesto

                    }
                    else {
                        alert("Controlla meglio user e pasword");
                        // setIsLoggedIn(false);
                        logout();
                    }
                } catch {
                    alert("Si è verificato un errore durante il login.");
                    // setIsLoggedIn(false);
                    logout();
                }
            };
            fetchData().then(() => { });
        } else {
            alert("Si è verificato un errore durante il login.");
            logout();
        }
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <div
                className="container-lg position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
            >
                <h1 className="m-4 text-center">
                    <img
                        src="/icon/moon.png"
                        alt="Logo"
                        width="48"
                        height="48"
                        className="d-inline-block align-text-top mx-2"
                    />
                    Sleep Monitor
                </h1>
                <div className="card rounded-4 p-4">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail1" className="form-label">
                                Indirizzo email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div id="emailHelp" className="form-text">
                                Se hai dimenticato la tua email, contatta un
                                amministratore.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="inputPassword"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mx-auto">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <button
                        className="btn mt-1 btn-outline-primary"
                        onClick={() => {
                            navigate("/registrazione"); // Reindirizza alla pagina di login
                        }}
                    >
                        Registrati
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
