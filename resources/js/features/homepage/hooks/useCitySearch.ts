import { FoundCity, MessageProps } from "../../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { getCities } from "../api/daylightApi";
import { useState } from "react";
import { nullMessage } from "../../../utils/defaults";

export const useCitySearch = () => {
    const [searchMessage, setSearchMessage] =
        useState<MessageProps>(nullMessage);

    const clearMessage = () => {
        setTimeout(() => {
            setSearchMessage(nullMessage);
        }, 5000);
    };

    const searchMutation = useMutation({
        mutationFn: (city: string) => getCities(city),
        onMutate: () => {
            setSearchMessage({
                message: "Searching...",
                type: "info",
            });
            clearMessage();
        },
        onSuccess: (data) => {
            if (data.length === 0) {
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
            const errorMessage =
                error instanceof Error ? error.message : "Search failed";
            setSearchMessage({ message: errorMessage, type: "error" });
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
