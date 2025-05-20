import { SleepStageType } from "../../../scripts/extractSleepStages";
import { useEffect } from "react";
import { Pie } from "@antv/g2plot";

type PieGraphProps = {
    data: SleepStageType[];
    colors: string[];
    ordine: string[];
};

function PieGraph(props: PieGraphProps) {
    // questo componente calcola da solo la percentuale di ogni fase di sonno
    useEffect(() => {
        const piePlot = new Pie("contenitore", {
            appendPadding: 0,

            color: props.colors,
            data: props.data,
            angleField: "number",
            colorField: "nome",
            radius: 1,
            innerRadius: 0.64,
            label: {
                type: "inner",
                offset: "-50%",
                autoRotate: false,
                style: { textAlign: "center" },
                formatter: (
                    { percent }, // Funzione per far vedere la percentuale solo se è maggiore di 1.5%
                ) =>
                    percent && percent * 100 > 1.5
                        ? `${(percent * 100).toFixed(0)}%`
                        : "",
            },
            legend: false,
            statistic: {
                title: false,
                content: {
                    // Funzione personalizzata per il contenuto centrale
                    customHtml: (_container, _view, datum) => {
                        if (datum) {
                            return `<div style="text-align: center;">
                                  <div>${datum.nome}</div>
                                  <div>${Math.floor(datum.number / 60) !== 0 ? Math.floor(datum.number / 60) + "h" : ""} ${Math.floor(datum.number % 60)} min</div>
                                </div>`;
                        }
                        return ""; // Restituisce una stringa vuota se datum è undefined
                    },
                },
            },
            interactions: [
                { type: "element-active" },
                { type: "pie-statistic-active" },
            ],
        });
        piePlot.render();
        return () => {
            piePlot.destroy(); // distrugge il grafico quando il componente viene smontato
        };
    }, [props.data]);
    // dando lo stesso id della new Column che crea lo useEffect sopra, questo div viene rimpiazzato dal grafico
    return <div id="contenitore"></div>;
}

export default PieGraph;
