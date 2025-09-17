import { DaylightData } from "../../../utils/types";
import { useExampleCity } from "../hooks/useExampleCity";
import { useEffect } from "react";

interface CityListProps {
    savedCities: DaylightData[];
    setSavedCities: React.Dispatch<React.SetStateAction<DaylightData[]>>;
    removeCity: (id: number) => void;
    removeAllCities: () => void;
}

interface CitylistItemProps {
    city: DaylightData;
    removeCity: (id: number) => void;
}

const CityListItem = ({ city, removeCity }: CitylistItemProps) => {
    return (
        <div className="flex flex-col items-center gap-4 border border-white/50 rounded-xl p-4 bg-linear-to-br from-white/20 via-transparent to-black/20 backdrop-blur-md shadow-lg shadow-white/10 relative">
            <h3 className="uppercase">{city?.city}</h3>
            <p>Sunrise {city?.sunrise}</p>
            <p>Sunset {city?.sunset}</p>
            <p>Daylight {city?.daylength}</p>
            <button onClick={() => removeCity(city?.id)}>Remove</button>
        </div>
    );
};

const CityList = ({
    savedCities,
    setSavedCities,
    removeCity,
    removeAllCities,
}: CityListProps) => {
    const { exampleDaylight } = useExampleCity();

    useEffect(() => {
        if (exampleDaylight && savedCities.length === 0) {
            setSavedCities([exampleDaylight]);
        }
    }, [exampleDaylight]);

    return (
        <div className="flex flex-col items-center gap-4">
            {savedCities.map((city) => (
                <CityListItem
                    key={city?.id}
                    city={city}
                    removeCity={removeCity}
                />
            ))}
        </div>
    );
};

export default CityList;
