// import Information from "../Information/Information.tsx";
import { ConsiglioType } from "../../App.tsx";
import Card from "../Card/Card.tsx";
// import "./Consiglio.css";

type ConsiglioProps = {
    articolo: ConsiglioType;
};

function Consiglio(props: ConsiglioProps) {
    return (
        <div className="card border-4 rounded-4 mt-3">
            <Card>
                <div className="consiglio row">
                    <h3 className="title col-12 pt-1 px-md-5 px-3">
                        {props.articolo.titolo}
                    </h3>
                </div>
            </Card>
        </div>
    );
}

export default Consiglio;
