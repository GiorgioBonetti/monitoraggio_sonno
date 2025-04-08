import { useState } from "react";
import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
import "./Punteggio.css";
import Information from "../Information/Information.tsx";

function Punteggio() {
    //state
    const [testo] = useState("Eccellente");
    const [percentuale] = useState("100");

    //Render
    return (
        <div className="banner">
            <h1>
                {percentuale} % - {testo}
            </h1>
            <Information>
                <PunteggioInformation />
            </Information>
        </div>
    );
}

export default Punteggio;
