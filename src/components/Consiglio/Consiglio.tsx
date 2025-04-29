// import Information from "../Information/Information.tsx";
import Popup from "../Popup/Popup.tsx";
// import "./Consiglio.css";


function Consiglio() {
    return (
        <div className="consiglio row">
            <h1 className="title col-11 d-flex align-items-center">Hai totalizzato un punteggio di 100, hai dormito bene, continua cosi!</h1>
            <div className="info col-1 d-flex align-items-center">
                <Popup title="Informazioni sul Consiglio" modalId="Consiglio">
                    <p className="cons">SEGNAPOSTO INFO CONSIGLIO</p>
                </Popup>
            </div>
        </div>
    );
}

export default Consiglio;