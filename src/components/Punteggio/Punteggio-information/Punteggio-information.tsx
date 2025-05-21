import "./Punteggio-information.css";

function PunteggioInformation() {
    return (
        <div className="container text-start fs-5 lh-sm">
            <div className="row d-flex flex-column flex-sm-row align-items-start mt-2">
                <p className="align-self-start align-self-sm-center gx-auto text-nowrap col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <span style={{ color: "blue" }}>80</span>
                    {"-"}
                    <span style={{ color: "blue" }}>100</span>
                </p>
                <p className="punteggio-paragrafo col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    Ottima qualità del sonno. Il tuo riposo è stato rigenerante
                    e supporta al meglio la tua giornata. Mantieni queste buone
                    abitudini!
                </p>
            </div>
            <hr className="pb-2 border-2" />
            <div className="row d-flex flex-column flex-sm-row align-items-start">
                <p className="align-self-start align-self-sm-center gx-auto text-nowrap col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <span style={{ color: "rgb(37,188,105)" }}>60</span>
                    {"-"}
                    <span style={{ color: "rgb(37,188,105)" }}>79</span>
                </p>
                <p className="punteggio-paragrafo col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    Buona qualità, margini di miglioramento. Il tuo sonno è
                    soddisfacente, ma piccoli accorgimenti possono renderlo
                    ancora più efficace per il tuo benessere.
                </p>
            </div>
            <hr className="pb-2 border-2" />
            <div className="row d-flex flex-column flex-sm-row align-items-start">
                <p className="align-self-start align-self-sm-center gx-auto text-nowrap col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <span style={{ color: "#e8ae00" }}>40</span>
                    {"-"}
                    <span style={{ color: "#e8ae00" }}>59</span>
                </p>
                <p className="punteggio-paragrafo col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    Sonno insufficiente, miglioramento necessario. Il tuo riposo
                    non è stato ottimale e influisce sulla tua energia. Esplora
                    i consigli per dormire meglio.
                </p>
            </div>
            <hr className="pb-2 border-2" />
            <div className="row d-flex flex-column flex-sm-row align-items-start">
                <p className="align-self-start align-self-sm-center gx-auto text-nowrap col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <span style={{ color: "#dc3545" }}>0</span>
                    {"-"}
                    <span style={{ color: "#dc3545" }}>39</span>
                </p>
                <p className="punteggio-paragrafo col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    Sonno scarso, è importante intervenire. La qualità del tuo
                    sonno è bassa ed è fondamentale agire per ritrovare un
                    riposo salutare.
                </p>
            </div>
        </div>
    );
}

export default PunteggioInformation;
