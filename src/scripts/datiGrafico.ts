import { SleepDataInterface } from "./extractData";

export type DatiGraficoType =
    {
        groupId: string,
        date: string,
        valore: number,
        stage: string
    }

export const getDatiDivisi = (data: SleepDataInterface[][]): DatiGraficoType[] => {
    const result: DatiGraficoType[] = [];

    console.log("Data received in getDatiDivisi:", data);

    data.forEach((group) => {
        const groupId =  group[0]?.date
        const date = group[0]?.date || '';
        const stageCount: { [stage: string]: number } = {};

        group.forEach(item => {
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
