import { useMutation } from "@tanstack/react-query";
import { DaylightData, FoundCity, MessageProps } from "../../../utils/types";
import { getDaylight } from "../api/daylightApi";
import { useState } from "react";
import { MAX_CITIES } from "../../../utils/constants";
import { nullMessage } from "../../../utils/defaults";

export const useDaylight = () => {
    const [savedCities, setSavedCities] = useState<DaylightData[]>([]);
    const [daylightMessage, setDaylightMessage] =
        useState<MessageProps>(nullMessage);

    const clearMessage = () => {
        setTimeout(() => {
            setDaylightMessage(nullMessage);
        }, 5000);
    };

    const daylightMutation = useMutation({
        mutationFn: (city: FoundCity) => getDaylight(city),
        onMutate: (city: FoundCity) => {
            setDaylightMessage({
                message: `Adding ${city.name}...`,
                type: "info",
            });
            clearMessage();
        },
        onSuccess: (data) => {
            const newCity: DaylightData = data;

            setSavedCities((prev) => {
                if (prev.length >= MAX_CITIES) {
                    setDaylightMessage({
                        message: `Maximum ${MAX_CITIES} cities`,
                        type: "info",
                    });
                    clearMessage();
                    return prev;
                }
                const exists =
                    prev.some((c) => c.id === newCity.id) ||
                    prev.some(
                        (c) => c.lat === newCity.lat && c.lon === newCity.lon
                    );
                if (exists) {
                    setDaylightMessage({
                        message: "City already added.",
                        type: "info",
                    });
                    clearMessage();

                    return prev.map((c) => (c.id === newCity.id ? newCity : c));
                }
                return [...prev, newCity];
            });

            if (data.message) {
                setDaylightMessage({
                    message: data.message,
                    type: "success",
                });
                clearMessage();
            }
        },
        onError: (error: unknown) => {
            console.log("Daylight error", error);
            const errorMessage =
                error instanceof Error ? error.message : "Search failed";
            setDaylightMessage({ message: errorMessage, type: "error" });
            clearMessage();
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
        daylightMessage,
    };
};
