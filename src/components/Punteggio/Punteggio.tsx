import { useState } from "react";
import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
import "./Punteggio.css";

function Punteggio() {
    //state
    const [testo, setTesto] = useState("Eccellente");
    const [percentuale, setPercentuale] = useState("100");
    const [isOpen, setIsOpen] = useState(false);

    //Render
    return (
        <div className="banner">
            <h1>
                {percentuale} % - {testo}
            </h1>

            <button
                className="info-button"
                onClick={() => setIsOpen(isOpen ? false : true)}
            >
                i
                {isOpen ? (
                    <span className="tooltip">
                        <PunteggioInformation />
                    </span>
                ) : (
                    ""
                )}
            </button>
        </div>
    );
}

export default Punteggio;
