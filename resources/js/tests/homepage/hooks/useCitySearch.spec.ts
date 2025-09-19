import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCities } from "../../../features/homepage/api/daylightApi";
import { renderHook, waitFor } from "@testing-library/react";
import { useCitySearch } from "../../../features/homepage/hooks/useCitySearch";
import { createWrapper } from "../../test-utils";
import { FoundCity } from "../../../utils";

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
            {
                place_id: 1,
                name: "Helsinki",
                display_name: "Helsinki, Finland",
                lat: "60.1639",
                lon: "24.9384",
            },
            {
                place_id: 2,
                name: "Tampere",
                display_name: "Tampere, Finland",
                lat: "61.4990",
                lon: "23.7703",
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
        expect(consoleSpy).toHaveBeenCalledWith("Search error", mockError);
    });

    test("should handle city selection and reset mutation", () => {
        const { result } = renderHook(() => useCitySearch(), {
            wrapper: createWrapper(),
        });

        const mockCity: FoundCity = {
            place_id: 1,
            name: "Helsinki",
            display_name: "Helsinki, Finland",
            lat: "60.1639",
            lon: "24.9384",
        };

        const selectedCity = result.current.handleCitySelection(mockCity);

        expect(selectedCity).toEqual(mockCity);
        expect(result.current.searchMutation.isIdle).toBe(true);
    });
});
