import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase.ts";
import SHA256 from "crypto-js/sha256";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // navigazione
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sleep Monitor - Login";
    }, []); // titolo della pagina

    useEffect(() => {
        const sessionStatus = sessionStorage.getItem("isLoggedIn");
        if (sessionStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []); // Controlla se l'utente è già loggato

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simula il login (aggiungi qui la logica di autenticazione)
        if (email && password) {
            const fetchData = async () => {
                try {
                    const { data } = await supabase
                        .from("Utenti")
                        .select("id, pwd")
                        .eq("Nome", email);

                    if (data && data.length === 1) {
                        const user = data[0];
                        if (user.pwd === SHA256(password).toString()) {
                            setIsLoggedIn(true);
                            navigate("/"); // Reindirizza alla pagina principale
                            sessionStorage.setItem(
                                "Utente",
                                JSON.stringify(user.id),
                            );
                        } else {
                            alert("Password errata.");
                            setIsLoggedIn(false);
                        }
                    } else {
                        alert("Utente non trovato.");
                        setIsLoggedIn(false);
                    }
                } catch {
                    setIsLoggedIn(false);
                }
            };
            fetchData().then(() => {});
        } else {
            alert("Non hai inserito la password.");
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Reindirizza alla pagina principale
        } else {
            navigate("/login"); // Reindirizza alla pagina di login
        }
    }, []); // Reindirizza alla pagina principale se l'utente è già loggato

    return (
        <div style={{ minHeight: "100vh" }}>
            <div
                className="container-lg position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
            >
                <h1 className="m-4">
                    <img
                        src="/icon/moon.png"
                        alt="Logo"
                        width="48"
                        height="48"
                        className="d-inline-block align-text-top mx-3"
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
