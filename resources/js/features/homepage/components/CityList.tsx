import { Message } from "../../../components/ui/Message";
import { DaylightData } from "../../../utils/types";

interface CityListProps {
    savedCities: DaylightData[];
    msg: string | null;
    dataMsg: string | null;
}

const CityList = ({ savedCities, msg, dataMsg }: CityListProps) => {
    return (
        <div className="flex flex-col items-center gap-4 border border-white/20">
            {savedCities.map((city) => (
                <p key={city.id}>{city.city}</p>
            ))}
            {savedCities.length >= 6 && msg && (
                <Message message={msg as string} type="info" />
            )}

            {dataMsg && <Message message={dataMsg} type="success" />}
        </div>
    );
};

export default CityList;
