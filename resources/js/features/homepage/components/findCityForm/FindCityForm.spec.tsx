import { FindCityForm } from "./FindCityForm";
import { renderWithQueryClient } from "../../../../tests/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MessageProps } from "../../../../utils";

vi.mock("../api/daylightApi", async () => {
    const actual = await vi.importActual("../api/daylightApi");
    return {
        ...actual,
        getDaylight: () => Promise.resolve([]),
        getDCities: () => Promise.resolve([]),
    };
});

const mockHandleCitySelect = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
});

describe("FindCityForm", () => {
    test("shows city suggestions", async () => {
        renderWithQueryClient(
            <FindCityForm handleCitySelect={mockHandleCitySelect} />
        );

        const input = screen.getByPlaceholderText(/find a city/i);
        const button = screen.getByRole("button", { name: /search/i });

        await userEvent.type(input, "Tampere");
        await userEvent.click(button);

        const tampere = await screen.findByText(/tampere sub-region/i);
        expect(tampere).toBeInTheDocument();

        await userEvent.click(tampere);

        expect(input).toHaveValue("");
    });

    describe("Messages", () => {
        test("No cities found messsage", async () => {
            renderWithQueryClient(
                <FindCityForm handleCitySelect={mockHandleCitySelect} />
            );

            const input = screen.getByPlaceholderText(/find a city/i);
            const button = screen.getByRole("button", { name: /search/i });

            await userEvent.type(input, "ei oo mitaan");
            await userEvent.click(button);

            const noCitiesFound = await screen.findByText(/no cities found/i);
            expect(noCitiesFound).toBeInTheDocument();
        });

        test("Too long city name", async () => {
            renderWithQueryClient(
                <FindCityForm handleCitySelect={mockHandleCitySelect} />
            );

            const input = screen.getByPlaceholderText(/find a city/i);
            const button = screen.getByRole("button", { name: /search/i });

            await userEvent.type(input, "A".repeat(101));
            await userEvent.click(button);

            const noCitiesFound = await screen.findByText(
                /max 100 characters/i
            );
            expect(noCitiesFound).toBeInTheDocument();
        });

        test("Adding city...", async () => {
            const mockAddCity: MessageProps = {
                message: "Adding city...",
                type: "info",
            };

            renderWithQueryClient(
                <FindCityForm
                    handleCitySelect={mockHandleCitySelect}
                    msg={mockAddCity}
                />
            );

            const addingCity = await screen.findByText(/adding city/i);
            expect(addingCity).toBeInTheDocument();
        });

        test("shows success message when msg provided", async () => {
            const mockSuccessCity: MessageProps = {
                message: "City added!",
                type: "info",
            };
            renderWithQueryClient(
                <FindCityForm
                    handleCitySelect={mockHandleCitySelect}
                    msg={mockSuccessCity}
                />
            );
            expect(await screen.findByText(/city added!/i)).toBeInTheDocument();
        });
    });
});
