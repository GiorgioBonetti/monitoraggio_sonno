import { SleepDataInterface } from "./extractData";

export type DatiGraficoType = {
    groupId: string;
    date: string;
    valore: number;
    stage: string;
};

export const getDatiDivisi = (
    data: SleepDataInterface[][],
): DatiGraficoType[] => {
    const result: DatiGraficoType[] = [];

    // per ogni giorno della settimana / mese
    data.forEach((group) => {
        const groupId = group[0]?.date;

        const startOra = Number(group[0]?.timestamp?.substring(0, 2));
        let date = group[0]?.date || "";
        if (startOra >= 0 && startOra <= 12) {
            // vado indietro di un giorno su date nel caso in cui la notte sia partita dopo la mezzanotte
            date = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0];
        }

        // conta quante volte ogni stage appare
        const stageCount: { [stage: string]: number } = {};

        group.forEach((item) => {
            stageCount[item.stage] = (stageCount[item.stage] || 0) + 1;
        });

        // ogni giorno viene suddiviso nelle sue 4 fasi (o 3, se Awake appare zero volte, quindi non compare)
        for (const stage in stageCount) {
            result.push({
                groupId,
                date,
                stage,
                valore: stageCount[stage],
            });
        }
    });

    return result;
};
