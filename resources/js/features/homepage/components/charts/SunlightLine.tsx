import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { CHART_COLORS, DaylightData } from "../../../../utils";
import { CustomTooltip } from "./CustomTooltip";
import { transformYearDataForChart, sampleChartData } from "./chartUtils";

interface SunlightLineProps {
    data: DaylightData[];
    step: number;
}

export const SunlightLine = ({ data, step }: SunlightLineProps) => {
    if (data.length === 0) return null;

    let chartData = transformYearDataForChart(data);

    if (step > 1) {
        chartData = sampleChartData(chartData, step);
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" domain={[0, 1400]} />
                <Tooltip content={<CustomTooltip colors={CHART_COLORS} />} />
                <Legend />
                {data.map((city, index) => (
                    <Line
                        type="monotone"
                        key={city.city}
                        dataKey={city.city}
                        stroke={CHART_COLORS[index % CHART_COLORS.length]}
                        strokeWidth={1}
                        dot={{ r: 2 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
