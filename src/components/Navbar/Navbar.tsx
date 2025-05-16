import { useNavigate } from "react-router-dom";
// Update the import path below to the correct relative location of UserContext
import { useUser } from "../../contesto/UserContext";

type NavbarProps = {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
};

function Navbar(props: NavbarProps) {

    const { logout } = useUser();

    // funzione per passare al giorno successivo
    function nextDate() {
        const next = new Date(props.currentDate);
        next.setDate(next.getDate() + 1);
        if (next <= new Date()) {
            props.setCurrentDate(next);
        }
    }

    // funzione per passare al giorno precedente
    function previousDate() {
        const prev = new Date(props.currentDate);
        prev.setDate(prev.getDate() - 1);
        props.setCurrentDate(prev);
    }

    // controllo che la data inserita sia valida (ovvero che non sia futura)
    function checkDate(date: Date) {
        if (date <= new Date()) {
            props.setCurrentDate(date);
        } else props.setCurrentDate(new Date());
    }

    // navigazione
    const navigate = useNavigate();

    // LOGOUT
    const handleLogout = () => {
        logout(); // Esegui il logout

        navigate("/login"); // Reindirizza alla pagina di login
    };

    return (
        <nav className="navbar navbar-expand-sm bg-light mb-1">
            <div className="container-fluid justify-content-between">
                <a className="navbar-brand" href="/">
                    <img
                        src="/icon/moon.png"
                        alt="Logo"
                        width="24"
                        height="24"
                        className="d-inline-block align-text-top mx-3"
                    />
                    Sleep Monitor
                </a>
                {/* Bottone di logout visibile solo sotto i 576px */}
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger d-sm-none"
                >
                    Logout
                </button>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul
                        className="navbar-nav justify-content-around"
                        style={{ width: "100%" }}
                    >
                        <li className="nav-item mx-0 mx-md-3 mx-lg-5"></li>
                        <li className="nav-item">
                            <div className="d-flex justify-content-center my-2 my-sm-0">
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
                                <input
                                    className="form-control mx-2 border-2"
                                    type="date"
                                    value={
                                        props.currentDate
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={(e) =>
                                        checkDate(new Date(e.target.value))
                                    }
                                    style={{
                                        transition: "all 0.2s ease",
                                        maxWidth: "200px",
                                        borderColor: "#18c599",
                                    }}
                                />
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
                        {/* Bottone di logout visibile sopra i 576px */}
                        <li className="nav-item align-self-end d-none d-sm-block">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger mx-3 my-2 my-sm-0"
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
