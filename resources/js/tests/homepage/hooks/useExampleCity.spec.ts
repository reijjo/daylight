import { beforeEach, describe, expect, test, vi } from "vitest";
import { getDaylight } from "@features/homepage/api/daylightApi";
import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "../../test-utils";
import { HARD_HELSINKI } from "@utils/index";
import { useExampleCity } from "@features/homepage/hooks/useExampleCity";

vi.mock("@features/homepage/api/daylightApi");
const mockGetDaylight = vi.mocked(getDaylight);

beforeEach(() => {
    vi.clearAllMocks();
});

describe("useExampleCity", () => {
    const mockDaylightData = {
        id: 1,
        city: "Helsinki",
        sunrise: "06:30",
        sunset: "18:45",
        dayLength: "12h 15m 2s",
        message: "Helsinki added!",
        lat: "60.1639",
        lon: "24.9384",
    };

    test("Successfully fetches example city", async () => {
        mockGetDaylight.mockResolvedValue(mockDaylightData);

        const { result } = renderHook(() => useExampleCity(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.exampleDaylight).toEqual(mockDaylightData);
        });

        expect(mockGetDaylight).toHaveBeenCalledWith(HARD_HELSINKI);
        expect(result.current.exampleDaylight).toEqual(mockDaylightData);
    });
});
