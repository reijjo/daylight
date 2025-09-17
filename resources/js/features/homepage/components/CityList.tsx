import { DaylightData } from "../../../utils/types";

interface CityListProps {
    savedCities: DaylightData[];
}

const CityList = ({ savedCities }: CityListProps) => {
    return (
        <div className="flex flex-col items-center gap-4 border border-white/20">
            {savedCities.map((city) => (
                <p key={city.id}>{city.city}</p>
            ))}
        </div>
    );
};

export default CityList;
