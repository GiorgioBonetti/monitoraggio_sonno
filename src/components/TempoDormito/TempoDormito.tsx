import { useEffect, useState } from "react";
import { generaConsiglio } from "../../scripts/ollamaApi.ts";
import { SleepStageType } from "../../scripts/extractSleepStages.ts";
import { SleepDataInterface } from "../../scripts/extractData.ts";

type TempoDormitoProps = {
    oreDormite: string[];
    oreNelLetto: string[];
    sleepDataStage: SleepStageType[] | null;
    sleepData: SleepDataInterface[];

};

function TempoDormito(props: TempoDormitoProps) {

    const [consiglio, setConsiglio] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (Number(props.oreDormite[0]) < 8) {
            async function fetchConsiglio() {
                const sleepStagesStr =
                    Array.isArray(props.sleepDataStage) && props.sleepDataStage.length > 0
                        ? props.sleepDataStage
                            .map((s) => `${s.nome}: ${s.number} min`)
                            .join(", ")
                        : "N/A";

                const prompt = `Dati utente:
- Stadi del sonno suddivisi in minuti: [${sleepStagesStr}]
- Ore dormite: ${props.oreDormite[0]} ore ${props.oreDormite[1]} minuti
- Ore nel letto: ${props.oreNelLetto[0]} ore ${props.oreNelLetto[1]} minuti
- Timestamp di inizio sonno: ${props.sleepData[0].timestamp}
- Timestamp di fine sonno: ${props.sleepData[props.sleepData.length - 1].timestamp}

VEDENDO QUESTI DATI, dimmi a che ora dovevo andare a dormire. NON SCRIVERE NULLA DI PIU', solo l'ORA DI ANDARE A DORMIRE in modo da dormire 8 ORE A NOTTE. scrivimi solamente l'ora. nessuna parola.`;

                const consiglio = await generaConsiglio(prompt);
                setConsiglio(consiglio);
                setLoading(false);
            }

            fetchConsiglio().then();
        }
    }, []); // generazione del consiglio tramite richiesta API ad una IA (ollama eseguita in locale sulla macchina)

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
        >
            {props.oreDormite.length === 2 && (
                <div>
                    <h1 className="title">Hai dormito</h1>
                    <div className="row">
                        <div className="dormito col-12">
                            <div className="grande mx-1">
                                {props.oreDormite[0]}
                            </div>
                            <div>h</div>
                            <div className="grande mx-1">
                                {props.oreDormite[1]}
                            </div>
                            <div>min</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="pt-5"></div>
            {props.oreNelLetto.length === 2 && (
                <div>
                    <h1 className="title">Sei stato nel letto</h1>
                    <div className="row">
                        <div className="dormito col-12 px-5">
                            <div className="grande">{props.oreNelLetto[0]}</div>
                            <div>h</div>
                            <div className="grande">{props.oreNelLetto[1]}</div>
                            <div>min</div>
                        </div>
                    </div>
                </div>
            )}
            {Number(props.oreDormite[0]) < 8 && (
                <div className="alert alert-warning mt-3" role="alert">
                    Hai dormito meno di 8 ore. Ti consiglio di andare a letto
                    prima delle{" "}
                    {loading ? (
                        <div
                            className="spinner-border text-secondary gx-1 align-self-center"
                            role="status"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        consiglio
                    )}
                    {/* {timestampToSleep(props.sleepData[0].timestamp, props.oreDormite)}. */}
                </div>
            )}
        </div>
    );
}

export default TempoDormito;
