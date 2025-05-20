import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../scripts/Supabase.ts";
import SHA256 from "crypto-js/sha256";

function Registrazione() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [sex, setSex] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // navigazione
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sleep Monitor - Registrazione";
    }, []); // titolo della pagina

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // FARE LA REGISTRAZIONE ECC
        if (email && password) {
            // Controlla se l'email è già registrata
            // DA FARE

            // Controlla se la password è valida
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert(
                    "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo (es. !, @, #, $).",
                );
                return;
            }

            const fetchData = async () => {
                try {
                    await supabase
                        .from("Utenti")
                        .insert([
                            { Email: email, pwd: SHA256(password).toString(), Nome: name, Cognome: surname, dataNascita: birthday, Sesso: sex },
                        ])
                        .select();

                    navigate("/login");
                } catch {
                    alert("Si è verificato un errore durante il login.");
                }
            };
            fetchData().then(() => { });
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
                    <h2 className="text-center pb-2">Registrazione</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputNome"
                                    className="form-label"
                                >
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputCognome"
                                    className="form-label"
                                >
                                    Cognome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCognome"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="inputDataNascita"
                                className="form-label"
                            >
                                Data di nascita
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="inputDataNascita"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {/* metto un massimo in modo che l'utente non possa inserire una data oltre quella odierna */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputSesso" className="form-label">
                                Sesso
                            </label>
                            <select
                                className="form-select"
                                id="inputSesso"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                required
                            >
                                <option value="-">-</option>
                                <option value="Maschio">Maschio</option>
                                <option value="Femmina">Femmina</option>
                            </select>
                        </div>
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
                    <button
                        className="btn mt-1 btn-link"
                        onClick={() => {
                            navigate("/login"); // Reindirizza alla pagina di login
                        }}
                    >
                        Indietro
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registrazione;
