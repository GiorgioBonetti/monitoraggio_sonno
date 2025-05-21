import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../contesto/UserContext";
import { useEffect, useState } from "react";

function Navbar() {
    const [searchParams] = useSearchParams();
    const { logout } = useUser();
    const navigate = useNavigate();

    // Stato iniziale di `date` basato sui parametri dell'URL
    const [date, setDate] = useState<Date>(() => {
        const param = searchParams.get("date");
        return param ? new Date(param) : new Date();
    });

    // Aggiorna il parametro `date` nell'URL solo se cambia
    useEffect(() => {
        const currentDate = searchParams.get("date");
        const formattedDate = date.toISOString().split("T")[0];

        if (currentDate !== formattedDate) {
            const params = new URLSearchParams(searchParams);
            params.set("date", formattedDate); // Aggiorna solo il parametro `date`
            navigate(`/?${params.toString()}`, { replace: true }); // Usa `replace` per evitare di aggiungere una nuova voce nella cronologia
        }
    }, [date, searchParams, navigate]);

    // Funzioni per cambiare la data
    function nextDate() {
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        if (next <= new Date()) {
            setDate(next);
        }
    }

    function previousDate() {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        setDate(prev);
    }

    function checkDate(newDate: Date) {
        if (newDate <= new Date()) {
            setDate(newDate);
        } else {
            setDate(new Date());
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-sm bg-light mb-1">
            <div className="container-fluid justify-content-between">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img
                        id="logo"
                        src="/icon/moon.png"
                        alt="Logo"
                        width="24"
                        height="24"
                        className="d-inline-block align-text-top mx-3"
                    />
                    Sleep Monitor
                </a>

                {/* Logout per schermi piccoli */}
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger d-sm-none border-2"
                    style={{
                        transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.transform = "scale(0.95)";
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    Logout
                </button>

                {/* Pulsante per espandere/collassare la navbar in modalità mobile */}
                <button
                    className="navbar-toggler border-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{
                        transition: "all 0.2s ease",
                        borderColor: "#000000",
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.transform = "scale(0.95)";
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenuto della navbar */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul
                        className="navbar-nav justify-content-around"
                        style={{ width: "100%" }}
                    >
                        <li className="nav-item mx-0 mx-md-3 mx-lg-5"></li>
                        <li className="nav-item">
                            <div className="d-flex justify-content-center my-2 my-sm-0">
                                {/* Pulsante per data precedente */}
                                <button
                                    className="btn me-2"
                                    onClick={previousDate}
                                    style={{
                                        backgroundColor: "#18c599",
                                        color: "white",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    &lt;
                                </button>

                                {/* Input per selezionare la data */}
                                <input
                                    className="form-control mx-2 border-2"
                                    type="date"
                                    value={date.toISOString().split("T")[0]}
                                    onChange={(e) =>
                                        checkDate(new Date(e.target.value))
                                    }
                                    style={{
                                        transition: "all 0.2s ease",
                                        maxWidth: "200px",
                                        borderColor: "#18c599",
                                    }}
                                />

                                {/* Pulsante per data successiva */}
                                <button
                                    className="btn ms-2"
                                    onClick={nextDate}
                                    style={{
                                        backgroundColor: "#18c599",
                                        color: "white",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    &gt;
                                </button>
                            </div>
                        </li>
                        <li className="nav-item"></li>

                        {/* Logout per schermi grandi */}
                        <li className="nav-item align-self-end d-none d-sm-block">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger mx-3 my-2 my-sm-0 border-2"
                                style={{
                                    transition: "all 0.2s ease",
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                    e.currentTarget.style.transform =
                                        "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;