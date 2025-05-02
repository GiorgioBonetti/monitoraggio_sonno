// import "./Navbar.css";

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
                <button className="btn btn-primary" onClick={previousDate}>
                    &lt;
                </button>
            </div>
            <div className="col">
                <input
                    className="form-control"
                    type="date"
                    value={props.currentDate.toISOString().split("T")[0]}
                    onChange={(e) => checkDate(new Date(e.target.value))}
                />
            </div>
            <div className="col">
                <button className="btn btn-primary col" onClick={nextDate}>
                    &gt;
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
