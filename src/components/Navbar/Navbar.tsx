import { useNavigate } from "react-router-dom";

type NavbarProps = {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
};

function Navbar(props: NavbarProps) {
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
        sessionStorage.removeItem("isLoggedIn");
        navigate("/login"); // Reindirizza alla pagina di login
    };

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src="../../../public/icon/moon.png"
                        alt="Logo"
                        width="24"
                        height="24"
                        className="d-inline-block align-text-top mx-3"
                    />
                    Sleep Monitor
                </a>
                <button
                    className="navbar-toggler ms-auto"
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="d-flex justify-content-center my-2 my-sm-0">
                                <button
                                    className="btn me-2"
                                    onClick={previousDate}
                                    style={{
                                        backgroundColor: "#14bdad",
                                        color: "white",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                                        e.currentTarget.style.transform =
                                            "scale(0.95)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                >
                                    &lt;
                                </button>
                                <input
                                    className="form-control mx-2"
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
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                                        e.currentTarget.style.transform =
                                            "scale(0.95)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                />
                                <button
                                    className="btn ms-2"
                                    onClick={nextDate}
                                    style={{
                                        backgroundColor: "#14bdad",
                                        color: "white",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 4px 8px rgba(0, 0, 0, 0.3)";
                                        e.currentTarget.style.transform =
                                            "scale(0.95)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                >
                                    &gt;
                                </button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger mx-3 my-2 my-sm-0"
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
