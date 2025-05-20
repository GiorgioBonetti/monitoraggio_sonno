import Card from "../Card/Card.tsx";
import { generaConsiglio } from "../../scripts/ollamaApi.ts";
import { useEffect, useState } from "react";
import { SleepStageType } from "../../scripts/extractSleepStages.ts";
import { SleepDataInterface } from "../../scripts/extractData.ts";

type ConsiglioProps = {
    sleepStages: SleepStageType[] | null;
    oreDormite: string[];
    oreNelLetto: string[];
    // bd: User.annoNascita : ISO string;
    // sex: User.sex : string;
    sleepDataWeek: SleepDataInterface[][] | null;
};

function Consiglio(props: ConsiglioProps) {
    const [consiglio, setConsiglio] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchConsiglio() {
            const sleepStagesStr =
                Array.isArray(props.sleepStages) && props.sleepStages.length > 0
                    ? props.sleepStages
                          .map((s) => `${s.nome}: ${s.number}`)
                          .join(", ")
                    : "N/A";
            const oreDormiteStr = props.oreDormite.join(", ");
            const oreNelLettoStr = props.oreNelLetto.join(", ");
            // const storicoNottiStr = props.sleepDataWeek
            //     ? props.sleepDataWeek
            //           .map((notti) =>
            //               notti
            //                   .map(
            //                       (n) => `${n.date} ${n.stage}: ${n.timestamp}`,
            //                   )
            //                   .join("; "),
            //           )
            //           .join(" | ")
            //     : "Nessun storico";

            const prompt = `Dati utente:
- Stadi del sonno suddivisi in minuti: [${sleepStagesStr}]
- Ore dormite: ${oreDormiteStr}
- Ore nel letto: ${oreNelLettoStr}
- Anno di nascita: ${"2004"}
- Sesso: ${"Maschio"}
Genera un SOLO consiglio personalizzato per migliorare la qualità del sonno. In italiano. Genera SOLAMENTE una frase contente solamente il consiglio. Non aggiungere altro testo.`;

            const consiglio = await generaConsiglio(prompt);
            setLoading(false);
            setConsiglio(consiglio);
        }

        fetchConsiglio().then();
    }, []); // generazione del consiglio tramite richiesta API ad una IA (ollama eseguita in locale sulla macchina)

    return loading ? (
        <div>
            <h1>Consigli</h1>
            <div className="card border-4 rounded-4 mt-3">
                <Card>
                    <div className="d-flex aligin-items-center justify-content-center gap-3">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Caricamento...
                            </span>
                        </div>
                        <label className="mt-1">Richiesta IA in corso...</label>
                    </div>
                </Card>
            </div>
        </div>
    ) : (
        <div>
            <h1>Consigli</h1>
            <div className="card border-4 rounded-4 mt-3">
                <Card>
                    <div className="row">
                        <h3 className="title col-12 pt-1 px-md-5 px-3">
                            {consiglio}
                        </h3>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Consiglio;
