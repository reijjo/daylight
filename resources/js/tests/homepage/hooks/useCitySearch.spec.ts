import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCities } from "../../../features/homepage/api/daylightApi";
import { renderHook, waitFor } from "@testing-library/react";
import { useCitySearch } from "../../../features/homepage/hooks/useCitySearch";
import { createWrapper } from "../../test-utils";
import { FoundCity } from "../../../utils";
import { mockHelsinkiCity } from "../../mocks/mocks";

vi.mock("../../../features/homepage/api/daylightApi");
const mockGetCities = vi.mocked(getCities);

const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
});

describe("useCitySearch", () => {
    test("should initialize with correct default state", () => {
        const { result } = renderHook(() => useCitySearch(), {
            wrapper: createWrapper(),
        });

        expect(result.current.searchMutation.isIdle).toBe(true);
        expect(result.current.searchMutation.data).toBeUndefined();
        expect(result.current.searchMutation.error).toBeNull();
        expect(result.current.searchMutation.isPending).toBe(false);
        expect(typeof result.current.handleCitySelection).toBe("function");
    });

    test("should handle successful city search", async () => {
        const mockCities: FoundCity[] = [
            mockHelsinkiCity,
            {
                formatted: "Helsinki2",
                geometry: {
                    lat: 60.16392,
                    lng: 24.93842,
                },
                annotations: {
                    geohash: "1234562",
                },
            },
        ];

        mockGetCities.mockResolvedValue(mockCities);

        const { result } = renderHook(() => useCitySearch(), {
            wrapper: createWrapper(),
        });

        result.current.searchMutation.mutate("Helsinki");

        await waitFor(() => {
            expect(result.current.searchMutation.isSuccess).toBe(true);
        });

        expect(mockGetCities).toHaveBeenCalledWith("Helsinki");
        expect(result.current.searchMutation.data).toEqual(mockCities);
        expect(result.current.searchMutation.error).toBeNull();
    });

    test("should handle search error and log it", async () => {
        const mockError = new Error("API Error");
        mockGetCities.mockRejectedValue(mockError);

        const { result } = renderHook(() => useCitySearch(), {
            wrapper: createWrapper(),
        });

        result.current.searchMutation.mutate("InvalidCity");

        await waitFor(() => {
            expect(result.current.searchMutation.isError).toBe(true);
        });

        expect(mockGetCities).toHaveBeenCalledWith("InvalidCity");
        expect(result.current.searchMutation.error).toEqual(mockError);
    });

    test("should handle city selection and reset mutation", () => {
        const { result } = renderHook(() => useCitySearch(), {
            wrapper: createWrapper(),
        });

        const mockCity: FoundCity = mockHelsinkiCity;
        const selectedCity = result.current.handleCitySelection(mockCity);

        expect(selectedCity).toEqual(mockCity);
        expect(result.current.searchMutation.isIdle).toBe(true);
    });
});
