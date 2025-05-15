import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // navigazione
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sleep Monitor - Login";

        // Controlla se l'utente è già loggato
        const sessionStatus = sessionStorage.getItem("isLoggedIn");
        if (sessionStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simula il login (aggiungi qui la logica di autenticazione)
        if (email && password) {
            sessionStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            navigate("/");
        }
    };

    useEffect(() => {
        // Reindirizza alla pagina principale se l'utente è già loggato
        if (isLoggedIn) {
            navigate("/"); // Reindirizza alla pagina principale
        }
    }, []);

    return (
        <div className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
            <div
                className="container-lg position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
            >
                <h1 className="m-4">Login</h1>
                <div className="card rounded-4 p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    navigate("/registrazione"); // Reindirizza alla pagina di login
                                }}
                            >
                                Registrati
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
