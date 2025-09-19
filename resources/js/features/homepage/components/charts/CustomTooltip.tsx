interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    colors: string[];
}

export const CustomTooltip = ({
    active,
    payload,
    label,
    colors,
}: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white p-2 rounded shadow-lg flex flex-col">
                <p className="font-semibold text-center mb-1">Date: {label}</p>
                {payload.map((p: any, i: number) => {
                    const hours = Math.floor(p.value / 60);
                    const minutes = Math.round(p.value % 60);
                    return (
                        <div
                            key={p.name}
                            className="flex justify-between gap-2"
                            style={{ color: colors[i % colors.length] }}
                        >
                            <p>{p.name}:</p>
                            <div className="flex gap-2">
                                <p>
                                    {hours}h {minutes}m
                                </p>
                                <p>({Math.floor(p.value)} minutes)</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};
