import Information from "../Information/Information.tsx";
// import "./Consiglio.css";


function Consiglio() {
    return (
        <div className="consiglio row">
            <h1 className="title col-11 d-flex align-items-center">Hai totalizzato un punteggio di 100, hai dormito bene, continua cosi!</h1>
            <div className="info col-1 d-flex align-items-center">
                <Information>
                    <p className="cons">SEGNAPOSTO INFO CONSIGLIO</p>
                </Information>
            </div>
        </div>
    );
}

export default Consiglio;