import { DaylightData } from "../../../../utils/types";
import { useExampleCity } from "../../hooks/useExampleCity";
import { Suspense, useEffect } from "react";
import { CityListItem } from "./CityListItem";

interface CityListProps {
    savedCities: DaylightData[];
    setSavedCities: React.Dispatch<React.SetStateAction<DaylightData[]>>;
    removeCity: (id: number) => void;
    removeAllCities: () => void;
}

const CityList = ({
    savedCities,
    setSavedCities,
    removeCity,
}: CityListProps) => {
    const { exampleDaylight } = useExampleCity();

    useEffect(() => {
        if (exampleDaylight && savedCities.length === 0) {
            setSavedCities([exampleDaylight]);
        }
    }, [exampleDaylight]);

    return (
        <div className="flex items-center justify-center flex-wrap gap-4 w-9/10">
            {savedCities.map((city) => (
                <CityListItem
                    key={city.id}
                    city={city}
                    removeCity={removeCity}
                />
            ))}
        </div>
    );
};

export default CityList;
