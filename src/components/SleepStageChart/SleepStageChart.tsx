import { Scatter } from "@antv/g2plot";
import { useEffect } from "react";
import { SleepData } from "../../scripts/extractData";

type GraphProps = {
    dati: SleepData[];
    colors: string[];
};
function CreateScatterPlot(props: GraphProps) {

    useEffect(() => {
        console.table("TEST" + props.dati);
        const scatterPlot = new Scatter("container", {
            data: props.dati,
            xField: "timestamp",
            yField: "stage",
            size: 5,
            color: props.colors,
            colorField: "stage",
            shape: "circle",
            pointStyle: {
                fillOpacity: 0.8,
                stroke: null, // Removed stroke
            },
            legend: false,
            yAxis: {
                nice: true,
                line: {
                    style: {
                        stroke: "#aaa",
                    },
                },
            },
        });
        scatterPlot.render();
        return () => {
            scatterPlot.destroy();
        };
    }, [props.dati]);

    return (
        <div>
            <div id="container" style={{ padding: "5px", width: "90vw" }}></div>
        </div>
    );
}
export default CreateScatterPlot;
