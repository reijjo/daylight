import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDaylight } from "../../../features/homepage/hooks/useDaylight";
import { createWrapper } from "../../test-utils";
import { FoundCity } from "../../../utils";

vi.mock("../../../features/homepage/api/daylightApi", () => ({
    getDaylight: vi.fn(),
}));

import { getDaylight } from "../../../features/homepage/api/daylightApi";
import { MAX_CITIES } from "../../../utils/constants";

const mockGetDaylight = vi.mocked(getDaylight);
const mockDaylightData = {
    id: 1,
    city: "Helsinki",
    sunrise: "06:30",
    sunset: "18:45",
    daylength: "12h 15m 2s",
    message: "Helsinki added!",
    lat: "60.1639",
    lon: "24.9384",
};
const mockHelsinkiCity: FoundCity = {
    place_id: 1,
    name: "Helsinki",
    display_name: "Helsinki, Finland",
    lat: "60.1639",
    lon: "24.9384",
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("useDayLight", () => {
    test("Successfully fetches example city", async () => {
        mockGetDaylight.mockResolvedValue(mockDaylightData);

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.daylightMutation.isSuccess).toBe(true);
        });
    });

    test("max cities reached", async () => {
        mockGetDaylight.mockImplementation(async (city) => ({
            id: city.place_id,
            city: city.name,
            sunrise: "06:30",
            sunset: "18:45",
            daylength: "12h 15m 2s",
            message: `${city.name} added!`,
            lat: city.lat,
            lon: city.lon,
        }));

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        for (let i = 0; i < MAX_CITIES; i++) {
            result.current.daylightMutation.mutate({
                ...mockHelsinkiCity,
                place_id: i,
                name: `City${i}`,
                display_name: `City${i}, Testland`,
                lat: `${60 + i}`,
                lon: `${24 + i}`,
            });

            await waitFor(() => {
                expect(result.current.savedCities.length).toBeLessThanOrEqual(
                    MAX_CITIES
                );
            });
        }

        // Try adding more than MAX_CITIES
        result.current.daylightMutation.mutate({
            ...mockHelsinkiCity,
            place_id: 999,
            name: "OverflowCity",
            display_name: "OverflowCity, Testland",
            lat: "70.0",
            lon: "30.0",
        });

        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(MAX_CITIES);
        });
    });

    test("city already added", async () => {
        mockGetDaylight.mockResolvedValue(mockDaylightData);

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.savedCities.length).toBeLessThanOrEqual(1);
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(1);
        });
    });

    test("Error situation", async () => {
        const mockError = new Error("API Error");
        mockGetDaylight.mockRejectedValue(mockError);

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.daylightMutation.isError).toBe(true);
        });
    });

    test("remove city", async () => {
        mockGetDaylight.mockResolvedValue(mockDaylightData);

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.savedCities.length).toBeLessThanOrEqual(1);
        });

        result.current.removeCity(1);

        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(0);
        });
    });

    test("remove all cities", async () => {
        mockGetDaylight.mockResolvedValue(mockDaylightData);

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        result.current.daylightMutation.mutate(mockHelsinkiCity);

        await waitFor(() => {
            expect(result.current.savedCities.length).toBeLessThanOrEqual(1);
        });

        result.current.removeAllCities();

        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(0);
        });
    });
});
