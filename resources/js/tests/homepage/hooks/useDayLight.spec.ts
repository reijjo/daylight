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
    formatted: "Helsinki",
    geometry: {
        lat: 60.1639,
        lng: 24.9384,
    },
    annotations: {
        geohash: "123456",
    },
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
            id: city.annotations?.geohash || city.formatted,
            city: city.formatted,
            sunrise: "06:30",
            sunset: "18:45",
            daylength: "12h 15m 2s",
            message: `${city.formatted} added!`,
            lat: city.geometry?.lat,
            lon: city.geometry?.lng,
        }));

        const { result } = renderHook(() => useDaylight(), {
            wrapper: createWrapper(),
        });

        for (let i = 0; i < MAX_CITIES; i++) {
            result.current.daylightMutation.mutate({
                ...mockHelsinkiCity,
                formatted: `City${i}`,
                annotations: { geohash: `${i}` },
                geometry: { lat: 60 + i, lng: 24 + i },
            });
        }

        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(MAX_CITIES);
        });

        // Try adding one more beyond the limit
        result.current.daylightMutation.mutate({
            ...mockHelsinkiCity,
            formatted: "OverflowCity",
            annotations: { geohash: "overflow" },
            geometry: { lat: 99, lng: 99 },
        });

        // Still capped at MAX_CITIES
        await waitFor(() => {
            expect(result.current.savedCities.length).toBe(MAX_CITIES);
        });

        // And we should also see the info message
        expect(result.current.daylightMessage.message).toBe(
            `Maximum ${MAX_CITIES} cities`
        );
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
