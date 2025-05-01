// import Information from "../Information/Information.tsx";
import { ConsiglioType } from "../../App.tsx";
import Card from "../Card/Card.tsx";
// import "./Consiglio.css";

type ConsiglioProps = {
    articolo: ConsiglioType
}


function Consiglio(props: ConsiglioProps) {
    return (
        <div className="card">
            <Card>
                <div className="consiglio row">
                    <h2 className="title col-12 d-flex align-items-center">{props.articolo.titolo}</h2>

                </div>
            </Card>
        </div>
    );
}

export default Consiglio;