import { useEffect, useState } from "react";
import { generaConsiglio } from "../../scripts/ollamaApi.ts";
import { SleepStageType } from "../../scripts/extractSleepStages.ts";

type TempoDormitoProps = {
    oreDormite: string[];
    oreNelLetto: string[];
    sleepData: SleepStageType[] | null;
};



function TempoDormito(props: TempoDormitoProps) {
    const [consiglio, setConsiglio] = useState<string>("");



    useEffect(() => {
        async function fetchConsiglio() {

            const sleepStagesStr =
                Array.isArray(props.sleepData) && props.sleepData.length > 0
                    ? props.sleepData
                        .map((s) => `${s.nome}: ${s.number} min`)
                        .join(", ")
                    : "N/A";

            const prompt = `Dati utente:
- Stadi del sonno suddivisi in minuti: [${sleepStagesStr}]
- Ore dormite: ${props.oreDormite[0]} ore ${props.oreDormite[1]} minuti
- Ore nel letto: ${props.oreNelLetto[0]} ore ${props.oreNelLetto[1]} minuti

VEDENDO QUESTI DATI, CREA UN CONSIGLIO PERSONALIZZATO PER L'UTENTE. NON SCRIVERE NULLA DI PIU' DEL CONSIGLIO, solo l'ORA DI ANDARE A DORMIRE IN MODO TALE CHE DORMA 8 ORE A NOTTE.`;

            console.log(prompt);
            const consiglio = await generaConsiglio(prompt);
            setConsiglio(consiglio);
        }

        fetchConsiglio().then();
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
                            <div className="grande mx-1">{props.oreDormite[0]}</div>
                            <div>h</div>
                            <div className="grande mx-1">{props.oreDormite[1]}</div>
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
                    {consiglio}
                    {/* {timestampToSleep(props.sleepData[0].timestamp, props.oreDormite)}. */}
                </div>
            )}
        </div>
    );
}

export default TempoDormito;
