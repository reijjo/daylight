import axios, { isAxiosError } from "axios";

export const getCities = async (city: string) => {
    try {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?city=${city}&country={fi}&format=json&limit=4`
        );
        return res;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
        throw error;
    }
};

export const getDaylight = () => {};
