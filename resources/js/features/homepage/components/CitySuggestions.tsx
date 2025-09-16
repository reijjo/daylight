import { FoundCity } from "../../../utils/types";

interface CitySuggestionsProps {
    suggestions: FoundCity[] | null;
    onCitySelect: (city: FoundCity) => void;
}

export const CitySuggestions = ({
    suggestions,
    onCitySelect,
}: CitySuggestionsProps) => {
    const parseCity = (displayName: string) => {
        const parts = displayName.split(",").map((p) => p.trim());
        const [first, second, ...rest] = parts;

        return (
            <span>
                <span className="font-bold uppercase">{first}</span>
                {second && (
                    <>
                        , <span className="font-bold">{second}</span>,
                    </>
                )}
                {rest.length > 0 && <p>{`${rest.join(", ")}`}</p>}
            </span>
        );
    };

    return (
        <>
            {suggestions && (
                <div className="w-full bg-white/80 text-black rounded-2xl overflow-hidden shadow-lg shadow-white/20 mb-4">
                    {suggestions?.map((found) => (
                        <button
                            type="button"
                            onClick={() => onCitySelect(found)}
                            key={found.place_id}
                            className="text-balance text-start border-b last:border-none border-black cursor-pointer hover:bg-white/90 py-2 px-4 transition-colors duration-150 w-full"
                        >
                            {parseCity(found.display_name)}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};
