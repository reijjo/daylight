import { useSuspenseQuery } from "@tanstack/react-query";
import { getCities, getDaylight } from "../api/daylightApi";
import { FoundCity } from "../../../utils";

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

export const useExampleCity = () => {
    const isMobile = isMobileDevice();

    if (isMobile) {
        return {
            exampleDaylight: null,
            exampleDaylightError: null,
            isExampleDaylightError: false,
        };
    }

    const { data, isError, error } = useSuspenseQuery({
        queryKey: ["example"],
        queryFn: () => getCities("helsinki"),
    });

    const exampleCity = data?.[0] as FoundCity;

    const {
        data: exampleDaylight,
        error: exampleDaylightError,
        isError: isExampleDaylightError,
    } = useSuspenseQuery({
        queryKey: ["savedCities"],
        queryFn: () => getDaylight(exampleCity),
    });

    return {
        exampleDaylight,
        exampleDaylightError,
        isExampleDaylightError,
    };
};
