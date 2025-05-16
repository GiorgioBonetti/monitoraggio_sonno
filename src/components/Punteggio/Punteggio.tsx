import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
import Popup from "../Popup/Popup.tsx";

type PunteggioProps = {
    punteggio: number;
    testo: string;
};

function Punteggio(props: PunteggioProps) {
    //Render
    return (
        <div className="d-flex align-items-center">
            <h1 className="col-11 pt-2">
                {props.punteggio} - {props.testo}
            </h1>
            <div className="col-1">
                <Popup
                    title="Informazioni sul Punteggio del Sonno"
                    modalId="PunteggioSonno"
                >
                    {" "}
                    <PunteggioInformation />
                </Popup>
            </div>
        </div>
    );
}

export default Punteggio;
