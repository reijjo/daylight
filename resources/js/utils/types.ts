export interface FoundCity {
    place_id: number;
    name: string;
    display_name: string;
    lat: string;
    lon: string;
}

export interface DaylightDataYear {
    year: number;
    data: {
        day: number;
        date: string;
        daylength_minutes: number;
    }[];
}

export interface DaylightData {
    id: number;
    city: string;
    sunrise: string;
    sunset: string;
    daylength: string;
    message?: string;
    lat?: string;
    lon?: string;
    year: DaylightDataYear;
}

export interface MessageProps {
    message: string | null;
    type: "success" | "error" | "info";
}
