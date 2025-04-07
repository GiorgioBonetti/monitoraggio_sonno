import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
    const [currentData, setCurrentData] = useState("giorno corrente");

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setCurrentData(formattedDate);
    }, []);

    // funzione per passare al giorno successivo
    function nextDate() {}

    // funzione per passare al giorno precedente
    function previousDate() {}

    return (
        <nav className="Navbar">
            <ul>
                <button
                    onClick={() => {
                        previousDate();
                    }}
                >
                    &lt;
                </button>
                {/* aggiungere che su onClick esegue la relativa funzione */}
                <label>{currentData}</label>
                <button
                    onClick={() => {
                        nextDate();
                    }}
                >
                    &gt;
                </button>
                {/* aggiungere che su onClick esegue la relativa funzione */}
            </ul>
        </nav>
    );
}

export default Navbar;
