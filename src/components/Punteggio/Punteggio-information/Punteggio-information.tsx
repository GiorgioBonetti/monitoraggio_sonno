function PunteggioInformation() {
    return (
        <div className="container text-start fs-5 lh-sm">
            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    80-100
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Ottima qualità del sonno. Il tuo riposo è stato rigenerante
                    e supporta al meglio la tua giornata. Mantieni queste buone
                    abitudini!
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    60-79
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Buona qualità, margini di miglioramento. Il tuo sonno è
                    soddisfacente, ma piccoli accorgimenti possono renderlo
                    ancora più efficace per il tuo benessere.
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    40-59
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Sonno insufficiente, miglioramento necessario. Il tuo riposo
                    non è stato ottimale e influisce sulla tua energia. Esplora
                    i consigli per dormire meglio.
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    0-39
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Sonno scarso, è importante intervenire. La qualità del tuo
                    sonno è bassa ed è fondamentale agire per ritrovare un
                    riposo salutare.
                </p>
            </div>
        </div>
    );
}

export default PunteggioInformation;
