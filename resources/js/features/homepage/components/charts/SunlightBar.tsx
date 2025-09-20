import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import { sampleChartData, transformYearDataForChart } from "./chartUtils";
import { DaylightData, CHART_COLORS } from "@utils/index";
import { CustomTooltip } from "./CustomTooltip";

interface SunlightBarProps {
    data: DaylightData[];
    step: number;
}

export const SunlightBar = ({ data, step }: SunlightBarProps) => {
    if (data.length === 0) return null;

    let chartData = transformYearDataForChart(data);

    if (step > 1) {
        chartData = sampleChartData(chartData, step);
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" domain={[0, 1400]} />
                <Tooltip content={<CustomTooltip colors={CHART_COLORS} />} />
                <Legend />
                {data.map((city, index) => (
                    <Bar
                        key={city.city}
                        dataKey={city.city}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};
