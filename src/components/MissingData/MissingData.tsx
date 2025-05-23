import React, { useState } from "react";
import { uploadFile } from "../../scripts/uploadFile";

type MissingDataProps = {
    idUtente: number;
    dataRiferimento: string;
};

function MissingData(props: MissingDataProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const fileInput = document.getElementById(
            "inputGroupFile04",
        ) as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (!file) {
            alert("Nessun file selezionato");
            return;
        }

        // 1. Controllo che sia un file CSV
        const fileName = file.name.toLowerCase();
        const isCsv = fileName.endsWith(".csv") || file.type === "text/csv";
        if (!isCsv) {
            alert("Il file deve essere in formato CSV");
            fileInput.value = "";
            return;
        }

        // 2. Leggi il file come testo per controllare le prime due righe
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
        if (lines.length < 2) {
            alert(
                "Il file deve contenere almeno due righe (intestazione e almeno un dato)",
            );
            fileInput.value = "";
            return;
        }
        // 2.1 Controllo intestazione
        if (lines[0].trim() !== "Timestamp,Sleep Stage") {
            alert(
                "L'intestazione del file deve essere esattamente: Timestamp,Sleep Stage",
            );
            fileInput.value = "";
            return;
        }
        // 3. Controllo data della seconda riga
        const firstDataRow = lines[1].split(",");
        if (firstDataRow.length < 2) {
            alert("La seconda riga non è valida (manca uno dei due campi)");
            fileInput.value = "";
            return;
        }
        const timestamp = firstDataRow[0].trim();
        // props.dataRiferimento è in formato YYYY-MM-DD
        const fileDate = timestamp.split(" ")[0];
        if (fileDate !== props.dataRiferimento) {
            alert(
                `La data del primo campo della seconda riga (${fileDate}) non corrisponde alla data selezionata (${props.dataRiferimento})`,
            );
            fileInput.value = "";
            return;
        }

        setIsUploading(true); // Imposta lo stato di caricamento

        try {
            await uploadFile(file, props.dataRiferimento, props.idUtente);
            setTimeout(() => {
                setIsUploading(false); // Ripristina lo stato di caricamento
                window.location.reload(); // Ricarica la pagina solo quando il DB ha finito
            }, 3000);
        } catch (error) {
            console.error("Errore durante l'upload:", error);
            alert("Errore durante l'upload del file");
        }
    };

    return (
        <div>
            <h1>Nessun dato presente</h1>
            <div className="alert alert-info mt-3 pt-3" role="alert">
                <div className="row gy-2 justify-content-between">
                    <div className="col-12">
                        <h3>Carica il tuo file qui</h3>
                    </div>
                    <form className="form-group col-12">
                        <div className="input-group">
                            <input
                                type="file"
                                className="form-control"
                                id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04"
                                aria-label="Upload"
                                style={{
                                    transition: "all 0.2s ease",
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                    e.currentTarget.style.transform =
                                        "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                                required
                            />
                            <button
                                className="btn btn-primary d-flex align-items-center justify-content-center"
                                type="button"
                                id="inputGroupFileAddon04"
                                style={{
                                    transition: "all 0.2s ease",
                                    backgroundColor: "#18c599",
                                    position: "relative",
                                }}
                                onClick={handleUpload}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                    e.currentTarget.style.transform =
                                        "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <span
                                        className="spinner-border spinner-border-sm text-light"
                                        role="status"
                                    />
                                ) : (
                                    <i className="bi bi-file-earmark-arrow-up"></i>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MissingData;
