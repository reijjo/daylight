import { DaylightData } from "../../../../utils/types";
import close from "../../../../../assets/images/close.png";

interface CitylistItemProps {
    city: DaylightData;
    removeCity: (id: number) => void;
}

export const CityListItem = ({ city, removeCity }: CitylistItemProps) => {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/30 bg-black/10 px-8 py-4 backdrop-blur-md shadow-xl shadow-white/10 relative">
            <div className="text-center">
                <p>Daylight today</p>
                <p>{city.daylength}</p>
            </div>
            <h3 className="uppercase text-3xl">{city.city}</h3>
            <div className="flex items-center gap-4 text-sm">
                <div>
                    <p>{city.sunrise}</p>
                    <p className="text-end">From</p>
                </div>
                <p>-</p>
                <div>
                    <p>{city.sunset}</p>
                    <p>To</p>
                </div>
            </div>
            <button
                type="button"
                aria-label={`Remove ${city.city}`}
                onClick={() => removeCity(city.id)}
                className="absolute top-2 right-2 cursor-pointer bg-white/50 p-1 grid place-items-center rounded-full hover:scale-110 active:scale-90 transition-all duration-150 ease-in"
            >
                <img
                    src={close}
                    title="close"
                    alt="close"
                    className="color-white h-4 w-4"
                />
            </button>
        </div>
    );
};
