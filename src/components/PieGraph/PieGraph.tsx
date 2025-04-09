import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";
import "./PieGraph.css";

type PieGraphProps = {
    data: { name: string; value: number }[];
    colors: string[];
};

function PieGraph(props: PieGraphProps) {
    return (
        <div className="container">
            <div className="grafico">
                <PieChart width={200} height={200} >
                    <Pie
                        data={props.data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        isAnimationActive={false}
                    >
                        {props.data.map((entry, index) => (
                            <Cell
                                key={`${index} ${entry}`}
                                fill={props.colors[index % props.colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="blocco">
                                        <div className="testo">
                                            {`${payload[0].name}`}{":"} {`${payload[0].value}%`}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                </PieChart>

            </div>
            <div className="legenda">
                <ul>
                    {props.data.map((entry, index) => (
                        <li  key={index} style={{color: props.colors[index % props.colors.length], fontSize: "30px", height:"50px" ,textAlign:"left", listStyleType:"square"}}>
                            <div className="piccolo">{entry.name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default PieGraph;
