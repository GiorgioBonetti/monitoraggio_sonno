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
    dataArray.forEach((data) => {
        switch (data.stage) {
            case "Awake":
                sleepStagesCount.awake++;
                break;
            case "REM":
                sleepStagesCount.rem++;
                break;
            case "Light":
                sleepStagesCount.light++;
                break;
            case "Deep":
                sleepStagesCount.deep++;
                break;
            default:
                break;
        }
    });

    // adesso devo calcolare la percentuale di ciascuna fase del sonno
    const total =
        sleepStagesCount.awake +
        sleepStagesCount.rem +
        sleepStagesCount.light +
        sleepStagesCount.deep;

    // arrotondo le percentuali
    const sleepStagesPercentage: SleepStagesInterface = {
        awake: Math.round((sleepStagesCount.awake / total) * 100),
        rem: Math.round((sleepStagesCount.rem / total) * 100),
        light: Math.round((sleepStagesCount.light / total) * 100),
        deep: Math.round((sleepStagesCount.deep / total) * 100),
    };

    // Corregge la somma per assicurarsi che sia esattamente 100
    const percentageSum =
        sleepStagesPercentage.awake +
        sleepStagesPercentage.rem +
        sleepStagesPercentage.light +
        sleepStagesPercentage.deep;

    if (percentageSum !== 100) {
        const difference = 100 - percentageSum;
        sleepStagesPercentage.light += difference; // Aggiusta uno dei valori - scelgo light essendo il più comune
    }

    return [
        { nome: "awake", number: sleepStagesPercentage.awake },
        { nome: "rem", number: sleepStagesPercentage.rem },
        { nome: "light", number: sleepStagesPercentage.light },
        { nome: "deep", number: sleepStagesPercentage.deep },
    ];
}
