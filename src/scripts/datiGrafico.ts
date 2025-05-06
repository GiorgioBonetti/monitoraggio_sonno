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

    data.forEach((group) => {
        const groupId = group[0]?.date;

        const startOra = Number(group[0]?.timestamp?.substring(0, 2));
        let date = group[0]?.date || "";
        if (startOra >= 0 && startOra <= 12) {
            // vado indietro di un giorno su date nel caso in cui la notte sia partita dopo la mezzanotte
            const newDate = new Date(date);
            date = new Date(newDate.getTime() - 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0];
        }

        const stageCount: { [stage: string]: number } = {};

        group.forEach((item) => {
            stageCount[item.stage] = (stageCount[item.stage] || 0) + 1;
        });

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
