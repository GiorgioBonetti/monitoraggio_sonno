import Information from "../Information/Information.tsx";
import "./Consiglio.css";


function Consiglio() {
    return (
        <div className="consiglio">
            <h1>Hai totalizzato un punteggio di 100, hai dormito bene, continua cosi!</h1>
            <div className="info">
                <Information>
                    <p className="cons">SEGNAPOSTO INFO CONSIGLIO</p>
                </Information>
            </div>
        </div>
    );
}

export default Consiglio;