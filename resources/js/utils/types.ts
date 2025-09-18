export interface FoundCity {
    place_id: number;
    name: string;
    display_name: string;
    lat: string;
    lon: string;
}

interface DaylinghtDataYear {
    year: number;
    data: [
        {
            day: number;
            date: string;
            daylength_minutes: number;
        }
    ];
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
    year: DaylinghtDataYear;
}
