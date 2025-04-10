import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const formatDate = (date: Date) => {
        // funzione per formattare la data in italiano stringato
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // funzione per passare al giorno successivo
    function nextDate() {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        setCurrentDate(next);
    }

    // funzione per passare al giorno precedente
    function previousDate() {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        setCurrentDate(prev);
    }

    return (
        <nav className="Navbar">
            <button onClick={previousDate}>&lt;</button>
            <label>{formatDate(currentDate)}</label>
            <button onClick={nextDate}>&gt;</button>
        </nav>
    );
}

export default Navbar;
