import { FoundCity, MessageProps, nullMessage } from "@utils/index";
import { useMutation } from "@tanstack/react-query";
import { getCities } from "../api/daylightApi";
import { useCallback, useState } from "react";

export const useCitySearch = () => {
    const [searchMessage, setSearchMessage] =
        useState<MessageProps>(nullMessage);

    const clearMessage = useCallback(() => {
        const timeoutId = setTimeout(() => {
            setSearchMessage(nullMessage);
        }, 5000);

        return timeoutId;
    }, []);

    const searchMutation = useMutation({
        mutationFn: (city: string) => getCities(city),
        onMutate: () => {
            setSearchMessage(nullMessage);

            setSearchMessage({
                message: "Searching...",
                type: "info",
            });
            clearMessage();
        },
        onSuccess: (data) => {
            if (data.length === 0) {
                setSearchMessage(nullMessage);
                setSearchMessage({
                    message: "No cities found.",
                    type: "error",
                });
                clearMessage();
            } else {
                setSearchMessage(nullMessage);
            }
        },
        onError: (error: unknown) => {
            console.log("Search error", error);
            setSearchMessage(nullMessage);
            setSearchMessage({
                message: "Network error. Please try again.",
                type: "error",
            });
            clearMessage();
        },
    });

    const handleCitySelection = (cityName: FoundCity) => {
        searchMutation.reset();
        setSearchMessage(nullMessage);
        return cityName;
    };

    return {
        searchMessage,
        setSearchMessage,
        searchMutation,
        handleCitySelection,
    };
};
