import CreateStackedColumnPlot from "../Chart/BarChart/StackedColumnPlot";

type GraficoBarreProps = {
    sleepDataWeek: any[][]; // Sostituisci `any` con il tipo corretto se disponibile
    colors: string[];
    stageOrder: string[];
    settMese: boolean;
    setSettMese: (value: boolean) => void;
};

function GraficoBarre({
    sleepDataWeek,
    colors,
    stageOrder,
    settMese,
    setSettMese,
}: GraficoBarreProps) {
    return (
        <div>
            <div className="row px-5 mt-2 mb-4">
                <div className="col col-sm-6 col-12 my-2 my-sm-0 mx-sm-0 mx-2">
                    <button
                        onClick={() => setSettMese(true)}
                        className="btn px-4"
                        style={{
                            backgroundColor: "#14bdad",
                            color: "white",
                            transition: "all 0.2s ease",
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 4px 8px rgba(0, 0, 0, 0.3)";
                            e.currentTarget.style.transform = "scale(0.95)";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        SETTIMANA
                    </button>
                </div>
                <div className="col col-sm-6 col-12 my-2 my-sm-0 mx-sm-0 mx-2">
                    <button
                        onClick={() => setSettMese(false)}
                        className="btn px-5"
                        style={{
                            backgroundColor: "#14bdad",
                            color: "white",
                            transition: "all 0.2s ease",
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 4px 8px rgba(0, 0, 0, 0.3)";
                            e.currentTarget.style.transform = "scale(0.95)";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        MESE
                    </button>
                </div>
            </div>
            <CreateStackedColumnPlot
                dati={sleepDataWeek || []}
                colors={colors}
                ordine={stageOrder}
                settMese={settMese}
            />
        </div>
    );
}

export default GraficoBarre;
