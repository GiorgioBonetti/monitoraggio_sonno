
import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
import "./Punteggio.css";
import Information from "../Information/Information.tsx";

type PunteggioProps = {
    punteggio : number;
    testo : string;
};

function Punteggio(props: PunteggioProps) {
    //Render
    return (
        <div className="banner">

            <h1>
                {props.punteggio} - {props.testo}
            </h1>
            <div className="info">
                <Information >
                    <PunteggioInformation />
                </Information>
            </div>
        </div>
    );
}

export default Punteggio;
