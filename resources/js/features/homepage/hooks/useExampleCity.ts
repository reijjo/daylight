import { useSuspenseQuery } from "@tanstack/react-query";
import { getDaylight } from "../api/daylightApi";
import { HARD_HELSINKI } from "@utils/index";

export const useExampleCity = () => {
    const {
        data: exampleDaylight,
        error: exampleDaylightError,
        isError: isExampleDaylightError,
    } = useSuspenseQuery({
        queryKey: ["savedCities"],
        queryFn: () => getDaylight(HARD_HELSINKI),
    });

    return {
        exampleDaylight,
        exampleDaylightError,
        isExampleDaylightError,
    };
};
