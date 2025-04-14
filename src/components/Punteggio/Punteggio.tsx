
import PunteggioInformation from "./Punteggio-information/Punteggio-information.tsx";
// import "./Punteggio.css";
import Information from "../Information/Information.tsx";

type PunteggioProps = {
    punteggio : number;
    testo : string;
};

function Punteggio(props: PunteggioProps) {
    //Render
    return (
        <div className=" row">
            <h1 className="col-11">
                {props.punteggio} - {props.testo}
            </h1>
            <div className="info col-1 d-flex align-items-center">
                <Information >
                    <PunteggioInformation />
                </Information>
            </div>
        </div>
    );
}

export default Punteggio;
