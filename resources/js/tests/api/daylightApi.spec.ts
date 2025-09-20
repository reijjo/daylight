import { getCities, getDaylight } from "@features/homepage/api/daylightApi";
import axios, { isAxiosError } from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock axios
vi.mock("axios", () => ({
    default: {
        get: vi.fn(),
    },
    isAxiosError: vi.fn(),
}));

// Cast to mock functions for type safety
const mockAxiosGet = axios.get as ReturnType<typeof vi.fn>;
const mockIsAxiosError = isAxiosError as unknown as ReturnType<typeof vi.fn>;

// Mock environment variables
vi.mock("import.meta", () => ({
    env: {
        VITE_GEOAPI: "https://api.opencagedata.com/geocode/v1/json",
        VITE_GEOAPI_KEY: "test-api-key",
    },
}));

describe("API Functions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getCities", () => {
        it("should throw error with axios error message when axios error occurs", async () => {
            const axiosError = {
                response: {
                    data: {
                        error: "API key is invalid",
                    },
                },
            };

            mockAxiosGet.mockRejectedValueOnce(axiosError);
            mockIsAxiosError.mockReturnValueOnce(true);

            await expect(getCities("Helsinki")).rejects.toThrow(
                "API key is invalid"
            );
        });

        it("should throw original error when non-axios error occurs", async () => {
            const genericError = new Error("Network connection failed");

            mockAxiosGet.mockRejectedValueOnce(genericError);
            mockIsAxiosError.mockReturnValueOnce(false);

            await expect(getCities("Helsinki")).rejects.toThrow(
                "Network connection failed"
            );
        });
    });

    describe("getDaylight", () => {
        const mockCity = {
            annotations: { geohash: "test-geohash" },
            geometry: { lat: 60.1699, lng: 24.9384 },
            formatted: "Helsinki, Finland",
        };

        it("should return daylight data on successful request", async () => {
            const mockResponse = {
                data: {
                    city: "Helsinki",
                    sunrise: "06:00",
                    sunset: "20:00",
                },
            };

            mockAxiosGet.mockResolvedValueOnce(mockResponse);

            const result = await getDaylight(mockCity);

            expect(mockAxiosGet).toHaveBeenCalledWith("/api/daylight", {
                params: {
                    place_id: "test-geohash",
                    lat: 60.1699,
                    lon: 24.9384,
                    name: "Helsinki",
                },
            });
            expect(result).toEqual(mockResponse.data);
        });

        it("should throw error with axios error message when axios error occurs", async () => {
            const axiosError = {
                response: {
                    data: {
                        error: "Invalid coordinates",
                    },
                },
            };

            mockAxiosGet.mockRejectedValueOnce(axiosError);
            mockIsAxiosError.mockReturnValueOnce(true);

            await expect(getDaylight(mockCity)).rejects.toThrow(
                "Invalid coordinates"
            );
        });

        it("should throw original error when non-axios error occurs", async () => {
            const genericError = new Error("Database connection failed");

            mockAxiosGet.mockRejectedValueOnce(genericError);
            mockIsAxiosError.mockReturnValueOnce(false);

            await expect(getDaylight(mockCity)).rejects.toThrow(
                "Database connection failed"
            );
        });

        it("should handle city with missing optional properties", async () => {
            const partialCity = {
                formatted: "Test City, Country",
            };

            const mockResponse = {
                data: { city: "Test City" },
            };

            mockAxiosGet.mockResolvedValueOnce(mockResponse);

            const result = await getDaylight(partialCity);

            expect(mockAxiosGet).toHaveBeenCalledWith("/api/daylight", {
                params: {
                    place_id: undefined,
                    lat: undefined,
                    lon: undefined,
                    name: "Test City",
                },
            });
            expect(result).toEqual(mockResponse.data);
        });
    });
});
