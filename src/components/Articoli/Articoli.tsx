import { useState } from "react";

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
            <div
                id="articoliCarousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="9999999" // su bootstrap non esiste false
                style={{ borderColor: "rgba(57,79,225,0.67)" }}
            >
                <div className="carousel-indicators">
                    {articoli.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            data-bs-target="#articoliCarousel"
                            data-bs-slide-to={idx}
                            className={idx === 0 ? "active" : ""}
                            aria-current={idx === 0 ? "true" : undefined}
                            aria-label={`Slide ${idx + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner ">
                    {articoli.map((articolo, idx) => {
                        const [showBody, setShowBody] = useState(false);
                        return (
                            <div
                                key={articolo.target}
                                className={`carousel-item${idx === 0 ? " active" : ""}`}
                            >
                                <img
                                    src="../../../public/immagineArticolo.jpg"
                                    className="d-block w-100 rounded-4"
                                    alt="..."
                                    style={{
                                        objectFit: "cover",
                                        height: "400px",
                                        borderColor: "rgba(57,79,225,0.67)",
                                    }}
                                />
                                <div
                                    className={`carousel-caption d-none d-md-block bg-dark ${showBody ? "bg-opacity-100" : "bg-opacity-75"} rounded-3 p-3`}
                                >
                                    <h5>{articolo.titolo}</h5>
                                    {showBody && (
                                        <hr className="border-3 border-light" />
                                    )}
                                    {showBody && (
                                        <div className="card-body rounded-3 p-1 my-2">
                                            <small>{articolo.testo}</small>
                                        </div>
                                    )}
                                    <button
                                        className={`btn mb-2 ${showBody ? "btn-outline-light" : "btn-primary"}`}
                                        onClick={() =>
                                            setShowBody((prev) => !prev)
                                        }
                                    >
                                        {showBody
                                            ? "Nascondi"
                                            : "Scopri di più"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#articoliCarousel"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Precedente</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#articoliCarousel"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Successivo</span>
                </button>
            </div>
        </div>
    );
}

export default Articoli;
