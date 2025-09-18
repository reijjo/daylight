import { DaylightData } from "../../../../utils/types";

export interface ChartRow {
    date: string;
    [city: string]: number | string;
}

export const transformYearDataForChart = (
    cities: DaylightData[]
): ChartRow[] => {
    if (cities.length === 0) return [];

    const daysCount = Math.min(...cities.map((c) => c.year.data.length));
    const chartData: ChartRow[] = [];

    for (let i = 0; i < daysCount; i++) {
        const row: ChartRow = { date: cities[0].year.data[i].date };
        cities.forEach((city) => {
            row[city.city] = city.year.data[i].daylength_minutes;
        });
        chartData.push(row);
    }
    return chartData;
};

export const sampleChartData = (data: ChartRow[], step = 7): ChartRow[] => {
    return data.filter((_, index) => index % step === 0);
};
