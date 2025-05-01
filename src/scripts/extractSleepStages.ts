import { SleepDataInterface } from "./extractData.ts";

interface SleepStagesInterface {
    awake: number;
    rem: number;
    light: number;
    deep: number;
}

export type SleepStageType = {
    nome: string;
    number: number;
};

export function extractSleepStages(
    dataArray: SleepDataInterface[] | null,
): SleepStageType[] {
    // controllo se l'array passato è nullo
    if (!dataArray) {
        console.error("L'array passato è nullo");
        return [
            { nome: "awake", number: 0 },
            { nome: "rem", number: 0 },
            { nome: "light", number: 0 },
            { nome: "deep", number: 0 },
        ];
    }

    // Inizializza un oggetto per contare le fasi del sonno
    const sleepStagesCount: SleepStagesInterface = {
        awake: 0,
        rem: 0,
        light: 0,
        deep: 0,
    };

    // Itera attraverso i dati e conta le occorrenze di ciascuna fase del sonno

    sleepStagesCount.awake = dataArray.filter(e => e.stage === "Awake").length;
    sleepStagesCount.rem = dataArray.filter(e => e.stage === "REM").length;
    sleepStagesCount.light = dataArray.filter(e => e.stage === "Light").length;
    sleepStagesCount.deep = dataArray.filter(e => e.stage === "Deep").length;

    return [
        { nome: "Deep", number: sleepStagesCount.deep },
        { nome: "Light", number: sleepStagesCount.light },
        { nome: "REM", number: sleepStagesCount.rem },
        { nome: "Awake", number: sleepStagesCount.awake },
    ];
}
