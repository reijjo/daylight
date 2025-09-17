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
        onSuccess: (data) => {
            const newCity: DaylightData = data;

            if (savedCities.length >= MAX_CITIES) {
                setMsg("Max 6 cities");
                setTimeout(() => setMsg(""), 5000);
                return;
            }

            setSavedCities((prev) => {
                const exists = prev.some((city) => city.id === newCity.id);

                if (exists) {
                    return prev.map((city) =>
                        city.id === newCity.id ? newCity : city
                    );
                } else {
                    return [...prev, newCity];
                }
            });

            if (data.message) {
                setMsg(data.message);
                setTimeout(() => setMsg(""), 5000);
            }
            console.log("data.messagge", data.message);
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
        daylightMutation,
        removeCity,
        removeAllCities,
        isLoading: daylightMutation.isPending,
        error: daylightMutation.error,
        msg,
    };
};
