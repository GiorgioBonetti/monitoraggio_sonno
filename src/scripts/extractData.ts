import Papa from "papaparse";

export interface SleepDataInterface {
    forEach(arg0: ({ stage }: { stage: any }) => void): unknown;

    date: string; // Data del dato di sonno
    timestamp: string; // Ora del dato di sonno
    stage: string; // Fase del sonno (es. Light, Deep, REM, Awake)
}

// Funzione asincrona per estrarre i dati da un file CSV
export async function extractData(
    filePath: string,
): Promise<SleepDataInterface[]> {
    // Effettua una richiesta HTTP per ottenere il file CSV
    const response = await fetch(filePath);

    // Controlla se la risposta è valida, altrimenti lancia un errore
    if (!response.ok) {
        throw new Error("Errore nel caricamento del file CSV");
    }

    // Legge il contenuto del file CSV come testo
    const csvText = await response.text();

    // Restituisce una Promise che esegue il parsing del CSV
    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true, // Indica che la prima riga del CSV contiene i nomi delle colonne
            skipEmptyLines: true, // Salta le righe vuote nel file CSV
            complete: (result) => {
                try {
                    const transformedData: SleepDataInterface[] =
                        result.data.map((entry: any) => {
                            const [date, time] = entry.Timestamp.split(" ");
                            return {
                                date,
                                timestamp: time,
                                stage: entry["Sleep Stage"] || "Unknown",
                                forEach: function (
                                    callback: ({
                                        stage,
                                    }: {
                                        stage: any;
                                    }) => void,
                                ): void {
                                    callback({ stage: this.stage });
                                },
                            };
                        });
                    resolve(transformedData);
                } catch (error) {
                    reject(
                        "Errore durante la trasformazione dei dati: " + error,
                    );
                }
            },
            error: (error: any) => reject(error), // Rifiuta la Promise in caso di errore
        });
    });
}
