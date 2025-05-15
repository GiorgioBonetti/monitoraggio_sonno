import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registrazione() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // navigazione
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sleep Monitor - Registrazione";
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // FARE LA REGISTRAZIONE ECC
        if (email && password) {
            sessionStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            navigate("/");
        }
    };

    return (
        <div className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
            <div
                className="container-lg position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
            >
                <h1 className="m-4">Registrazione</h1>
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
                            <div id="passwordHelp" className="form-text">
                                Almeno 8 caratteri, una maiuscola, una
                                minuscola, un numero e un simbolo (es. !, @, #,
                                $).
                            </div>
                        </div>
                        <div className="d-grid gap-2 mx-auto">
                            <button type="submit" className="btn btn-primary">
                                Registrami
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registrazione;
