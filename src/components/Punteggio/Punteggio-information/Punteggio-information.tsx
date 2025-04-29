function PunteggioInformation() {
    return (
        <div className="container text-start fst-normal fs-5 lh-sm">
            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    80-100
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Ottima qualità del sonno
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    60-79
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Qualità del sonno buona ma migliorabile
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    40-59
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Sonno insufficiente, con margini di miglioramento
                    significativi
                </p>
            </div>

            <div className="row">
                <p className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-5 text-center text-primary gx-0">
                    0-39
                </p>
                <p className="col-xl-11 col-lg-10 col-md-9 col-sm-8 col-7">
                    Sonno scarso, è necessario un intervento per migliorare la
                    qualità
                </p>
            </div>
        </div>
    );
}

export default PunteggioInformation;
