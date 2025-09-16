import axios, { isAxiosError } from "axios";
import { FoundCity } from "../../../utils/types";

export const getCities = async (city: string) => {
    try {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params: {
                    city: city,
                    country: "fi",
                    format: "json",
                    limit: 4,
                },
            }
        );
        return res.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
        throw error;
    }
};

export const getDaylight = async (city: Partial<FoundCity>) => {
    try {
        const res = await axios.get("/api/daylight", {
            params: {
                place_id: city.place_id,
                lat: city.lat,
                lon: city.lon,
                name: city.name,
            },
        });
        return res.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
        throw error;
    }
};
