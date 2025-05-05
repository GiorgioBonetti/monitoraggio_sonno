import timestampToSleep from "../../scripts/timestampToSleep.ts";

type TempoDormitoProps = {
    oreDormite: string[];
    oreNelLetto: string[];
    sleepData: any; // Sostituisci `any` con il tipo corretto se disponibile
};

function TempoDormito({
    oreDormite,
    oreNelLetto,
    sleepData,
}: TempoDormitoProps) {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
        >
            {oreDormite.length === 2 && (
                <div>
                    <h1 className="title">Hai dormito</h1>
                    <div className="row">
                        <div className="dormito col-12">
                            <div className="grande mx-1">{oreDormite[0]}</div>
                            <div>h</div>
                            <div className="grande mx-1">{oreDormite[1]}</div>
                            <div>min</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="pt-5"></div>
            {oreNelLetto.length === 2 && (
                <div>
                    <h1 className="title">Sei stato nel letto</h1>
                    <div className="row">
                        <div className="dormito col-12 px-5">
                            <div className="grande">{oreNelLetto[0]}</div>
                            <div>h</div>
                            <div className="grande">{oreNelLetto[1]}</div>
                            <div>min</div>
                        </div>
                    </div>
                </div>
            )}
            {Number(oreDormite[0]) < 8 && (
                <div className="alert alert-warning mt-3" role="alert">
                    Hai dormito meno di 8 ore. Ti consiglio di andare a letto
                    prima delle{" "}
                    {timestampToSleep(sleepData[0].timestamp, oreDormite)}.
                </div>
            )}
        </div>
    );
}

export default TempoDormito;
