import supabase from "./Supabase";
import { User } from "../contesto/UserContext";

export async function ControllaUser(user: User): Promise<boolean> {
    if (user && user.id) {
        try {
            const { data: ute } = await supabase
                .from("Utenti")
                .select("*")
                .eq("id", user.id);

            if (ute?.length === 1) {
                if (user.token === ute[0].token) {
                    return true; // Token valido
                }
            }
            return false; // Password errata o utente non trovato
        } catch {
            return false; // Errore durante il recupero dei dati
        }
    } else {
        return false; // Utente non valido
    }
}
