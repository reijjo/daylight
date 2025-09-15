import { FormEvent, useState } from "react";
import { Input } from "../../../components/ui/Input";
import { getCities } from "../api/daylightApi";
import { FoundCity } from "../../../utils/types";

export const FindCityForm = () => {
    const [cityInput, setCityInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<FoundCity[] | null>(null);
    const [selectedCity, setSelectedCity] = useState<FoundCity | null>(null);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const found = await getCities(cityInput);

        setSuggestions(found.data);
        setCityInput("");
    };

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

    const handleCitySelection = (cityName: FoundCity) => {
        setSuggestions(null);
        setSelectedCity(cityName);
        setCityInput("");
    };

    console.log("suggestions", suggestions);
    console.log("selectedCity", selectedCity?.display_name);

    return (
        <>
            <form
                onSubmit={submit}
                className="max-w-sm w-8/10 flex flex-col gap-2 sm:flex-row sm:max-w-md"
            >
                <div className="w-full flex flex-col gap-1">
                    <Input
                        id="city"
                        placeholder="Find a city"
                        value={cityInput}
                        onChange={(e) => {
                            setCityInput(e.target.value);
                            setSelectedCity(null);
                        }}
                    />
                    {suggestions && suggestions[0].name !== "Finland" && (
                        <div className="w-full bg-white/80 text-black rounded-2xl overflow-hidden shadow-lg shadow-white/20">
                            {suggestions?.map((found, index) => (
                                <button
                                    type="button"
                                    onClick={() => handleCitySelection(found)}
                                    key={index}
                                    className="text-balance text-start border-b last:border-none border-black cursor-pointer hover:bg-white/90 py-2 px-4 transition-colors duration-150"
                                >
                                    {parseCity(found.display_name)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="border border-white/20 px-4 py-2 rounded-4xl h-12 cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in"
                >
                    Search
                </button>
            </form>
            {suggestions?.length === 1 && suggestions[0].name === "Finland" && (
                <div className="px-2 py-1">No cities found.</div>
            )}
        </>
    );
};
