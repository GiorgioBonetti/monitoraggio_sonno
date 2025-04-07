import "./PunteggioInformation.css";

function PunteggioInformation() {
    return (
        <div className="PunteggioInformation">
            <p>80-100: Ottima qualità del sonno</p>
            <p>60-79: Qualità del sonno buona ma migliorabile</p>
            <p>
                40-59: Sonno insufficiente, con margini di miglioramento
                significativi
            </p>
            <p>
                0-39: Sonno scarso, è necessario un intervento per migliorare la
                qualità
            </p>
        </div>
    );
}

export default PunteggioInformation;
