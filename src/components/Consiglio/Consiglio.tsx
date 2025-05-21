import Card from "../Card/Card.tsx";
import { generaConsiglio } from "../../scripts/ollamaApi.ts";
import { useEffect, useState } from "react";
import {
    extractSleepStages,
    SleepStageType,
} from "../../scripts/extractSleepStages.ts";
import { SleepDataInterface } from "../../scripts/extractData.ts";

type ConsiglioProps = {
    sleepStages: SleepStageType[] | null;
    oreDormite: string[];
    oreNelLetto: string[];
    dataNascita: string;
    sex: string;
    sleepDataWeek: SleepDataInterface[][] | null;
};

function Consiglio(props: ConsiglioProps) {
    const [consiglio, setConsiglio] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const sleepStages: SleepStageType[][] = [];
    if (props.sleepDataWeek) {
        for (let i = 0; i < props.sleepDataWeek.length; i++) {
            sleepStages.push(extractSleepStages(props.sleepDataWeek[i]));
        }
    }

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
            const sleepStagesWeekStr = sleepStages.length
                ? sleepStages
                    .slice(0, 7)
                    .map(
                        (nightStages, p) =>
                            `${nightStages
                                .map(
                                    (stage) =>
                                        ` ${stage.nome}: ${stage.number} minuti`,
                                )
                                .join(", ")} (${p} giorni fa)`,
                    )
                    .join(" | ")
                : "Nessun storico";

            const prompt = `Dati utente:
- Stadi del sonno suddivisi in minuti: [${sleepStagesStr}]
- Ore dormite: ${oreDormiteStr}
- Ore nel letto: ${oreNelLettoStr}
- Data di nascita: ${props.dataNascita}
- Sesso: ${props.sex}
- Stadi del sonno settimanali: [${sleepStagesWeekStr}]
Genera un SOLO consiglio personalizzato per migliorare la qualità del sonno. Genera SOLAMENTE una frase contente solamente il consiglio. Non aggiungere altro testo.
Usa emoji che siano inerenti al tema del sonno dentro la frase che componi. Conta che le ore dormite totali ideali sono 8 ore. Traduci in italiano, in modo corretto.`;

            const consiglio = await generaConsiglio(prompt);
            setLoading(false);
            setConsiglio(consiglio);
        }

        fetchConsiglio().then();
    }, []); // generazione del consiglio tramite richiesta API ad una IA (ollama eseguita in locale sulla macchina)

    return loading ? (
        <div>
            <h1>Consiglio</h1>
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
                        <h3
                            className="title col-12 pt-1 px-md-5 px-3"
                            style={{
                                fontSize: window.innerWidth <= 768 ? "1rem" : "1.5rem", // Font più piccolo su mobile
                                lineHeight: window.innerWidth <= 768 ? "1.5" : "1.75", // Migliora la leggibilità
                                textAlign: "center", // Centra il testo per una migliore visualizzazione
                            }}
                        >
                            {consiglio}
                        </h3>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Consiglio;
