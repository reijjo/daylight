import axios, { isAxiosError } from "axios";
import { FoundCity } from "../../../utils";

const { VITE_GEOAPI, VITE_GEOAPI_KEY } = import.meta.env;

export const getCities = async (city: string) => {
    try {
        const res = await axios.get(`${VITE_GEOAPI}`, {
            params: {
                q: city,
                key: VITE_GEOAPI_KEY,
                countrycode: "fi",
                limit: 4,
                abbrv: 1,
            },
        });
        return res.data.results;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        throw error;
    }
};

export const getDaylight = async (city: Partial<FoundCity>) => {
    try {
        const res = await axios.get("/api/daylight", {
            params: {
                place_id: city.annotations?.geohash,
                lat: city.geometry?.lat,
                lon: city.geometry?.lng,
                name: city.formatted?.split(",")[0],
            },
        });
        return res.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        throw error;
    }
};
