import { useMutation } from "@tanstack/react-query";
import { DaylightData, FoundCity } from "../../../utils/types";
import { getDaylight } from "../api/daylightApi";
import { useState } from "react";
import { MAX_CITIES } from "../../../utils/constants";

export const useDaylight = () => {
    const [savedCities, setSavedCities] = useState<DaylightData[]>([]);
    const [msg, setMsg] = useState<string>("");

    const daylightMutation = useMutation({
        mutationFn: (city: FoundCity) => getDaylight(city),
        onMutate: (city: FoundCity) => setMsg(`Adding ${city.name}...`),
        onSuccess: (data) => {
            const newCity: DaylightData = data;

            // if (savedCities.length >= MAX_CITIES) {
            //     setMsg(`Maximum ${MAX_CITIES} cities`);
            //     setTimeout(() => setMsg(""), 5000);
            //     return;
            // }

            setSavedCities((prev) => {
                if (prev.length >= MAX_CITIES) {
                    setMsg(`Maximum ${MAX_CITIES} cities`);
                    setTimeout(() => setMsg(""), 5000);
                    return prev;
                }
                const exists =
                    prev.some((c) => c.id === newCity.id) ||
                    prev.some(
                        (c) => c.lat === newCity.lat && c.lon === newCity.lon
                    );
                if (exists) {
                    setMsg("City already added.");
                    setTimeout(() => setMsg(""), 5000);
                    return prev.map((c) => (c.id === newCity.id ? newCity : c));
                }
                return [...prev, newCity];
            });

            if (data.message) {
                setMsg(data.message);
                setTimeout(() => setMsg(""), 5000);
            }
        },
        onError: (error: unknown) => {
            console.log("Daylight error", error);
        },
    });

    const removeCity = (id: number) => {
        setSavedCities((prev) => prev.filter((city) => city.id !== id));
    };

    const removeAllCities = () => {
        setSavedCities([]);
    };

    return {
        savedCities,
        setSavedCities,
        daylightMutation,
        removeCity,
        removeAllCities,
        isLoading: daylightMutation.isPending,
        error: daylightMutation.error,
        msg,
    };
};
