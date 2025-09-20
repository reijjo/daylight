import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CityListItem } from "../../../../features/homepage/components/citylist/CityListItem";
import { mockDaylightData } from "../../../mocks/mocks";

describe("CityListItem.tsx", () => {
    it("renders CityListItem", () => {
        render(<CityListItem city={mockDaylightData} removeCity={() => {}} />);
        expect(screen.getByText(mockDaylightData.city)).toBeInTheDocument();
    });

    it("removes city", async () => {
        const removeCity = vi.fn();
        render(
            <CityListItem city={mockDaylightData} removeCity={removeCity} />
        );
        const removeButton = screen.getByRole("button");
        await userEvent.click(removeButton);
        expect(removeCity).toHaveBeenCalledWith(1);
    });
});
