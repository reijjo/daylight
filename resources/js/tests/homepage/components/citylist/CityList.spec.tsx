import CityList from "@features/homepage/components/citylist/CityList";
import { DaylightData } from "@utils/types";
import { renderWithQueryClient } from "../../../test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

vi.mock("@features/homepage/hooks");

import { useExampleCity, useDaylight } from "@features/homepage/hooks";

const mockUseExampleCity = vi.mocked(useExampleCity);

beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();

    mockUseExampleCity.mockReturnValue({
        exampleDaylight: null,
        exampleDaylightError: null,
        isExampleDaylightError: false,
    });
});

describe("CityList.tsx", () => {
    const mockSavedCities: DaylightData[] = [];
    const mockSetSavedCities = vi.fn();

    it("renders CityList", () => {
        renderWithQueryClient(
            <CityList
                savedCities={mockSavedCities}
                setSavedCities={() => {}}
                removeCity={() => {}}
                removeAllCities={() => {}}
            />
        );

        expect(mockSavedCities.length).toBe(0);
    });

    it("runs exampleDayLight", async () => {
        mockUseExampleCity.mockReturnValue({
            exampleDaylight: { city: "Helsinki" },
            exampleDaylightError: null,
            isExampleDaylightError: false,
        });

        renderWithQueryClient(
            <CityList
                savedCities={mockSavedCities}
                setSavedCities={mockSetSavedCities}
                removeCity={() => {}}
                removeAllCities={() => {}}
            />
        );

        await waitFor(() => {
            expect(mockSetSavedCities).toHaveBeenCalledWith([
                expect.objectContaining({ city: "Helsinki" }),
            ]);
        });
    });
});
