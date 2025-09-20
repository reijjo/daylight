import { CustomTooltip } from "@features/homepage/components/charts/CustomTooltip";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("CustomTooltip.tsx", () => {
    const mockColors = ["#ff6b6b", "#4ecdc4", "#45b7d1"];

    const mockPayload = [
        {
            name: "Helsinki",
            value: 720, // 12 hours in minutes
        },
        {
            name: "Oslo",
            value: 900, // 15 hours in minutes
        },
    ];

    it("renders tooltip when active with payload and label", () => {
        render(
            <CustomTooltip
                active={true}
                payload={mockPayload}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        // Check that the date label is rendered
        expect(screen.getByText("Date: 2024-06-21")).toBeInTheDocument();

        // Check that city names are rendered
        expect(screen.getByText("Helsinki:")).toBeInTheDocument();
        expect(screen.getByText("Oslo:")).toBeInTheDocument();

        // Check time formatting for Helsinki (720 minutes = 12h 0m)
        expect(screen.getByText("12h 0m")).toBeInTheDocument();
        expect(screen.getByText("(720 minutes)")).toBeInTheDocument();

        // Check time formatting for Oslo (900 minutes = 15h 0m)
        expect(screen.getByText("15h 0m")).toBeInTheDocument();
        expect(screen.getByText("(900 minutes)")).toBeInTheDocument();
    });

    it("handles minutes correctly when value has remainder", () => {
        const payloadWithRemainder = [
            {
                name: "Stockholm",
                value: 785, // 13 hours and 5 minutes
            },
        ];

        render(
            <CustomTooltip
                active={true}
                payload={payloadWithRemainder}
                label="2024-12-21"
                colors={mockColors}
            />
        );

        // Check time formatting (785 minutes = 13h 5m)
        expect(screen.getByText("13h 5m")).toBeInTheDocument();
        expect(screen.getByText("(785 minutes)")).toBeInTheDocument();
    });

    it("renders nothing when not active", () => {
        const { container } = render(
            <CustomTooltip
                active={false}
                payload={mockPayload}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders nothing when payload is empty", () => {
        const { container } = render(
            <CustomTooltip
                active={true}
                payload={[]}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders nothing when payload is undefined", () => {
        const { container } = render(
            <CustomTooltip
                active={true}
                payload={undefined}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("applies correct colors to tooltip items", () => {
        const { container } = render(
            <CustomTooltip
                active={true}
                payload={mockPayload}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        // Get all the city data divs
        const cityDivs = container.querySelectorAll(
            ".flex.justify-between.gap-2"
        );

        // Check that the first city has the first color
        expect(cityDivs[0]).toHaveStyle(`color: ${mockColors[0]}`);

        // Check that the second city has the second color
        expect(cityDivs[1]).toHaveStyle(`color: ${mockColors[1]}`);
    });

    it("cycles through colors when more cities than colors", () => {
        const manyPayload = [
            { name: "City1", value: 600 },
            { name: "City2", value: 700 },
            { name: "City3", value: 800 },
            { name: "City4", value: 900 }, // This should use the first color again
        ];

        const { container } = render(
            <CustomTooltip
                active={true}
                payload={manyPayload}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        const cityDivs = container.querySelectorAll(
            ".flex.justify-between.gap-2"
        );

        // Check that the fourth city cycles back to the first color
        expect(cityDivs[3]).toHaveStyle(`color: ${mockColors[0]}`);
    });

    it("has correct CSS classes for styling", () => {
        const { container } = render(
            <CustomTooltip
                active={true}
                payload={mockPayload}
                label="2024-06-21"
                colors={mockColors}
            />
        );

        // Check main container classes
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass(
            "bg-gray-800",
            "text-white",
            "p-2",
            "rounded",
            "shadow-lg",
            "flex",
            "flex-col"
        );

        // Check date label classes
        const dateLabel = screen.getByText("Date: 2024-06-21");
        expect(dateLabel).toHaveClass("font-semibold", "text-center", "mb-1");
    });
});
