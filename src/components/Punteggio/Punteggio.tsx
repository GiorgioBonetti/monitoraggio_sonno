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
                <span
                    style={{
                        color:
                            props.punteggio >= 80
                                ? "blue"
                                : props.punteggio >= 60
                                  ? "rgb(37,188,105)"
                                  : props.punteggio >= 40
                                    ? "#e8ae00"
                                    : "#dc3545",
                    }}
                >
                    {props.punteggio}
                </span>
                {" - "}
                <span style={{ color: "inherit" }}>{props.testo}</span>
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
