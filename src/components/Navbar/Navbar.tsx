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

    function checkDate(date: Date) {
        if (date <= new Date()) {
            props.setCurrentDate(date);
        } else props.setCurrentDate(new Date());
    }

    return (
        <nav className="row gx-3 gx-sm-5">
            <div className="col">
                <button
                    className="btn"
                    onClick={previousDate}
                    style={{
                        backgroundColor: "#14bdad",
                        color: "white",
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
                    &lt;
                </button>
            </div>
            <div className="col">
                <input
                    className="form-control"
                    type="date"
                    value={props.currentDate.toISOString().split("T")[0]}
                    onChange={(e) => checkDate(new Date(e.target.value))}
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
                />
            </div>
            <div className="col">
                <button
                    className="btn"
                    onClick={nextDate}
                    style={{
                        backgroundColor: "#14bdad",
                        color: "white",
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
                    &gt;
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
