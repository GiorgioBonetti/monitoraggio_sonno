
import "./PieGraph.css";
import { SleepStageType } from "../../scripts/extractSleepStages";
import { useEffect } from "react";
import { Pie } from '@antv/g2plot';

type PieGraphProps = {
    data: SleepStageType[];
    colors: string[];
};

function PieGraph(props: PieGraphProps) {

    useEffect(() => {
        const piePlot = new Pie("container", {
            appendPadding: 0,
            
            color: props.colors,
            data: props.data,
            angleField: 'number',
            colorField: 'nome',
            radius: 1,
            innerRadius: 0.64,
            label: {
                type: 'inner',
                offset: '-50%',
                autoRotate: false,
                style: { textAlign: 'center' },
                formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            },
            legend: false,
            statistic: {
                title: false,
                content: {
                  content: '',
                },
              },
            
            
        });
        piePlot.render();
        return () => {
            piePlot.destroy();
        };
    }, [props.data]);

    return (
            <div id="container" style={{ padding: "5px",   width: "300px"}}></div>
            

    );
}
export default PieGraph;
