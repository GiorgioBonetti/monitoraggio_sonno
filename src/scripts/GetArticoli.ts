import { ArticoloType, articoli } from "./dataConsigliArticoli";

const allArticoli: ArticoloType[] = articoli; // Assumes esportazione named 'articoli'

export function getArticoli(data:string): ArticoloType[] {
    const dayOfWeek = new Date(data).getDay(); // 0 (Sunday) to 6 (Saturday)
    const startIndex = (dayOfWeek * 4) % allArticoli.length;
    return allArticoli.slice(startIndex, startIndex + 4);
}
