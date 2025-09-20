import { DaylightData, FoundCity } from "../../utils";

export const mockDaylightData: DaylightData = {
    id: 1,
    city: "Helsinki",
    sunrise: "06:30",
    sunset: "18:45",
    daylength: "12h 15m 2s",
    message: "Helsinki added!",
    lat: "60.1639",
    lon: "24.9384",
    year: {
        year: 2025,
        data: [
            { day: 1, date: "01/01", daylength_minutes: 360 },
            { day: 2, date: "02/01", daylength_minutes: 365 },
        ],
    },
};

export const mockHelsinkiCity: FoundCity = {
    formatted: "Helsinki",
    geometry: {
        lat: 60.1639,
        lng: 24.9384,
    },
    annotations: {
        geohash: "123456",
    },
};
