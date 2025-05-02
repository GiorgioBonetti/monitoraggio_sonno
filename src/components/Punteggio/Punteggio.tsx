import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
// import "./Punteggio.css";
// import Information from "../Information/Information.tsx";
import Popup from "../Popup/Popup.tsx";
// import Information from "../Information/Information.tsx";

type PunteggioProps = {
    punteggio: number;
    testo: string;
};

function Punteggio(props: PunteggioProps) {
    //Render
    return (
        <div className="row pt-2 ">
            <h1 className="col-11">
                {props.punteggio} - {props.testo}
            </h1>
            <div className="col-1 d-flex align-items-center">
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
