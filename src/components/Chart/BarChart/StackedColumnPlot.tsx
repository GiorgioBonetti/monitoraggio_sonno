import { Column } from "@antv/g2plot";
import { useEffect } from "react";
import { SleepDataInterface } from "../../../scripts/extractData";
import { getDatiDivisi } from "../../../scripts/datiGrafico";

type GraphProps = {
    dati: SleepDataInterface[][];
    colors: string[];
    ordine: string[];
    settMese: boolean;
};

function CreateStackedColumnPlot(props: GraphProps) {
    useEffect(() => {
        const dati = getDatiDivisi(props.dati);

        const stackedColumnPlot = new Column("container3", {
            isStack: true,
            data: dati,
            xField: "date",
            yField: "valore",
            seriesField: "stage", // in base a che valori dividerlo
            color: [...props.colors].reverse(), // Crea una copia prima di invertire
            legend: false,
            meta: {
                valore: {
                    // dove trasformo i minuti in ore
                    formatter: (v: number) =>
                        `${Math.floor(v / 60)} h  ${v % 60} min`,
                },
                stage: {
                    // ordine in cui mettere i dati
                    type: "cat",
                    values: [...props.ordine].reverse(), // Crea una copia prima di invertire
                },
                date: {
                    type: "cat",
                    // in pratica, fa in modo che, se scelgo la settimana, vengano renderizzate esattamente 7 colonne
                    values: (() => {
                        // Estrai tutte le date uniche dai dati e ordinale in ordine crescente
                        const allDates = [
                            ...new Set(dati.map((item) => item.date)),
                        ].sort(
                            (a, b) =>
                                new Date(a).getTime() - new Date(b).getTime(),
                        );

                        // Estrai tutte le date uniche dai dati e ordinale in ordine crescente
                        const startDate = new Date(allDates[0]);
                        const endDate = new Date(allDates[allDates.length - 1]);

                        // Genera un intervallo completo di date tra la data di inizio e la data di fine
                        const fullDateRange = [];
                        for (
                            let d = startDate;
                            d <= endDate;
                            d.setDate(d.getDate() + 1)
                        ) {
                            // Aggiungi ogni data nel formato ISO (YYYY-MM-DD) all'intervallo
                            fullDateRange.push(
                                new Date(d).toISOString().split("T")[0],
                            );
                        }

                        if (props.settMese) {
                            // Assicurati che il fullDateRange contenga sempre 7 date
                            if (fullDateRange.length < 7 && fullDateRange[0]) {
                                const missingDatesCount =
                                    7 - fullDateRange.length;
                                const firstDate = new Date(fullDateRange[0]);
                                for (let i = 1; i <= missingDatesCount; i++) {
                                    const newDate = new Date(
                                        firstDate.getTime(),
                                    );
                                    newDate.setDate(newDate.getDate() - i);
                                    fullDateRange.unshift(
                                        newDate.toISOString().split("T")[0],
                                    );
                                }
                            }
                        } else {
                            // Assicurati che il fullDateRange contenga sempre 30 date
                            if (fullDateRange.length < 30 && fullDateRange[0]) {
                                const missingDatesCount =
                                    30 - fullDateRange.length;
                                const firstDate = new Date(fullDateRange[0]);
                                for (let i = 1; i <= missingDatesCount; i++) {
                                    const newDate = new Date(
                                        firstDate.getTime(),
                                    );
                                    newDate.setDate(newDate.getDate() - i);
                                    fullDateRange.unshift(
                                        newDate.toISOString().split("T")[0],
                                    );
                                }
                            }
                        }

                        // Restituisci l'intero intervallo di date, assicurandoti che le date mancanti siano riempite
                        return fullDateRange;
                    })(),
                },
            },
        });
        // render del grafico
        stackedColumnPlot.render();
        return () => {
            stackedColumnPlot.destroy(); // distrugge il grafico quando il componente viene smontato
        };
    }, [props.dati, props.settMese]);

    return (
        <div>
            {/* dando lo stesso id della new Column che crea lo useEffect sopra, questo div viene rimpiazzato dal grafico */}
            <div id="container3" style={{ padding: "5px" }}></div>
        </div>
    );
}

export default CreateStackedColumnPlot;
