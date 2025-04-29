import { SleepDataInterface } from "./extractData.ts";


export function extractPunteggioSonno(dataArray: SleepDataInterface[]): number {

    if (!dataArray) {
        console.error("L'array passato è nullo");
        return 0
    }
    else {
        const durataSonno = dataArray.length; // 1 record = 1 minuto
        const obbiettivoOre = 8 * 60; // 8 ore in minuti
        const tempoProfRem = dataArray.filter((record) => record.stage === "Deep" || record.stage === "REM").length;
        const tempoRisvegli = dataArray.filter((record) => record.stage === "Awake").length;

        const p_durata = (durataSonno / obbiettivoOre) * 100; // Percentuale di sonno rispetto all'obbiettivo
        const p_fase = (tempoProfRem / durataSonno) * 100 // Percentuale di sonno profondo e REM
        const p_risvegli = (tempoRisvegli / durataSonno) * 100 // Percentuale di tempo sveglio
        const P_finale = ((p_durata * 0.5) + (p_fase * 0.5)) - p_risvegli; // Punteggio finale
        return Math.floor(P_finale); 


    }
}