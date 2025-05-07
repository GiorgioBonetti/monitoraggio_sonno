import Card from "../Card/Card";
import Articolo from "../Articolo/Articolo";
import ButtonArticolo from "../Articolo/button/ButtonArticolo";

type ArticoloType = {
    target: string;
    titolo: string;
    testo: string;
};

type ArticoliProps = {
    articoli: ArticoloType[];
};

function Articoli({ articoli }: ArticoliProps) {
    return (
        <div>
            <h1 className="py-1">Articoli</h1>
            {articoli.map((articolo) => (
                <div key={articolo.target} className="container my-3">
                    <div className="card border-4 rounded-4">
                        <Card>
                            <div className="text-start row">
                                <h2 className="col-10 col-md-10 col-sm-9">
                                    {articolo.titolo}
                                </h2>
                                <div className="col-1 offset-0 offset-sm-1">
                                    <ButtonArticolo target={articolo.target} />
                                </div>
                                {/* target serve a dare il componente su cui fare l'azione del bottone */}
                                <Articolo target={articolo.target}>
                                    <p className="pt-2">
                                        <small>{articolo.testo}</small>
                                    </p>
                                </Articolo>
                            </div>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Articoli;
