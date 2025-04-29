// import "./PieGraph.css";
import { SleepStageType } from "../../scripts/extractSleepStages";
import { useEffect } from "react";
import { Pie } from "@antv/g2plot";

type PieGraphProps = {
    data: SleepStageType[];
    colors: string[];
    ordine: string[];
};

function PieGraph(props: PieGraphProps) {
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
                formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            },
            legend: false,
            statistic: {
                title: false,
                content: {
                    // 👇 Funzione personalizzata per il contenuto centrale
                    customHtml: (container, view, datum, data) => {
                        if (datum) {
                          return `
                            <div style="text-align: center;">
                              <div>${datum.nome}</div>
                              <div>${datum.number}%</div>
                            </div>`;
                        }
                      }
                      
                },
            },
            interactions: [
                { type: "element-active" },
                { type: "pie-statistic-active" }, // 👉 dinamica centrale!
            ],
        });
        piePlot.render();
        return () => {
            piePlot.destroy();
        };
    }, [props.data]);

    return <div id="contenitore" style={{ padding: "5px" }}></div>;
}

export default PieGraph;
