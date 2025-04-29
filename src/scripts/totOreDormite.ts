import { SleepDataInterface } from "./extractData.ts";


export function extractOreDormite(dataArray: SleepDataInterface[]): string[] {
    if (!dataArray) {
        return []
    }
    else {

        // Calcola minuti dormiti (1 record = 1 minuto)
        const totalSleepMinutes = dataArray.filter((record) => record.stage !== "Awake").length;;

        // Converti in ore e minuti
        const hours = Math.floor(totalSleepMinutes / 60);
        const minutes = totalSleepMinutes % 60;

        return [hours + "", minutes + ""]

    }
}

export function extractOreLetto(dataArray: SleepDataInterface[]): string[] {
    if (!dataArray) {
        return []
    }
    else {
        // Calcola minuti dormiti (1 record = 1 minuto)
        const totalSleepMinutes = dataArray.length;;

        // Converti in ore e minuti
        const hours = Math.floor(totalSleepMinutes / 60);
        const minutes = totalSleepMinutes % 60;

        return [hours + "", minutes + ""]

    }
}