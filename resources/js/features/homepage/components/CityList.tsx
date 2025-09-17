import { useQuery } from "@tanstack/react-query";
import { DaylightData } from "../../../utils/types";
import { getCities } from "../api/daylightApi";
import { useExampleCity } from "../hooks/useExampleCity";
import { Suspense, useEffect } from "react";

interface CityListProps {
    savedCities: DaylightData[];
    setSavedCities: React.Dispatch<React.SetStateAction<DaylightData[]>>;
    removeCity: (id: number) => void;
    removeAllCities: () => void;
}

const CityListItem = ({
    city,
    removeCity,
}: {
    city?: DaylightData;
    removeCity: (id: number) => void;
}) => {
    console.log("city", city);
    return (
        // <Suspense
        //     fallback={
        //         <div className="w-full border-amber-200 border-8">
        //             Loading cities...
        //         </div>
        //     }
        // >
        <div
            className="flex flex-col items-center gap-4 border border-white/50 rounded-xl p-4 bg-linear-to-br from-white/20 via-transparent to-black/20 backdrop-blur-md shadow-lg shadow-white/10 relative"
            key={city?.id}
        >
            <h3 className="uppercase">{city?.city}</h3>
            <p>Sunrise {city?.sunrise}</p>
            <p>Sunset {city?.sunset}</p>
            <p>Daylight {city?.daylength}</p>
            <button onClick={() => console.log("cvity id", city?.id)}>
                Remove
            </button>
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
                // <Suspense
                //     fallback={
                //         <div className="w-full border-amber-200 border-8">
                //             Loading cities...
                //         </div>
                //     }
                // >
                <CityListItem city={city} removeCity={removeCity} />
                // </Suspense>
            ))}
        </div>
    );
};

export default CityList;
