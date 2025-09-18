import { FoundCity } from "../../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { getCities } from "../api/daylightApi";

export const useCitySearch = () => {
    const searchMutation = useMutation({
        mutationFn: (city: string) => getCities(city),
        onError: (error: unknown) => {
            console.log("Search error", error);
        },
    });

    const handleCitySelection = (cityName: FoundCity) => {
        searchMutation.reset();
        return cityName;
    };

    return {
        searchMutation,
        handleCitySelection,
    };
};
