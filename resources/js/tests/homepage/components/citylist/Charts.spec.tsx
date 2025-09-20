import { Charts } from "@features/homepage/components";
import { render, screen } from "@testing-library/react";
import { mockDaylightData } from "../../../mocks/mocks";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Charts.tsx", () => {
    test("renders Charts.tsx", async () => {
        render(
            <Charts
                savedCities={[mockDaylightData]}
                removeAllCities={() => {}}
            />
        );

        expect(screen.getByText("minutes")).toBeInTheDocument();
    });

    test("switches to LineChart", async () => {
        render(
            <Charts
                savedCities={[mockDaylightData]}
                removeAllCities={() => {}}
            />
        );

        const switchButton = screen.getByRole("button", { name: /switch to/i });
        await userEvent.click(switchButton);

        expect(screen.getByText("minutes")).toBeInTheDocument();
    });

    test("shows every 7th day", async () => {
        render(
            <Charts
                savedCities={[mockDaylightData]}
                removeAllCities={() => {}}
            />
        );

        const switchButton = screen.getByRole("button", {
            name: /show every 7th day/i,
        });
        await userEvent.click(switchButton);

        expect(screen.getByText(/show all day/i)).toBeInTheDocument();
    });
});
