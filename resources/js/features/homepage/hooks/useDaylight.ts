import { useMutation } from "@tanstack/react-query";
import {
    DaylightData,
    MessageProps,
    nullMessage,
    MAX_CITIES,
    FoundCity,
} from "@utils/index";
import { getDaylight } from "../api/daylightApi";
import { useCallback, useState } from "react";

export const useDaylight = () => {
    const [savedCities, setSavedCities] = useState<DaylightData[]>([]);
    const [daylightMessage, setDaylightMessage] =
        useState<MessageProps>(nullMessage);

    const clearMessage = useCallback(() => {
        const timeoutId = setTimeout(() => {
            setDaylightMessage(nullMessage);
        }, 5000);

        return timeoutId;
    }, []);

    const daylightMutation = useMutation({
        mutationFn: (city: FoundCity) => getDaylight(city),
        onMutate: (city: FoundCity) => {
            setDaylightMessage({
                message: `Adding ${city.formatted.split(",")[0]}...`,
                type: "info",
            });
            clearMessage();
        },
        onSuccess: (data) => {
            const newCity: DaylightData = data;

            setSavedCities((prev) => {
                if (prev.length >= MAX_CITIES) {
                    setDaylightMessage(nullMessage);
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
                    setDaylightMessage(nullMessage);
                    setDaylightMessage({
                        message: "City already added.",
                        type: "info",
                    });
                    clearMessage();

                    return prev.map((c) => (c.id === newCity.id ? newCity : c));
                }

                if (data.message) {
                    setDaylightMessage(nullMessage);
                    setDaylightMessage({
                        message: data.message,
                        type: "success",
                    });
                    clearMessage();
                }

                return [...prev, newCity];
            });
        },
        onError: (error: unknown) => {
            const errorMessage =
                error instanceof Error ? error.message : "Something went wrong";
            setDaylightMessage(nullMessage);
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
