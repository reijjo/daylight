import { CloseButton } from "../../../../components";
import { DaylightData } from "../../../../utils";

interface CitylistItemProps {
    city: DaylightData;
    removeCity: (id: number) => void;
}

export const CityListItem = ({ city, removeCity }: CitylistItemProps) => {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/30 bg-black/10 px-8 py-4 backdrop-blur-md shadow-xl shadow-white/10 relative text-sm">
            <div className="text-center">
                <p className="capitalize">Daylight today</p>
                <p>{city.daylength}</p>
            </div>
            <h3 className="uppercase text-xl">{city.city}</h3>
            <div className="flex items-center gap-4 text-sm text-end">
                <div>
                    <p>{city.sunrise}</p>
                    <p>Sunrise</p>
                </div>
                <p>-</p>
                <div className="text-start">
                    <p>{city.sunset}</p>
                    <p>Sunset</p>
                </div>
            </div>
            <CloseButton
                onClick={() => removeCity(city.id)}
                ariaLabel={`Remove ${city.city}`}
            />
        </div>
    );
};
