
import Papa from "papaparse";
import supabase from "./Supabase";


interface databaseDati {
    night_reference: string;
    FkUtente: number;
    Timestamp: string;
    Sleep: string;
}

export function uploadFile(file: File, dataRiferimento: string, FkUtente: number) {


    Papa.parse(file, {
        header: true, // Indica che la prima riga del CSV contiene i nomi delle colonne
        skipEmptyLines: true, // Salta le righe vuote nel file CSV
        complete: (result) => {
            try {
                const transformedData: databaseDati[] =
                    result.data.map((entry: any) => {
                        return {
                            night_reference: dataRiferimento,
                            FkUtente: FkUtente,
                            Timestamp: entry["Timestamp"],
                            Sleep: entry["Sleep Stage"],
                        };
                    });

                for (const f of transformedData) { 
                    uploadFileToServer(f);
                }

            }
            catch (error) {
                console.error("Errore durante la trasformazione dei dati: " + error);
            }
        },
    });

}

export async function uploadFileToServer(riga: databaseDati) {
    // Replace 'sleep_data' with your actual table name
    const { error } = await supabase
        .from('dati')
        .insert([riga]);
    if (error) {
        throw error;
    }
}