import Papa from "papaparse";
import supabase from "./Supabase";

interface databaseDati {
    night_reference: string;
    FkUtente: number;
    Timestamp: string;
    Sleep: string;
}

export async function uploadFile(file: File, dataRiferimento: string, FkUtente: number): Promise<void> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (result) => {
                try {
                    const transformedData: databaseDati[] = result.data.map((entry: any) => ({
                        night_reference: dataRiferimento,
                        FkUtente: FkUtente,
                        Timestamp: entry["Timestamp"],
                        Sleep: entry["Sleep Stage"],
                    }));

                    // Aspetta che tutti gli upload siano completati
                    await Promise.all(
                        transformedData.map((f) => uploadFileToServer(f))
                    );

                    resolve();
                } catch (error) {
                    console.error("Errore durante la trasformazione dei dati: " + error);
                    reject(error);
                }
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

export async function uploadFileToServer(riga: databaseDati) {
    const { error } = await supabase
        .from('dati')
        .insert([riga]);
    if (error) {
        throw error;
    }
}