import { ConsiglioType } from "../../scripts/dataConsigliArticoli.ts";
import Card from "../Card/Card.tsx";

type ConsiglioProps = {
    articolo: ConsiglioType;
};

function Consiglio(props: ConsiglioProps) {
    return (
        <div>
            <h1>Consigli</h1>
            <div className="card border-4 rounded-4 mt-3">
                <Card>
                    <div className="consiglio row">
                        <h3 className="title col-12 pt-1 px-md-5 px-3">
                            {props.articolo.titolo}
                        </h3>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Consiglio;
