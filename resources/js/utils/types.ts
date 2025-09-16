export interface FoundCity {
    place_id: number;
    name: string;
    display_name: string;
    lat: string;
    lon: string;
}

export interface DaylightData {
    id: number;
    city: string;
    sunrise: string;
    sunset: string;
    daylength: string;
}
