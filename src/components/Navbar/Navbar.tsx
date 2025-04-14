import { useState } from "react";
// import "./Navbar.css";

function Navbar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // funzione per passare al giorno successivo
    function nextDate() {


        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        if (next <= new Date()) {
            setCurrentDate(next);
        }
    }

    // funzione per passare al giorno precedente
    function previousDate() {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        setCurrentDate(prev);
    }

    return (
        <nav className="Navbar row">
            <div className="col">
                <button className="btn btn-success" onClick={previousDate}>&lt;</button>
            </div>
            <div className="col">
                <input
                    className="form-control"
                    type="date"
                    value={currentDate.toISOString().split("T")[0]}
                    onChange={(e) => setCurrentDate(e.target.value == '00/00/0000' ? new Date(e.target.value) : new Date())}
                />
            </div>
            <div className="col">

                <button className="btn btn-success col" onClick={nextDate}>&gt;</button>
            </div>
        </nav>
    );
}

export default Navbar;
