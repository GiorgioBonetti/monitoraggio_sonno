import { SleepDataInterface } from "./extractData.ts";


export function extractOreDormite(dataArray: SleepDataInterface[]): string[] {
    if (!dataArray) {
        console.error("L'array passato è nullo");
        return []
    }
    else {

       
        // Calcola minuti dormiti (1 record = 1 minuto)
        const totalSleepMinutes = dataArray.length;

        // Converti in ore e minuti
        const hours = Math.floor(totalSleepMinutes / 60);
        const minutes = totalSleepMinutes % 60;

        return [hours + "", minutes + ""]

    }
}